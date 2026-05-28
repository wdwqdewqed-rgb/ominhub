using MySql.Data.MySqlClient;
using OminHub.Api.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Api.Repositories.System
{
    public class CollaboratorCatalogRepository : ICollaboratorCatalogRepository
    {
        private readonly string _connection;

        public CollaboratorCatalogRepository(string connection)
        {
            _connection = connection;
        }

        public async Task<List<CatalogCollaborator>> GetCollaboratorsByCreatorAsync(
            ulong creatorId,
            CancellationToken ct
        )
        {
            var list = new List<CatalogCollaborator>();

            using var cnn = new MySqlConnection(_connection);
            await cnn.OpenAsync(ct);

            const string sql = @"
                SELECT * FROM creator_collaborators
                WHERE CreatorId=@Cid
                ORDER BY CreatedAt DESC";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Cid", creatorId);

            using var reader = await cmd.ExecuteReaderAsync(ct);

            while (await reader.ReadAsync(ct))
            {
                list.Add(new CatalogCollaborator
                {
                    Id = (ulong)reader.GetInt64("Id"),
                    CreatorId = (ulong)reader.GetInt64("CreatorId"),
                    Type = reader.GetString("Type"),
                    Name = reader.GetString("Name"),
                    Document = reader.GetString("Document"),
                    Role = reader.GetString("Role"),
                    ConsentFileUrl = reader.GetString("ConsentFileUrl"),
                    LinkedUserId = reader.IsDBNull(reader.GetOrdinal("LinkedUserId"))
                        ? null
                        : (byte)reader.GetInt64("LinkedUserId"),
                    RequestState = reader.GetString("RequestState"),
                    CreatedAt = reader.GetDateTime("CreatedAt"),
                    ApprovedAt = reader.IsDBNull(reader.GetOrdinal("ApprovedAt"))
                        ? null
                        : reader.GetDateTime("ApprovedAt"),
                    RejectedAt = reader.IsDBNull(reader.GetOrdinal("RejectedAt"))
                        ? null
                        : reader.GetDateTime("RejectedAt")
                });
            }

            return list;
        }

        public async Task<ulong> CreateCollaboratorAsync(
            CatalogCollaborator e,
            CancellationToken ct
        )
        {
            using var cnn = new MySqlConnection(_connection);
            await cnn.OpenAsync(ct);

            const string sql = @"
            INSERT INTO creator_collaborators
            (CreatorId, Type, Name, Document, Role, ConsentFileUrl, RequestState)
            VALUES
            (@CreatorId, @Type, @Name, @Document, @Role, @ConsentFileUrl, 'pending');
            SELECT LAST_INSERT_ID();";

            using var cmd = new MySqlCommand(sql, cnn);

            cmd.Parameters.AddWithValue("@CreatorId", e.CreatorId);
            cmd.Parameters.AddWithValue("@Type", e.Type);
            cmd.Parameters.AddWithValue("@Name", e.Name);
            cmd.Parameters.AddWithValue("@Document", e.Document);
            cmd.Parameters.AddWithValue("@Role", e.Role);
            cmd.Parameters.AddWithValue("@ConsentFileUrl", e.ConsentFileUrl);


            var id = await cmd.ExecuteScalarAsync(ct);

            return Convert.ToUInt64(id);
        }
    }
}
