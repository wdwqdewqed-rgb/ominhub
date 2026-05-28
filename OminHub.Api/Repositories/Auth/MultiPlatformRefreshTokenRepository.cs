using System;
using System.Data;
using System.Security.Cryptography;
using System.Threading;
using System.Threading.Tasks;

using MySql.Data.MySqlClient;
using BCrypt.Net;

using OminHub.Api.Services;
using OminHub.Api.Helpers;

namespace OminHub.Api.Repositories.Auth
{
    public class MultiPlatformRefreshTokenRepository : IMultiPlatformRefreshTokenRepository
    {
        private readonly string _connectionString;
        private readonly JwtServiceRSA _jwt;

        public MultiPlatformRefreshTokenRepository(string connectionString, JwtServiceRSA jwt)
        {
            _connectionString = connectionString;
            _jwt = jwt;
        }

        private static string BcryptHash(string input)
            => BCrypt.Net.BCrypt.HashPassword(input, workFactor: 11);

        // ===================== INSERT =====================
        public async Task StoreRefreshTokenAsync(int userId, string refreshTokenPlain, string? deviceId, string? userAgent, CancellationToken ct)
        {
            var sha = HashHelper.ComputeSha256Hex(refreshTokenPlain);
            var bcrypt = BcryptHash(refreshTokenPlain);

            using var conn = new MySqlConnection(_connectionString);
            await conn.OpenAsync(ct);

            const string sql = @"
                INSERT INTO user_refresh_tokens
                (UserId, TokenSha256, TokenBcrypt, DeviceId, UserAgent, CreatedAt, ExpiresAt)
                VALUES (@UserId, @TokenSha, @TokenBcrypt, @DeviceId, @UserAgent, @CreatedAt, @ExpiresAt);
            ";

            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@UserId", userId);
            cmd.Parameters.AddWithValue("@TokenSha", sha);
            cmd.Parameters.AddWithValue("@TokenBcrypt", bcrypt);
            cmd.Parameters.AddWithValue("@DeviceId", (object?)deviceId ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@UserAgent", (object?)userAgent ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@CreatedAt", DateTime.UtcNow);
            cmd.Parameters.AddWithValue("@ExpiresAt", _jwt.GetRefreshTokenExpirationUtc());



            await cmd.ExecuteNonQueryAsync(ct);
        }

        // ===================== VALIDACIÓN =====================
        public async Task<RefreshTokenRecord?> GetValidRefreshTokenAsync(string refreshTokenPlain, CancellationToken ct)
        {
            var sha = HashHelper.ComputeSha256Hex(refreshTokenPlain);

            using var conn = new MySqlConnection(_connectionString);
            await conn.OpenAsync(ct);

            const string sql = @"
                SELECT Id, UserId, TokenSha256, TokenBcrypt, DeviceId, UserAgent, CreatedAt, ExpiresAt, RevokedAt, ReplacedByTokenSha256
                FROM user_refresh_tokens
                WHERE TokenSha256 = @TokenSha
                AND RevokedAt IS NULL
                AND ExpiresAt > @Now
                LIMIT 1;
            ";

            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@TokenSha", sha);
            cmd.Parameters.AddWithValue("@Now", DateTime.UtcNow);

            using var reader = await cmd.ExecuteReaderAsync(ct);
            if (!await reader.ReadAsync(ct))
                return null;

            var bcrypt = reader.GetString("TokenBcrypt");
            if (!BCrypt.Net.BCrypt.Verify(refreshTokenPlain, bcrypt))
                return null;

            return new RefreshTokenRecord
            {
                Id = reader.GetInt64("Id"),
                UserId = reader.GetInt32("UserId"),
                TokenSha256 = reader.GetString("TokenSha256"),
                TokenBcrypt = bcrypt,
                DeviceId = reader.IsDBNull(reader.GetOrdinal("DeviceId")) ? null : reader.GetString("DeviceId"),
                UserAgent = reader.IsDBNull(reader.GetOrdinal("UserAgent")) ? null : reader.GetString("UserAgent"),
                CreatedAt = reader.GetDateTime("CreatedAt"),
                ExpiresAt = reader.GetDateTime("ExpiresAt"),
                RevokedAt = reader.IsDBNull(reader.GetOrdinal("RevokedAt")) ? null : reader.GetDateTime("RevokedAt"),
                ReplacedByTokenSha256 = reader.IsDBNull(reader.GetOrdinal("ReplacedByTokenSha256")) ? null : reader.GetString("ReplacedByTokenSha256")
            };
        }

