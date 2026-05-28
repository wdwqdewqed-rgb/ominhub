using System;
using System.Collections.Generic;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using OminHub.Models;

namespace OminHub.Api.Repositories.Auth
{
    public class UserRepository : IUserRepository
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        // ==============================================================
        // USUARIOS
        // ==============================================================

        public async Task<UserDto?> GetById(int id, CancellationToken ct)
{
    using var conn = new MySqlConnection(_connectionString);
    await conn.OpenAsync(ct);

    const string sql = @"
        SELECT Id, Username, Email, Role
        FROM usuarios
        WHERE Id = @Id
        LIMIT 1;
    ";

    using var cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@Id", id);

    using var reader = await cmd.ExecuteReaderAsync(ct);
    if (!await reader.ReadAsync(ct)) return null;

    return new UserDto
    {
        Id = reader.GetInt32("Id"),
        Username = reader.GetString("Username"),
        Email = reader.GetString("Email"),
        Role = reader.GetString("Role")
    };
}


        public async Task<int> CreateUserAsync(UserDto user, CancellationToken ct)
{
    using var conn = new MySqlConnection(_connectionString);
    await conn.OpenAsync(ct);

    const string sql = @"
        INSERT INTO usuarios
        (Username, PasswordHash, Email, Role, CreatedAt, UpdatedAt)
        VALUES (@Username, @PasswordHash, @Email, @Role, @Now, @Now);
    ";

    using var cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@Username", user.Username);
    cmd.Parameters.AddWithValue("@PasswordHash", user.PasswordHash);
    cmd.Parameters.AddWithValue("@Email", user.Email);
    cmd.Parameters.AddWithValue("@Role", user.Role);
    cmd.Parameters.AddWithValue("@Now", DateTime.UtcNow);

    await cmd.ExecuteNonQueryAsync(ct);

    // LastInsertedId viene del comando MySqlCommand
    var last = cmd.LastInsertedId;
    return Convert.ToInt32(last);
}


        public async Task<bool> EmailExisteAsync(string email, CancellationToken ct)
{
    using var conn = new MySqlConnection(_connectionString);
    await conn.OpenAsync(ct);

    const string sql = "SELECT COUNT(1) FROM usuarios WHERE Email = @Email";
    using var cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@Email", email);

    var result = await cmd.ExecuteScalarAsync(ct);
    return result != null && Convert.ToInt32(result) > 0;
}

        public async Task<bool> UsernameExisteAsync(string username, CancellationToken ct)
{
    using var conn = new MySqlConnection(_connectionString);
    await conn.OpenAsync(ct);

    const string sql = "SELECT COUNT(1) FROM usuarios WHERE Username = @Username";
    using var cmd = new MySqlCommand(sql, conn);
    cmd.Parameters.AddWithValue("@Username", username);

    var result = await cmd.ExecuteScalarAsync(ct);
    return result != null && Convert.ToInt32(result) > 0;
}


        public async Task<UserDto?> ObtenerPorEmailOUsername(string identifier, CancellationToken ct)
        {
            using var conn = new MySqlConnection(_connectionString);
            await conn.OpenAsync(ct);

            const string sql = @"
                SELECT Id, Username, PasswordHash, Email, Role
                FROM usuarios
                WHERE Email = @Identifier OR Username = @Identifier
                LIMIT 1;
            ";

            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Identifier", identifier);

            using var reader = await cmd.ExecuteReaderAsync(ct);

            if (!await reader.ReadAsync(ct))
                return null;

            return new UserDto
            {
                Id = reader.GetInt32("Id"),
                Username = reader.GetString("Username"),
                PasswordHash = reader.GetString("PasswordHash"),
                Email = reader.GetString("Email"),
                Role = reader.GetString("Role")
            };
        }

    }
}
