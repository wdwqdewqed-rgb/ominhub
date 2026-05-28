using MySql.Data.MySqlClient;
using OminHub.Api.Model;
using OminHub.Models;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Api.Repositories.System
{
    public class CatalogRepository : ICatalogRepository
    {
        private readonly string _connection;

        public CatalogRepository(string connection)
        {
            _connection = connection;
        }

        public async Task<List<Category>> GetCategoriesAsync(CancellationToken ct)
        {
            var list = new List<Category>();

            using var cnn = new MySqlConnection(_connection);
            await cnn.OpenAsync(ct);

            const string sql = "SELECT Id, Name, Slug FROM categories ORDER BY Name";

            using var cmd = new MySqlCommand(sql, cnn);
            using var reader = await cmd.ExecuteReaderAsync(ct);

            while (await reader.ReadAsync(ct))
            {
                list.Add(new Category
                {
                    Id = reader.GetInt64("Id"),
                    Name = reader.GetString("Name"),
                    Slug = reader.GetString("Slug")
                });
            }

            return list;
        }

        public async Task<List<Tag>> GetTagsAsync(CancellationToken ct)
        {
            var list = new List<Tag>();

            using var cnn = new MySqlConnection(_connection);
            await cnn.OpenAsync(ct);

            const string sql = "SELECT Id, Name, Slug FROM tags ORDER BY Name";

            using var cmd = new MySqlCommand(sql, cnn);
            using var reader = await cmd.ExecuteReaderAsync(ct);

            while (await reader.ReadAsync(ct))
            {
                list.Add(new Tag
                {
                    Id = reader.GetInt64("Id"),
                    Name = reader.GetString("Name"),
                    Slug = reader.GetString("Slug")
                });
            }

            return list;
        }
    }
}