        // ===================== ROTACIÓN =====================
        public async Task RotateRefreshTokenAsync(
    long tokenId,
    string newRefreshTokenPlain,
    string? newDevice,
    string? newAgent,
    CancellationToken ct)
{
    var newSha = HashHelper.ComputeSha256Hex(newRefreshTokenPlain);
    var newBcrypt = BcryptHash(newRefreshTokenPlain);

    using var conn = new MySqlConnection(_connectionString);
    await conn.OpenAsync(ct);

    using var tx = await conn.BeginTransactionAsync(ct);

    try
    {
        const string checkSql = @"
            SELECT UserId FROM user_refresh_tokens
            WHERE Id = @Id AND RevokedAt IS NULL
            LIMIT 1 FOR UPDATE;
        ";

        int userId;
        using (var checkCmd = new MySqlCommand(checkSql, conn, tx))
        {
            checkCmd.Parameters.AddWithValue("@Id", tokenId);

            using var r = await checkCmd.ExecuteReaderAsync(ct);
            if (!await r.ReadAsync(ct))
                throw new InvalidOperationException("Token not found or revoked");

            userId = r.GetInt32("UserId");
        }

        const string revokeSql = @"
            UPDATE user_refresh_tokens
            SET RevokedAt = @Now,
                ReplacedByTokenSha256 = @NewSha
            WHERE Id = @Id;
        ";

        using (var revokeCmd = new MySqlCommand(revokeSql, conn, tx))
        {
            revokeCmd.Parameters.AddWithValue("@Id", tokenId);
            revokeCmd.Parameters.AddWithValue("@NewSha", newSha);
            revokeCmd.Parameters.AddWithValue("@Now", DateTime.UtcNow);
            await revokeCmd.ExecuteNonQueryAsync(ct);
        }

        const string insertSql = @"
            INSERT INTO user_refresh_tokens
            (UserId, TokenSha256, TokenBcrypt, DeviceId, UserAgent, CreatedAt, ExpiresAt)
            VALUES (@UserId, @Sha, @Bcrypt, @Device, @Agent, @CreatedAt, @ExpiresAt);
        ";

        using (var insertCmd = new MySqlCommand(insertSql, conn, tx))
        {
            insertCmd.Parameters.AddWithValue("@UserId", userId);
            insertCmd.Parameters.AddWithValue("@Sha", newSha);
            insertCmd.Parameters.AddWithValue("@Bcrypt", newBcrypt);
            insertCmd.Parameters.AddWithValue("@Device", (object?)newDevice ?? DBNull.Value);
            insertCmd.Parameters.AddWithValue("@Agent", (object?)newAgent ?? DBNull.Value);
            insertCmd.Parameters.AddWithValue("@CreatedAt", DateTime.UtcNow);
            insertCmd.Parameters.AddWithValue("@ExpiresAt", _jwt.GetRefreshTokenExpirationUtc());


            await insertCmd.ExecuteNonQueryAsync(ct);
        }

        await tx.CommitAsync(ct);
    }
    catch
    {
        await tx.RollbackAsync(ct);
        throw;
    }
}


        // ===================== REVOKE =====================
        public async Task RevokeRefreshTokenByShaAsync(string sha, CancellationToken ct)
        {
            using var conn = new MySqlConnection(_connectionString);
            await conn.OpenAsync(ct);

            const string sql = @"
                UPDATE user_refresh_tokens
                SET RevokedAt = @Now
                WHERE TokenSha256 = @Sha AND RevokedAt IS NULL;
            ";

            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Now", DateTime.UtcNow);
            cmd.Parameters.AddWithValue("@Sha", sha);

            await cmd.ExecuteNonQueryAsync(ct);
        }
        public async Task RevokeRefreshTokenByPlainAsync(string refreshTokenPlain, CancellationToken ct)
{
    var sha = HashHelper.ComputeSha256Hex(refreshTokenPlain);

    using var conn = new MySqlConnection(_connectionString);
    await conn.OpenAsync(ct);

    const string sql = @"
        UPDATE user_refresh_tokens
        SET RevokedAt = @Now
        WHERE TokenSha256 = @Sha AND RevokedAt IS NULL;
    ";

    using var cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@Now", DateTime.UtcNow);
    cmd.Parameters.AddWithValue("@Sha", sha);

    await cmd.ExecuteNonQueryAsync(ct);
}

public async Task RevokeAllTokensForUser(int userId, CancellationToken ct)
{
    using var conn = new MySqlConnection(_connectionString);
    await conn.OpenAsync(ct);

    const string sql = @"
        UPDATE user_refresh_tokens
        SET RevokedAt = @Now
        WHERE UserId = @UserId AND RevokedAt IS NULL;
    ";

    using var cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@Now", DateTime.UtcNow);
    cmd.Parameters.AddWithValue("@UserId", userId);

    await cmd.ExecuteNonQueryAsync(ct);
}

public async Task<bool> IsReusedToken(string sha, CancellationToken ct)
{
    using var conn = new MySqlConnection(_connectionString);
    await conn.OpenAsync(ct);

    const string sql = @"
        SELECT COUNT(*)
        FROM user_refresh_tokens
        WHERE TokenSha256 = @Sha
          AND RevokedAt IS NOT NULL;
    ";

    using var cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@Sha", sha);

    var count = Convert.ToInt32(await cmd.ExecuteScalarAsync(ct));
    return count > 0;
}

    }
}
