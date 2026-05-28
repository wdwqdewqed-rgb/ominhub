using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace OminHub.Api.Repositories.Users.Admin
{
    public class AdminRepository : IAdminRepository
    {
        private readonly string _connectionString;

        public AdminRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        private MySqlConnection GetConn()
            => new MySqlConnection(_connectionString);

        // =========================
        // APPROVE
        // =========================
        public async Task<bool> ApproveAsync(long id, long adminId, CancellationToken ct)
        {
            using var cnn = new MySqlConnection(_connectionString);
            await cnn.OpenAsync(ct);

            string sql = @"
                UPDATE user_verification_requests
                SET State = 'approved',
                    ReviewedBy = @ReviewedBy,
                    ReviewedAt = @ReviewedAt,
                    UpdatedAt = @UpdatedAt
                WHERE Id = @Id";

            using var cmd = new MySqlCommand(sql, cnn);

            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@ReviewedBy", adminId);
            cmd.Parameters.AddWithValue("@ReviewedAt", DateTime.UtcNow);
            cmd.Parameters.AddWithValue("@UpdatedAt", DateTime.UtcNow);

            return await cmd.ExecuteNonQueryAsync(ct) > 0;
        }

        // =========================
        // REJECT
        // =========================
        public async Task<bool> RejectAsync(long id, string notes, long adminId, CancellationToken ct)
        {
            using var cnn = new MySqlConnection(_connectionString);
            await cnn.OpenAsync(ct);

            string sql = @"
                UPDATE user_verification_requests
                SET State = 'rejected',
                    RequestNotes = @Notes,
                    ReviewedBy = @ReviewedBy,
                    ReviewedAt = @ReviewedAt,
                    UpdatedAt = @UpdatedAt
                WHERE Id = @Id";

            using var cmd = new MySqlCommand(sql, cnn);

            cmd.Parameters.AddWithValue("@Id", id);
            cmd.Parameters.AddWithValue("@Notes", notes);
            cmd.Parameters.AddWithValue("@ReviewedBy", adminId);
            cmd.Parameters.AddWithValue("@ReviewedAt", DateTime.UtcNow);
            cmd.Parameters.AddWithValue("@UpdatedAt", DateTime.UtcNow);

            return await cmd.ExecuteNonQueryAsync(ct) > 0;
        }

        public async Task ApproveVideoAsync(long videoId, long adminId, string? notes, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            using var tx = await cnn.BeginTransactionAsync(ct);

            string sql1 = @"
                UPDATE videos 
                SET Status='approved', ApprovedAt=NOW(), ApprovedBy=@Admin
                WHERE Id=@Id;
            ";

            using (var cmd = new MySqlCommand(sql1, cnn, tx))
            {
                cmd.Parameters.AddWithValue("@Admin", adminId);
                cmd.Parameters.AddWithValue("@Id", videoId);
                await cmd.ExecuteNonQueryAsync(ct);
            }

            string sql2 = @"
                INSERT INTO video_moderation_logs (VideoId, ActionBy, Action, Notes)
                VALUES (@Vid, @Admin, 'approved', @Notes);
            ";

            using (var cmd = new MySqlCommand(sql2, cnn, tx))
            {
                cmd.Parameters.AddWithValue("@Vid", videoId);
                cmd.Parameters.AddWithValue("@Admin", adminId);
                cmd.Parameters.AddWithValue("@Notes", (object?)notes ?? DBNull.Value);
                await cmd.ExecuteNonQueryAsync(ct);
            }

            await tx.CommitAsync(ct);
        }

        public async Task RejectVideoAsync(long videoId, long adminId, string? notes, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            using var tx = await cnn.BeginTransactionAsync(ct);

            string sql1 = @"
                UPDATE videos 
                SET Status='rejected'
                WHERE Id=@Id;
            ";

            using (var cmd = new MySqlCommand(sql1, cnn, tx))
            {
                cmd.Parameters.AddWithValue("@Id", videoId);
                await cmd.ExecuteNonQueryAsync(ct);
            }

            string sql2 = @"
                INSERT INTO video_moderation_logs (VideoId, ActionBy, Action, Notes)
                VALUES (@Vid, @Admin, 'rejected', @Notes);
            ";

            using (var cmd = new MySqlCommand(sql2, cnn, tx))
            {
                cmd.Parameters.AddWithValue("@Vid", videoId);
                cmd.Parameters.AddWithValue("@Admin", adminId);
                cmd.Parameters.AddWithValue("@Notes", (object?)notes ?? DBNull.Value);
                await cmd.ExecuteNonQueryAsync(ct);
            }

            await tx.CommitAsync(ct);
        }
    }
}