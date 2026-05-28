using System;
using System.Collections.Generic;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using OminHub.Models;

namespace OminHub.Api.Repositories.Role
{
    public class RoleUpdateRepository : IRoleUpdateRepository
    {
        private readonly string _connection;

        public RoleUpdateRepository(string connection)
        {
            _connection = connection;
        }

        // =========================
        // CREATE REQUEST
        // =========================
        public async Task<long> CreateRequestAsync(RoleUpdateRequest req, CancellationToken ct)
        {
            using var cnn = new MySqlConnection(_connection);
            await cnn.OpenAsync(ct);

            string sql = @"
                INSERT INTO user_verification_requests
                (UserId, RoleRequest, State, RequestNotes, CreatedAt, UpdatedAt, ReviewedAt, ReviewedBy, IPAddress, AttemptNumber)
                VALUES
                (@UserId, @RoleRequest, @State, @RequestNotes, @CreatedAt, @UpdatedAt, @ReviewedAt, @ReviewedBy, @IPAddress, @AttemptNumber);

                SELECT LAST_INSERT_ID();";

            using var cmd = new MySqlCommand(sql, cnn);

            cmd.Parameters.AddWithValue("@UserId", req.UserId);
            cmd.Parameters.AddWithValue("@RoleRequest", req.RoleRequest);
            cmd.Parameters.AddWithValue("@State", req.State);
            cmd.Parameters.AddWithValue("@RequestNotes", req.RequestNotes);
            cmd.Parameters.AddWithValue("@CreatedAt", req.CreatedAt);
            cmd.Parameters.AddWithValue("@UpdatedAt", req.UpdatedAt);
            cmd.Parameters.AddWithValue("@ReviewedAt", req.ReviewedAt);
            cmd.Parameters.AddWithValue("@ReviewedBy", req.ReviewedBy);
            cmd.Parameters.AddWithValue("@IPAddress", req.IPAddress);
            cmd.Parameters.AddWithValue("@AttemptNumber", req.AttemptNumber);

            var id = await cmd.ExecuteScalarAsync(ct);
            return Convert.ToInt64(id);
        }

        // =========================
        // ADD DOCUMENT
        // =========================
        public async Task AddDocumentAsync(IdentityVerificationDocument doc, CancellationToken ct)
        {
            using var cnn = new MySqlConnection(_connection);
            await cnn.OpenAsync(ct);

            string sql = @"
                INSERT INTO user_verification_documents
                (RequestId, Type, Url, CreatedAt)
                VALUES
                (@RequestId, @Type, @Url, @CreatedAt);";

            using var cmd = new MySqlCommand(sql, cnn);

            cmd.Parameters.AddWithValue("@RequestId", doc.RequestId);
            cmd.Parameters.AddWithValue("@Type", doc.Type);
            cmd.Parameters.AddWithValue("@Url", doc.Url);
            cmd.Parameters.AddWithValue("@CreatedAt", doc.CreatedAt);

            await cmd.ExecuteNonQueryAsync(ct);
        }

        // =========================
        // GET REQUEST BY ID
        // =========================
        public async Task<RoleUpdateRequest?> GetRequestByIdAsync(long id, CancellationToken ct)
        {
            using var cnn = new MySqlConnection(_connection);
            await cnn.OpenAsync(ct);

            string sql = "SELECT * FROM user_verification_requests WHERE Id = @Id";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Id", id);

            using var reader = await cmd.ExecuteReaderAsync(ct);

            if (!await reader.ReadAsync(ct)) return null;

            var req = new RoleUpdateRequest
            {
                Id = reader.GetInt64("Id"),
                UserId = reader.GetInt64("UserId"),
                RoleRequest = reader.GetString("RoleRequest"),
                State = reader.GetString("State"),
                RequestNotes = reader["RequestNotes"] as string,
                CreatedAt = reader.GetDateTime("CreatedAt"),
                UpdatedAt = reader.GetDateTime("UpdatedAt"),
                ReviewedAt = reader["ReviewedAt"] as DateTime?,
                ReviewedBy = reader["ReviewedBy"] as long?,
                IPAddress = reader["IPAddress"] as string,
                AttemptNumber = reader.GetInt32("AttemptNumber")
            };

            return req;
        }

        // =========================
        // GET DOCUMENTS
        // =========================
        public async Task<List<IdentityVerificationDocument>> GetDocumentsAsync(long requestId, CancellationToken ct)
        {
            var list = new List<IdentityVerificationDocument>();

            using var cnn = new MySqlConnection(_connection);
            await cnn.OpenAsync(ct);

            string sql = "SELECT * FROM user_verification_documents WHERE RequestId = @RequestId";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@RequestId", requestId);

            using var reader = await cmd.ExecuteReaderAsync(ct);

            while (await reader.ReadAsync(ct))
            {
                list.Add(new IdentityVerificationDocument
                {
                    Id = reader.GetInt64("Id"),
                    RequestId = reader.GetInt64("RequestId"),
                    Type = reader.GetString("Type"),
                    Url = reader.GetString("Url"),
                    CreatedAt = reader.GetDateTime("CreatedAt")
                });
            }

            return list;
        }

        public async Task<RoleUpdateRequest?> GetRequestByUserIdAsync(long userId, CancellationToken ct)
        {
            using var cnn = new MySqlConnection(_connection);
            await cnn.OpenAsync(ct);

            string sql = @"SELECT * FROM user_verification_requests 
                        WHERE UserId = @UserId
                        ORDER BY CreatedAt DESC
                        LIMIT 1";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@UserId", userId);

            using var reader = await cmd.ExecuteReaderAsync(ct);

            if (!await reader.ReadAsync(ct)) return null;

            return new RoleUpdateRequest
            {
                Id = reader.GetInt64("Id"),
                UserId = reader.GetInt64("UserId"),
                RoleRequest = reader.GetString("RoleRequest"),
                State = reader.GetString("State"),
                RequestNotes = reader["RequestNotes"] as string,
                CreatedAt = reader.GetDateTime("CreatedAt"),
                UpdatedAt = reader.GetDateTime("UpdatedAt"),
                ReviewedAt = reader["ReviewedAt"] as DateTime?,
                ReviewedBy = reader["ReviewedBy"] as long?,
                IPAddress = reader["IPAddress"] as string,
                AttemptNumber = reader.GetInt32("AttemptNumber")
            };
        }

    }
}