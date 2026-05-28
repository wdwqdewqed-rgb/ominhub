using Dapper;
using MySql.Data.MySqlClient;
using OminHub.Api.Model;
using OminHub.Api.Repositories.Users.Creator;
using OminHub.Core.Models;
using OminHub.Core.Video.DTOs;
using OminHub.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Api.Repositories.Users.Creator
{
    public class CreatorRepository : ICreatorRepository
    {
        private readonly string _connection;

        public CreatorRepository(string connectionString)
        {
            _connection = connectionString;
        }

        private MySqlConnection GetConn() => new MySqlConnection(_connection);

        // ============================================================
        // VIDEO CREATION
        // ============================================================
        public async Task<long> CreateVideoAsync(Video video, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = @"
                INSERT INTO videos
                (UploaderId, Title, Description, CategoryId, IsSensitive,
                 Visibility, Status, ProcessingStatus,
                 OriginalFilePath, HlsPath, DurationSeconds, Width, Height,
                 MimeType, SizeBytes, AllowComments, RequiresApproval)
                VALUES
                (@UploaderId, @Title, @Description, @CategoryId, @IsSensitive,
                 @Visibility, @Status, @ProcessingStatus,
                 @OriginalFilePath, @HlsPath, @DurationSeconds, @Width, @Height,
                 @MimeType, @SizeBytes, @AllowComments, @RequiresApproval);

                SELECT LAST_INSERT_ID();
            ";

            using var cmd = new MySqlCommand(sql, cnn);

            cmd.Parameters.AddWithValue("@UploaderId", video.UploaderId);
            cmd.Parameters.AddWithValue("@Title", video.Title);
            cmd.Parameters.AddWithValue("@Description", (object?)video.Description ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@CategoryId", (object?)video.CategoryId ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@IsSensitive", video.IsSensitive);
            cmd.Parameters.AddWithValue("@Visibility", video.Visibility);
            cmd.Parameters.AddWithValue("@Status", video.Status);
            cmd.Parameters.AddWithValue("@ProcessingStatus", video.ProcessingStatus);
            cmd.Parameters.AddWithValue("@OriginalFilePath", (object?)video.OriginalFilePath ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@HlsPath", (object?)video.HlsPath ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@DurationSeconds", (object?)video.DurationSeconds ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Width", (object?)video.Width ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Height", (object?)video.Height ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@MimeType", (object?)video.MimeType ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@SizeBytes", (object?)video.SizeBytes ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@AllowComments", video.AllowComments);
            cmd.Parameters.AddWithValue("@RequiresApproval", video.RequiresApproval);

            var id = await cmd.ExecuteScalarAsync(ct);
            return Convert.ToInt64(id);
        }

        public async Task UpdateVideoFileAsync(
            long videoId,
            string publicUrl,
            string mimeType,
            long sizeBytes,
            CancellationToken ct
        )
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            var sql = @"
                UPDATE videos
                SET
                    OriginalFilePath = @Path,
                    MimeType = @Mime,
                    SizeBytes = @Size,
                    ProcessingStatus = 'uploaded',
                    UpdatedAt = CURRENT_TIMESTAMP
                WHERE Id = @Id AND IsDeleted = 0
            ";

            using var cmd = new MySqlCommand(sql, cnn);

            cmd.Parameters.AddWithValue("@Id", videoId);
            cmd.Parameters.AddWithValue("@Path", publicUrl);
            cmd.Parameters.AddWithValue("@Mime", mimeType);
            cmd.Parameters.AddWithValue("@Size", sizeBytes);

            await cmd.ExecuteNonQueryAsync(ct);
        }

        public async Task<string> GetProcessingStatusAsync(
            long videoId,
            CancellationToken ct
        )
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            using var cmd = new MySqlCommand(
                @"SELECT ProcessingStatus
                FROM videos
                WHERE Id = @Id
                LIMIT 1",
                cnn
            );

            cmd.Parameters.AddWithValue("@Id", videoId);

            var result = await cmd.ExecuteScalarAsync(ct);

            if (result == null || result == DBNull.Value)
                throw new InvalidOperationException(
                    $"Video {videoId} not found."
                );

            return Convert.ToString(result)!;
        }



        public async Task<long?> GetUploaderIdAsync(long videoId, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = "SELECT UploaderId FROM videos WHERE Id=@Id AND IsDeleted=0";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Id", videoId);

            var result = await cmd.ExecuteScalarAsync(ct);
            return result == null ? null : Convert.ToInt64(result);
        }

        public async Task AddVideoCategoriesAsync(
            long videoId,
            IEnumerable<int> categoryIds,
            CancellationToken ct
        )
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            foreach (var cid in categoryIds.Distinct())
            {
                using var cmd = new MySqlCommand(
                    @"INSERT IGNORE INTO video_categories (VideoId, CategoryId)
                      VALUES (@Vid, @Cid)",
                    cnn
                );

                cmd.Parameters.AddWithValue("@Vid", videoId);
                cmd.Parameters.AddWithValue("@Cid", cid);

                await cmd.ExecuteNonQueryAsync(ct);
            }
        }

        // ============================================================
        // UPDATE METADATA
        // ============================================================
        public async Task UpdateVideoMetadataAsync(Video video, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = @"
                UPDATE videos
                SET Title=@Title,
                    Description=@Description,
                    CategoryId=@CategoryId,
                    Visibility=@Visibility,
                    AllowComments=@AllowComments,
                    UpdatedAt=NOW()
                WHERE Id=@Id;
            ";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Id", video.Id);
            cmd.Parameters.AddWithValue("@Title", video.Title);
            cmd.Parameters.AddWithValue("@Description", (object?)video.Description ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@CategoryId", (object?)video.CategoryId ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Visibility", video.Visibility);
            cmd.Parameters.AddWithValue("@AllowComments", video.AllowComments);

            await cmd.ExecuteNonQueryAsync(ct);
        }
































        // ============================================================
        // SYNC – edición completa (add + remove)
        // ============================================================
        public async Task SyncVideoCategoriesAsync(
            long videoId,
            IEnumerable<int> categoryIds,
            CancellationToken ct
        )
        {
            var newSet = new HashSet<int>(categoryIds.Distinct());

            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            using var tx = await cnn.BeginTransactionAsync(ct);

            var existing = new HashSet<int>();

            using (var sel = new MySqlCommand(
                "SELECT CategoriesId FROM video_categories WHERE VideoId=@Vid",
                cnn, (MySqlTransaction)tx
            ))
            {
                sel.Parameters.AddWithValue("@Vid", videoId);

                using var rd = await sel.ExecuteReaderAsync(ct);
                while (await rd.ReadAsync(ct))
                    existing.Add(rd.GetInt32(0));
            }

            // Eliminar
            foreach (var toDelete in existing.Except(newSet))
            {
                using var del = new MySqlCommand(
                    "DELETE FROM video_categories WHERE VideoId=@Vid AND CategoriesId=@Cid",
                    cnn, (MySqlTransaction)tx
                );

                del.Parameters.AddWithValue("@Vid", videoId);
                del.Parameters.AddWithValue("@Cid", toDelete);

                await del.ExecuteNonQueryAsync(ct);
            }

            // Agregar
            foreach (var toAdd in newSet.Except(existing))
            {
                using var ins = new MySqlCommand(
                    "INSERT INTO video_categories (VideoId, CategoriesId) VALUES (@Vid, @Cid)",
                    cnn, (MySqlTransaction)tx
                );

                ins.Parameters.AddWithValue("@Vid", videoId);
                ins.Parameters.AddWithValue("@Cid", toAdd);

                await ins.ExecuteNonQueryAsync(ct);
            }

            await tx.CommitAsync(ct);
        }


        public async Task AddVideoTagsAsync(
            long videoId,
            IEnumerable<int> tagIds,
            CancellationToken ct
        )
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            foreach (var tid in tagIds.Distinct())
            {
                using var cmd = new MySqlCommand(
                    @"INSERT IGNORE INTO video_tags (VideoId, TagId)
                      VALUES (@Vid, @Tid)",
                    cnn
                );

                cmd.Parameters.AddWithValue("@Vid", videoId);
                cmd.Parameters.AddWithValue("@Tid", tid);

                await cmd.ExecuteNonQueryAsync(ct);
            }
        }

        // ============================================================
        // SYNC – edición completa (add + remove)
        // ============================================================
        public async Task SyncVideoTagsAsync(
            long videoId,
            IEnumerable<int> tagIds,
            CancellationToken ct
        )
        {
            var newSet = new HashSet<int>(tagIds.Distinct());

            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            using var tx = await cnn.BeginTransactionAsync(ct);

            var existing = new HashSet<int>();

            using (var sel = new MySqlCommand(
                "SELECT TagId FROM video_tags WHERE VideoId=@Vid",
                cnn, (MySqlTransaction)tx
            ))
            {
                sel.Parameters.AddWithValue("@Vid", videoId);

                using var rd = await sel.ExecuteReaderAsync(ct);
                while (await rd.ReadAsync(ct))
                    existing.Add(rd.GetInt32(0));
            }

            // Eliminar
            foreach (var toDelete in existing.Except(newSet))
            {
                using var del = new MySqlCommand(
                    "DELETE FROM video_tags WHERE VideoId=@Vid AND TagId=@Tid",
                    cnn, (MySqlTransaction)tx
                );

                del.Parameters.AddWithValue("@Vid", videoId);
                del.Parameters.AddWithValue("@Tid", toDelete);

                await del.ExecuteNonQueryAsync(ct);
            }

            // Agregar
            foreach (var toAdd in newSet.Except(existing))
            {
                using var ins = new MySqlCommand(
                    "INSERT INTO video_tags (VideoId, TagId) VALUES (@Vid, @Tid)",
                    cnn, (MySqlTransaction)tx
                );

                ins.Parameters.AddWithValue("@Vid", videoId);
                ins.Parameters.AddWithValue("@Tid", toAdd);

                await ins.ExecuteNonQueryAsync(ct);
            }

            await tx.CommitAsync(ct);
        }



























        

      
      
      
        public async Task InsertInitialVideoThumbnailsAsync(
            long videoId,
            IEnumerable<VideoThumbnailInput> thumbnails,
            CancellationToken ct
        )
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);
            using var tx = await cnn.BeginTransactionAsync(ct);

            foreach (var t in thumbnails)
            {
                var cmd = new MySqlCommand(
                    @"INSERT INTO video_thumbnails
                    (VideoId, FilePath, IsPrimary, OrderIndex, IsAutoGenerated)
                    VALUES (@Vid, @Path, @Primary, @Order, @Auto)",
                    cnn, (MySqlTransaction)tx
                );

                cmd.Parameters.AddWithValue("@Vid", videoId);
                cmd.Parameters.AddWithValue("@Path", t.FilePath);
                cmd.Parameters.AddWithValue("@Primary", t.IsPrimary);
                cmd.Parameters.AddWithValue("@Order", t.OrderIndex);
                cmd.Parameters.AddWithValue("@Auto", t.IsAutoGenerated);

                await cmd.ExecuteNonQueryAsync(ct);
            }

            await tx.CommitAsync(ct);
        }


        public async Task<IReadOnlyList<VideoThumbnail>> GetByVideoAsync(
            long videoId,
            CancellationToken ct
        )
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            var cmd = new MySqlCommand(
                "SELECT * FROM video_thumbnails WHERE VideoId=@Vid ORDER BY OrderIndex",
                cnn
            );
            cmd.Parameters.AddWithValue("@Vid", videoId);

            using var rd = await cmd.ExecuteReaderAsync(ct);
            var list = new List<VideoThumbnail>();

            while (await rd.ReadAsync(ct))
                list.Add(new VideoThumbnail().FromReader(rd));

            return list;
        }

        public async Task SyncVideoThumbnailsAsync(
            long videoId,
            IEnumerable<VideoThumbnailInput> thumbnails,
            CancellationToken ct
        )
        {
            var input = thumbnails.ToList();

            using var cnn = GetConn();
            await cnn.OpenAsync(ct);
            using var tx = await cnn.BeginTransactionAsync(ct);

            // 1. Obtener actuales
            var current = new Dictionary<long, long>(); // Id -> Id

            var load = new MySqlCommand(
                "SELECT Id FROM video_thumbnails WHERE VideoId=@Vid",
                cnn, (MySqlTransaction)tx
            );
            load.Parameters.AddWithValue("@Vid", videoId);

            using (var rd = await load.ExecuteReaderAsync(ct))
            {
                while (await rd.ReadAsync(ct))
                    current[rd.GetInt64(0)] = rd.GetInt64(0);
            }

            var keepIds = input.Where(x => x.Id.HasValue).Select(x => x.Id!.Value).ToHashSet();

            // 2. Eliminar las quitadas
            foreach (var id in current.Keys.Except(keepIds))
            {
                var del = new MySqlCommand(
                    "DELETE FROM video_thumbnails WHERE Id=@Id",
                    cnn, (MySqlTransaction)tx
                );
                del.Parameters.AddWithValue("@Id", id);
                await del.ExecuteNonQueryAsync(ct);
            }

            // 3. Reset primary
            var resetPrimary = new MySqlCommand(
                "UPDATE video_thumbnails SET IsPrimary=0 WHERE VideoId=@Vid",
                cnn, (MySqlTransaction)tx
            );
            resetPrimary.Parameters.AddWithValue("@Vid", videoId);
            await resetPrimary.ExecuteNonQueryAsync(ct);

            // 4. Insert / Update
            foreach (var t in input)
            {
                if (t.Id.HasValue)
                {
                    var upd = new MySqlCommand(
                        @"UPDATE video_thumbnails
                          SET FilePath=@Path,
                              IsPrimary=@Primary,
                              OrderIndex=@Order,
                              IsAutoGenerated=@Auto
                          WHERE Id=@Id",
                        cnn, (MySqlTransaction)tx
                    );
                    upd.Parameters.AddWithValue("@Id", t.Id);
                    upd.Parameters.AddWithValue("@Path", t.FilePath);
                    upd.Parameters.AddWithValue("@Primary", t.IsPrimary);
                    upd.Parameters.AddWithValue("@Order", t.OrderIndex);
                    upd.Parameters.AddWithValue("@Auto", t.IsAutoGenerated);
                    await upd.ExecuteNonQueryAsync(ct);
                }
                else
                {
                    var ins = new MySqlCommand(
                        @"INSERT INTO video_thumbnails
                          (VideoId, FilePath, IsPrimary, OrderIndex, IsAutoGenerated)
                          VALUES (@Vid, @Path, @Primary, @Order, @Auto)",
                        cnn, (MySqlTransaction)tx
                    );
                    ins.Parameters.AddWithValue("@Vid", videoId);
                    ins.Parameters.AddWithValue("@Path", t.FilePath);
                    ins.Parameters.AddWithValue("@Primary", t.IsPrimary);
                    ins.Parameters.AddWithValue("@Order", t.OrderIndex);
                    ins.Parameters.AddWithValue("@Auto", t.IsAutoGenerated);
                    await ins.ExecuteNonQueryAsync(ct);
                }
            }

            await tx.CommitAsync(ct);
        }





















        public async Task SyncVideoCollaboratorsAsync(
            long videoId,
            long creatorId,
            IEnumerable<long> collaboratorIds,
            CancellationToken ct
        )
        {
            var input = collaboratorIds.Distinct().ToList();

            using var cnn = GetConn();
            await cnn.OpenAsync(ct);
            using var tx = await cnn.BeginTransactionAsync(ct);

            // ======================================================
            // 1. Validar colaboradores (ownership + approved)
            // ======================================================
            if (input.Any())
            {
                var validate = new MySqlCommand(
                    @"
                    SELECT Id
                    FROM creator_collaborators
                    WHERE CreatorId = @CreatorId
                      AND RequestState = 'approved'
                      AND Id IN (" + string.Join(",", input.Select((_, i) => $"@c{i}")) + @")
                    ",
                    cnn, (MySqlTransaction)tx
                );

                validate.Parameters.AddWithValue("@CreatorId", creatorId);

                for (int i = 0; i < input.Count; i++)
                    validate.Parameters.AddWithValue($"@c{i}", input[i]);

                var valid = new HashSet<long>();
                using (var rd = await validate.ExecuteReaderAsync(ct))
                {
                    while (await rd.ReadAsync(ct))
                        valid.Add(rd.GetInt64(0));
                }

                if (valid.Count != input.Count)
                    throw new InvalidOperationException(
                        "One or more collaborators are invalid or not approved."
                    );
            }

            // ======================================================
            // 2. Cargar actuales
            // ======================================================
            var current = new HashSet<long>();

            var load = new MySqlCommand(
                "SELECT CollaboratorId FROM video_collaborators WHERE VideoId=@Vid",
                cnn, (MySqlTransaction)tx
            );
            load.Parameters.AddWithValue("@Vid", videoId);

            using (var rd = await load.ExecuteReaderAsync(ct))
            {
                while (await rd.ReadAsync(ct))
                    current.Add(rd.GetInt64(0));
            }

            // ======================================================
            // 3. Eliminar quitados
            // ======================================================
            foreach (var removed in current.Except(input))
            {
                var del = new MySqlCommand(
                    @"DELETE FROM video_collaborators
                      WHERE VideoId=@Vid AND CollaboratorId=@Cid",
                    cnn, (MySqlTransaction)tx
                );
                del.Parameters.AddWithValue("@Vid", videoId);
                del.Parameters.AddWithValue("@Cid", removed);
                await del.ExecuteNonQueryAsync(ct);
            }

            // ======================================================
            // 4. Insertar nuevos
            // ======================================================
            foreach (var added in input.Except(current))
            {
                var ins = new MySqlCommand(
                    @"INSERT INTO video_collaborators (VideoId, CollaboratorId)
                      VALUES (@Vid, @Cid)",
                    cnn, (MySqlTransaction)tx
                );
                ins.Parameters.AddWithValue("@Vid", videoId);
                ins.Parameters.AddWithValue("@Cid", added);
                await ins.ExecuteNonQueryAsync(ct);
            }

            await tx.CommitAsync(ct);
        }

















    

































    








        
        public async Task ApproveCommentAsync(long commentId, bool approve, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = "UPDATE video_comments SET IsApproved=@A WHERE Id=@Id";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@A", approve);
            cmd.Parameters.AddWithValue("@Id", commentId);

            await cmd.ExecuteNonQueryAsync(ct);
        }

        public async Task DeleteCommentAsync(long commentId, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = "UPDATE video_comments SET IsDeleted=1, DeletedAt=NOW() WHERE Id=@Id";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Id", commentId);

            await cmd.ExecuteNonQueryAsync(ct);
        }

        // ============================================================
        // GET THUMBNAILS
        // ============================================================
        public async Task<IEnumerable<VideoThumbnail>> GetThumbnailsAsync(
    long videoId,
    CancellationToken ct
)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            const string sql = @"
        SELECT
            Id,
            VideoId,
            FilePath,
            IsPrimary,
            OrderIndex,
            CreatedAt,
            LastShownAt,
            ServeWeight,
            IsAutoGenerated
        FROM video_thumbnails
        WHERE VideoId = @Id
        ORDER BY OrderIndex ASC
    ";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Id", videoId);

            using var rd = await cmd.ExecuteReaderAsync(ct);
            var list = new List<VideoThumbnail>();

            while (await rd.ReadAsync(ct))
            {
                list.Add(new VideoThumbnail
                {
                    Id = rd.GetInt64("Id"),
                    VideoId = rd.GetInt64("VideoId"),
                    FilePath = rd.GetString("FilePath"),

                    IsPrimary = rd.GetBoolean("IsPrimary"),
                    OrderIndex = rd.GetByte("OrderIndex"),

                    IsAutoGenerated = rd.GetBoolean("IsAutoGenerated"),

                    CreatedAt = rd.GetDateTime("CreatedAt"),
                    LastShownAt = rd["LastShownAt"] as DateTime?,
                    ServeWeight = rd.GetInt32("ServeWeight")
                });
            }

            return list;
        }



        // ============================================================
        // MODERATION
        // ============================================================
        public async Task<IEnumerable<Video>> GetPendingVideosAsync(int page, int pageSize, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = @"
                SELECT * FROM videos
                WHERE Status='pending'
                ORDER BY CreatedAt ASC
                LIMIT @Skip, @Take;
            ";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Skip", (page - 1) * pageSize);
            cmd.Parameters.AddWithValue("@Take", pageSize);

            var list = new List<Video>();
            using var rd = await cmd.ExecuteReaderAsync(ct);

            while (await rd.ReadAsync(ct))
                list.Add(new Video().FromReader(rd));

            return list;
        }

        public async Task<IReadOnlyList<CreatorVideoListItemDto>>
            GetVideosByUploaderAsync(long uploaderId, CancellationToken ct)
        {
            using var cnn = new MySqlConnection(_connection);
            await cnn.OpenAsync(ct);

            var sql = @"
                SELECT
                    Id,
                    Title,
                    Visibility,
                    Status,
                    ProcessingStatus,
                    CreatedAt,
                    PublishedAt,
                    ViewCount,
                    LikeCount,
                    CommentsCount
                FROM videos
                WHERE UploaderId = @UploaderId
                AND IsDeleted = 0
                ORDER BY CreatedAt DESC;
            ";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@UploaderId", uploaderId);

            using var rd = await cmd.ExecuteReaderAsync(ct);

            var list = new List<CreatorVideoListItemDto>();

            while (await rd.ReadAsync(ct))
            {
                list.Add(new CreatorVideoListItemDto
                {
                    Id = rd.GetInt64("Id"),
                    Title = rd.GetString("Title"),
                    Visibility = rd.GetString("Visibility"),
                    Status = rd.GetString("Status"),
                    ProcessingStatus = rd.GetString("ProcessingStatus"),
                    CreatedAt = rd.GetDateTime("CreatedAt"),
                    PublishedAt = rd.IsDBNull("PublishedAt")
                        ? null
                        : rd.GetDateTime("PublishedAt"),
                    ViewCount = rd.GetInt64("ViewCount"),
                    LikeCount = rd.GetInt32("LikeCount"),
                    CommentsCount = rd.GetInt32("CommentsCount")
                });
            }

            return list;
        }

        public async Task<UserAnalyticsDto> GetUserAnalyticsAsync(long userId)
        {
            using var cnn = GetConn();

            var sql = @"
            SELECT
                COUNT(*) AS TotalVideos,
                COALESCE(SUM(v.ViewCount), 0) AS TotalViews,
                COALESCE(SUM(v.LikeCount), 0) AS TotalLikes,
                COALESCE(SUM(v.CommentsCount), 0) AS TotalComments
            FROM videos v
            WHERE v.UploaderId = @userId
            AND v.IsDeleted = 0;
            ";

            return await cnn.QueryFirstAsync<UserAnalyticsDto>(sql, new { userId });
        }

        public async Task UpdateUserProfileAsync(long userId, UpdateUserProfileDto dto)
        {
            using var cnn = GetConn();

            var sql = @"
            INSERT INTO viewer_profile (UserId, DisplayName, Bio, Location, Links)
            VALUES (@userId, @DisplayName, @Bio, @Location, @Links)
            ON DUPLICATE KEY UPDATE
                DisplayName = VALUES(DisplayName),
                Bio = VALUES(Bio),
                Location = VALUES(Location),
                Links = VALUES(Links),
                UpdatedAt = CURRENT_TIMESTAMP();
            ";

            await cnn.ExecuteAsync(sql, new
            {
                userId,
                dto.DisplayName,
                dto.Bio,
                dto.Location,
                dto.Links
            });
        }
    }
}



/*


ETAPA 2: covers (imágenes de portada)

ETAPA 3: agregar collaboradores

ETAPA 4: transcodificación + HLS (FFmpeg)

ETAPA 5: Siguiente paso natural

El siguiente paso lógico es crear el endpoint maestro de creación de video que ejecute:

Create video

Upload file

Categories

Tags

Collaborators

Cuando quieras, avanzamos directamente a ese controller orquestador.

❌ No publicamos el video
❌ No cambiamos Status (draft → pending)
❌ No contamos duración
❌ No generamos thumbnails automáticos

Todo eso pertenece al orquestador maestro (ETAPA 5).*/