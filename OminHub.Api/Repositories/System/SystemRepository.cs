using Dapper;
using MySql.Data.MySqlClient;
using OminHub.Api.Model;
using OminHub.Core.Video;
using OminHub.Core.Video.DTOs;
using OminHub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Api.Repositories.System
{
    public class SystemRepository : ISystemRepository
    {
        private readonly string _connection;

        public SystemRepository(string connectionString)
        {
            _connection = connectionString;
        }

        private MySqlConnection GetConn()
            => new MySqlConnection(_connection);

        // ============================================================
        // GET VIDEO BY ID
        // ============================================================
        public async Task<Video?> GetVideoByIdAsync(long id, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = @"
                SELECT *
                FROM videos
                WHERE Id = @Id
                  AND Status = 'approved'
                  AND ProcessingStatus = 'ready'
                  AND IsDeleted = 0
                  AND Visibility = 'public'
                LIMIT 1;";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Id", id);

            using var rd = await cmd.ExecuteReaderAsync(ct);
            if (!await rd.ReadAsync(ct))
                return null;

            return new Video().FromReader(rd);
        }

        // ============================================================
        // LIST VIDEOS BY USER
        // ============================================================
        public async Task<IEnumerable<Video>> ListVideosByUserAsync(long userId, int page, int pageSize, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = @"
                SELECT *
                FROM videos
                WHERE UploaderId = @UserId
                ORDER BY CreatedAt DESC
                LIMIT @Skip, @Take;";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@UserId", userId);
            cmd.Parameters.AddWithValue("@Skip", (page - 1) * pageSize);
            cmd.Parameters.AddWithValue("@Take", pageSize);

            var list = new List<Video>();
            using var rd = await cmd.ExecuteReaderAsync(ct);

            while (await rd.ReadAsync(ct))
                list.Add(new Video().FromReader(rd));

            return list;
        }

        // ============================================================
        // SEARCH
        // ============================================================
        public async Task<IEnumerable<Video>> SearchVideosAsync(string q, int page, int pageSize, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = @"
                SELECT *
                FROM videos
                WHERE Title LIKE @Q
                ORDER BY CreatedAt DESC
                LIMIT @Skip, @Take;";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Q", "%" + q + "%");
            cmd.Parameters.AddWithValue("@Skip", (page - 1) * pageSize);
            cmd.Parameters.AddWithValue("@Take", pageSize);

            var list = new List<Video>();
            using var rd = await cmd.ExecuteReaderAsync(ct);

            while (await rd.ReadAsync(ct))
                list.Add(new Video().FromReader(rd));

            return list;
        }

        // ============================================================
        // SET PRIMARY THUMBNAIL
        // ============================================================
        public async Task SetPrimaryThumbnailAsync(long videoId, long thumbnailId, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            using var tx = await cnn.BeginTransactionAsync(ct);

            var sql1 = "UPDATE video_thumbnails SET IsPrimary = 0 WHERE VideoId = @Id";
            using (var cmd = new MySqlCommand(sql1, cnn, (MySqlTransaction)tx))
            {
                cmd.Parameters.AddWithValue("@Id", videoId);
                await cmd.ExecuteNonQueryAsync(ct);
            }

            var sql2 = "UPDATE video_thumbnails SET IsPrimary = 1 WHERE Id = @Tid AND VideoId = @Vid";
            using (var cmd = new MySqlCommand(sql2, cnn, (MySqlTransaction)tx))
            {
                cmd.Parameters.AddWithValue("@Tid", thumbnailId);
                cmd.Parameters.AddWithValue("@Vid", videoId);
                await cmd.ExecuteNonQueryAsync(ct);
            }

            await tx.CommitAsync(ct);
        }

        public async Task<int> GetReactionCountsAsync(long videoId, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = "SELECT COUNT(*) FROM video_reactions WHERE VideoId = @Vid AND Type = 'like'";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Vid", videoId);

            return Convert.ToInt32(await cmd.ExecuteScalarAsync(ct));
        }

        // ============================================================
        // VIEWS
        // ============================================================
        public async Task AddViewAsync(long videoId, long? userId, string? deviceId, string? ip, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = @"
                INSERT INTO video_views (VideoId, UserId, DeviceId, IpAddress)
                VALUES (@Vid, @Uid, @Dev, @Ip);";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Vid", videoId);
            cmd.Parameters.AddWithValue("@Uid", (object?)userId ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Dev", (object?)deviceId ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Ip", (object?)ip ?? DBNull.Value);

            await cmd.ExecuteNonQueryAsync(ct);
        }

        public async Task<long> GetViewCountAsync(long videoId, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = "SELECT COUNT(*) FROM video_views WHERE VideoId = @Vid";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Vid", videoId);

            return Convert.ToInt64(await cmd.ExecuteScalarAsync(ct));
        }

        public async Task<IEnumerable<VideoComment>> GetCommentsAsync(long videoId, int page, int pageSize, CancellationToken ct)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            string sql = @"
                SELECT *
                FROM video_comments
                WHERE VideoId = @Vid
                  AND IsDeleted = 0
                  AND IsApproved = 1
                ORDER BY CreatedAt ASC
                LIMIT @Skip, @Take;";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Vid", videoId);
            cmd.Parameters.AddWithValue("@Skip", (page - 1) * pageSize);
            cmd.Parameters.AddWithValue("@Take", pageSize);

            var list = new List<VideoComment>();
            using var rd = await cmd.ExecuteReaderAsync(ct);

            while (await rd.ReadAsync(ct))
            {
                list.Add(new VideoComment
                {
                    Id = Convert.ToInt64(rd["Id"]),
                    VideoId = Convert.ToInt64(rd["VideoId"]),
                    UserId = Convert.ToInt64(rd["UserId"]),
                    ParentCommentId = rd["ParentCommentId"] != DBNull.Value ? Convert.ToInt64(rd["ParentCommentId"]) : (long?)null,
                    Body = Convert.ToString(rd["Body"]) ?? "",
                    IsApproved = Convert.ToBoolean(rd["IsApproved"]),
                    IsDeleted = Convert.ToBoolean(rd["IsDeleted"]),
                    CreatedAt = Convert.ToDateTime(rd["CreatedAt"]),
                    UpdatedAt = rd["UpdatedAt"] == DBNull.Value ? null : Convert.ToDateTime(rd["UpdatedAt"]),
                    DeletedAt = rd["DeletedAt"] == DBNull.Value ? null : Convert.ToDateTime(rd["DeletedAt"])
                });
            }

            return list;
        }

        public async Task<ViewerProfile?> GetProfileAsync(long userId)
        {
            using var conn = GetConn();
            await conn.OpenAsync();

            const string sql = @"
                SELECT Id, UserId, DisplayName, Bio, AvatarUrl
                FROM viewer_profile
                WHERE UserId = @UserId
                LIMIT 1;";

            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@UserId", userId);

            using var reader = await cmd.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
                return null;

            return new ViewerProfile
            {
                Id = Convert.ToInt64(reader["Id"]),
                UserId = Convert.ToInt64(reader["UserId"]),
                DisplayName = reader["DisplayName"] == DBNull.Value ? null : Convert.ToString(reader["DisplayName"]),
                Bio = reader["Bio"] == DBNull.Value ? null : Convert.ToString(reader["Bio"]),
                AvatarUrl = reader["AvatarUrl"] == DBNull.Value ? null : Convert.ToString(reader["AvatarUrl"])
            };
        }

        public async Task<PagedResult<FeaturedVideoDto>> GetFeaturedVideos(int page, int pageSize)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync();

            var offset = (page - 1) * pageSize;

            string sql = @"
                SELECT 
                    v.Id,
                    v.Title,
                    vt.FilePath AS ThumbnailUrl,
                    v.DurationSeconds,
                    v.ViewCount,
                    GROUP_CONCAT(DISTINCT c.Name) AS Categories,
                    GROUP_CONCAT(DISTINCT t.Name) AS Tags
                FROM videos v
                LEFT JOIN video_thumbnails vt ON vt.VideoId = v.Id AND vt.OrderIndex = 0
                LEFT JOIN video_categories vc ON vc.VideoId = v.Id
                LEFT JOIN categories c ON c.Id = vc.CategoriesId
                LEFT JOIN video_tags vtg ON vtg.VideoId = v.Id
                LEFT JOIN tags t ON t.Id = vtg.TagId
                WHERE v.Status = 'approved'
                  AND v.ProcessingStatus = 'ready'
                  AND v.IsDeleted = 0
                GROUP BY v.Id
                ORDER BY v.ViewCount DESC
                LIMIT @Take OFFSET @Skip;";

            using var cmd = new MySqlCommand(sql, cnn);
            cmd.Parameters.AddWithValue("@Take", pageSize);
            cmd.Parameters.AddWithValue("@Skip", offset);

            var list = new List<FeaturedVideoDto>();

            using var rd = await cmd.ExecuteReaderAsync();

            while (await rd.ReadAsync())
            {
                list.Add(new FeaturedVideoDto
                {
                    Id = Convert.ToInt64(rd["Id"]),
                    Title = Convert.ToString(rd["Title"]) ?? "",
                    ThumbnailUrl = rd["ThumbnailUrl"]?.ToString(),
                    Duration = TimeSpan.FromSeconds(Convert.ToInt32(rd["DurationSeconds"])).ToString(@"mm\:ss"),
                    Views = Convert.ToInt64(rd["ViewCount"]),
                    Categories = rd["Categories"]?.ToString()?.Split(',').ToList() ?? new List<string>(),
                    Tags = rd["Tags"]?.ToString()?.Split(',').ToList() ?? new List<string>()
                });
            }

            await rd.CloseAsync();

            string countSql = @"
                SELECT COUNT(*) 
                FROM videos
                WHERE Status = 'approved'
                  AND ProcessingStatus = 'ready'
                  AND IsDeleted = 0;";

            using var countCmd = new MySqlCommand(countSql, cnn);
            var totalCount = Convert.ToInt32(await countCmd.ExecuteScalarAsync());

            return new PagedResult<FeaturedVideoDto>
            {
                Items = list,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            };
        }

        public async Task<VideoDetailDto?> GetVideoDetailAsync(long id, long? userId)
        {
            using var conn = GetConn();
            await conn.OpenAsync();

            var video = await conn.QuerySingleOrDefaultAsync<VideoDetailRaw>(
                MainQuery,
                new { id, userId });

            if (video == null)
                return null;

            var categories = (await conn.QueryAsync<string>(CategoriesQuery, new { id })).ToList();
            var tags = (await conn.QueryAsync<string>(TagsQuery, new { id })).ToList();

            string? userReaction = null;

            if (userId.HasValue)
            {
                userReaction = await conn.QuerySingleOrDefaultAsync<string>(
                    @"SELECT Type
                      FROM video_reactions
                      WHERE VideoId = @id AND UserId = @userId
                      LIMIT 1;",
                    new { id, userId });
            }

            return new VideoDetailDto
            {
                Id = video.Id,
                Title = video.Title,
                Description = video.Description,
                VideoUrl = video.HlsPath,
                ThumbnailUrl = video.ThumbnailPath ?? "",
                Duration = FormatDuration(video.DurationSeconds),
                Views = video.ViewCount,
                UploadDate = video.PublishedAt.ToString("dd/MM/yyyy"),

                Categories = categories,
                Tags = tags,

                ChannelId = video.UploaderId,
                ChannelName = video.Username,
                ChannelAvatar = video.AvatarUrl,
                ChannelVerified = video.Role == "Creator" || video.Role == "Studio",
                Subscribers = video.SubscribersCount,

                Likes = video.LikeCount,
                Dislikes = video.DislikeCount,

                UserReaction = userReaction,
                IsSubscribed = video.IsSubscribed
            };
        }

        private static string FormatDuration(int? seconds)
        {
            if (!seconds.HasValue)
                return "0:00";

            var ts = TimeSpan.FromSeconds(seconds.Value);
            return $"{(int)ts.TotalMinutes}:{ts.Seconds:D2}";
        }

        private const string MainQuery = @"
SELECT
    v.Id,
    v.Title,
    v.Description,
    v.HlsPath,
    v.DurationSeconds,
    v.ViewCount,
    v.PublishedAt,
    v.LikeCount,
    v.DislikeCount,
    v.UploaderId,

    u.Username,
    u.Role,

    vp.AvatarUrl,

    vt.FilePath AS ThumbnailPath,

    (
        SELECT COUNT(*) 
        FROM channel_subscriptions csCount
        WHERE csCount.ChannelId = v.UploaderId
    ) AS SubscribersCount,

    CASE 
        WHEN @userId IS NULL THEN 0
        WHEN EXISTS (
            SELECT 1 
            FROM channel_subscriptions csUser
            WHERE csUser.ChannelId = v.UploaderId
              AND csUser.SubscriberId = @userId
        ) THEN 1
        ELSE 0
    END AS IsSubscribed

FROM videos v
JOIN usuarios u ON u.Id = v.UploaderId
LEFT JOIN viewer_profile vp ON vp.UserId = v.UploaderId
LEFT JOIN video_thumbnails vt ON vt.VideoId = v.Id AND vt.IsPrimary = 1

WHERE v.Id = @id
  AND v.Visibility = 'public'
  AND v.Status = 'approved'
  AND v.ProcessingStatus = 'ready'
  AND v.IsDeleted = 0

LIMIT 1;
";

        private const string CategoriesQuery = @"
SELECT c.Name
FROM video_categories vc
JOIN categories c ON c.Id = vc.CategoriesId
WHERE vc.VideoId = @id;
";

        private const string TagsQuery = @"
SELECT t.Name
FROM video_tags vt
JOIN tags t ON t.Id = vt.TagId
WHERE vt.VideoId = @id;
";

private const string SameChannelMainQuery = @"
SELECT *
FROM (
    SELECT
        v.Id,
        v.Title,
        v.HlsPath,
        v.DurationSeconds,
        v.ViewCount,
        v.PublishedAt,
        v.LikeCount,
        v.DislikeCount,
        v.UploaderId,

        u.Username,
        u.Role,
        u.SubscribersCount,

        vp.AvatarUrl,
        vt.FilePath AS ThumbnailPath

    FROM videos v
    JOIN usuarios u ON u.Id = v.UploaderId
    LEFT JOIN viewer_profile vp ON vp.UserId = v.UploaderId
    LEFT JOIN video_thumbnails vt ON vt.VideoId = v.Id AND vt.IsPrimary = 1

    WHERE v.UploaderId = (
        SELECT UploaderId FROM videos WHERE Id = @id
    )
      AND v.Id <> @id
      AND v.Visibility = 'public'
      AND v.Status = 'approved'
      AND v.ProcessingStatus = 'ready'
      AND v.IsDeleted = 0

    ORDER BY v.ViewCount DESC
    LIMIT 100
) AS pool
ORDER BY RAND()
LIMIT @limit;
";

private const string TrendingMainQuery = @"
SELECT *
FROM (
    SELECT
        v.Id,
        v.Title,
        v.HlsPath,
        v.DurationSeconds,
        v.ViewCount,
        v.PublishedAt,
        v.LikeCount,
        v.DislikeCount,
        v.UploaderId,

        u.Username,
        u.Role,
        u.SubscribersCount,

        vp.AvatarUrl,
        vt.FilePath AS ThumbnailPath

    FROM videos v
    JOIN usuarios u ON u.Id = v.UploaderId
    LEFT JOIN viewer_profile vp ON vp.UserId = v.UploaderId
    LEFT JOIN video_thumbnails vt ON vt.VideoId = v.Id AND vt.IsPrimary = 1

    WHERE v.Visibility = 'public'
      AND v.Status = 'approved'
      AND v.ProcessingStatus = 'ready'
      AND v.IsDeleted = 0

    ORDER BY v.ViewCount DESC
    LIMIT 100
) AS pool
ORDER BY RAND()
LIMIT @limit;
";

        private const string RelatedMainQuery = @"
SELECT *
FROM (
    SELECT DISTINCT
        v.Id,
        v.Title,
        v.HlsPath,
        v.DurationSeconds,
        v.ViewCount,
        v.PublishedAt,
        v.LikeCount,
        v.DislikeCount,
        v.UploaderId,

        u.Username,
        u.Role,
        u.SubscribersCount,

        vp.AvatarUrl,
        vt.FilePath AS ThumbnailPath

    FROM videos v
    JOIN video_categories vc ON vc.VideoId = v.Id
    JOIN video_categories basevc ON basevc.VideoId = @id
        AND vc.CategoriesId = basevc.CategoriesId

    JOIN usuarios u ON u.Id = v.UploaderId
    LEFT JOIN viewer_profile vp ON vp.UserId = v.UploaderId
    LEFT JOIN video_thumbnails vt ON vt.VideoId = v.Id AND vt.IsPrimary = 1

    WHERE v.Id <> @id
      AND v.Visibility = 'public'
      AND v.Status = 'approved'
      AND v.ProcessingStatus = 'ready'
      AND v.IsDeleted = 0

    ORDER BY v.ViewCount DESC
    LIMIT 100
) AS pool
ORDER BY RAND()
LIMIT @limit;
";

        public async Task<PagedCommentsResult> GetVideoCommentsAsync(
            long videoId,
            int page,
            int pageSize,
            string sort,
            long? currentUserId)
        {
            using var conn = GetConn();
            await conn.OpenAsync();

            var offset = (page - 1) * pageSize;

            string orderBy = sort switch
            {
                "oldest" => "c.CreatedAt ASC",
                "top" => "COALESCE(rx.Likes, 0) DESC, c.CreatedAt DESC",
                _ => "c.CreatedAt DESC"
            };

            // 1) Total de comentarios raíz
            using var totalCmd = conn.CreateCommand();
            totalCmd.CommandText = @"
                SELECT COUNT(*)
                FROM video_comments
                WHERE VideoId = @videoId
                  AND ParentCommentId IS NULL
                  AND IsDeleted = 0
                  AND IsApproved = 1;";

            totalCmd.Parameters.Add(new MySqlParameter("@videoId", videoId));
            var totalCount = Convert.ToInt32(await totalCmd.ExecuteScalarAsync());

            // 2) IDs paginados
            using var idsCmd = conn.CreateCommand();
            idsCmd.CommandText = $@"
                SELECT c.Id
                FROM video_comments c
                LEFT JOIN (
                    SELECT
                        r.CommentId,
                        SUM(CASE WHEN r.IsLike = 1 THEN 1 ELSE 0 END) AS Likes
                    FROM video_comment_reactions r
                    GROUP BY r.CommentId
                ) rx ON rx.CommentId = c.Id
                WHERE c.VideoId = @videoId
                  AND c.ParentCommentId IS NULL
                  AND c.IsDeleted = 0
                  AND c.IsApproved = 1
                ORDER BY {orderBy}
                LIMIT @limit OFFSET @offset;";

            idsCmd.Parameters.Add(new MySqlParameter("@videoId", videoId));
            idsCmd.Parameters.Add(new MySqlParameter("@limit", pageSize));
            idsCmd.Parameters.Add(new MySqlParameter("@offset", offset));

            var rootIds = new List<long>();

            using (var reader = await idsCmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                    rootIds.Add(reader.GetInt64(0));
            }

            if (rootIds.Count == 0)
            {
                return new PagedCommentsResult
                {
                    Page = page,
                    PageSize = pageSize,
                    TotalCount = totalCount,
                    TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                    Items = new List<CommentDto>()
                };
            }

            var idsCsv = string.Join(",", rootIds);

            // 3) Comentarios raíz
            using var commentsCmd = conn.CreateCommand();
            commentsCmd.CommandText = $@"
                SELECT 
                    c.Id,
                    c.Body,
                    c.CreatedAt,

                    u.Id AS AuthorId,
                    u.Username AS AuthorName,
                    vp.AvatarUrl AS AuthorAvatar,
                    0 AS AuthorVerified,

                    COALESCE(SUM(CASE WHEN r.IsLike = 1 THEN 1 ELSE 0 END), 0) AS Likes,
                    COALESCE(SUM(CASE WHEN r.IsLike = 0 THEN 1 ELSE 0 END), 0) AS Dislikes,

                    MAX(CASE 
                        WHEN r.UserId = @currentUserId AND r.IsLike = 1 THEN 'like'
                        WHEN r.UserId = @currentUserId AND r.IsLike = 0 THEN 'dislike'
                        ELSE NULL
                    END) AS CurrentUserReaction

                FROM video_comments c
                JOIN usuarios u ON u.Id = c.UserId
                LEFT JOIN viewer_profile vp ON vp.UserId = c.UserId
                LEFT JOIN video_comment_reactions r ON r.CommentId = c.Id
                WHERE c.Id IN ({idsCsv})
                GROUP BY
                    c.Id, c.Body, c.CreatedAt,
                    u.Id, u.Username, vp.AvatarUrl
                ORDER BY FIELD(c.Id, {idsCsv});";

            commentsCmd.Parameters.Add(
                new MySqlParameter("@currentUserId", currentUserId ?? (object)DBNull.Value));

            var rootComments = new Dictionary<long, CommentDto>();

            using (var reader = await commentsCmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    var dto = new CommentDto
                    {
                        Id = reader.GetInt64(0),
                        Body = reader.GetString(1),
                        CreatedAt = reader.GetDateTime(2),

                        AuthorId = reader.GetInt64(3),
                        AuthorName = reader.GetString(4),
                        AuthorAvatar = reader.IsDBNull(5) ? null : reader.GetString(5),
                        AuthorVerified = reader.GetBoolean(6),

                        Likes = reader.GetInt32(7),
                        Dislikes = reader.GetInt32(8),
                        CurrentUserReaction = reader.IsDBNull(9) ? null : reader.GetString(9),

                        Replies = new List<CommentDto>()
                    };

                    rootComments[dto.Id] = dto;
                }
            }

            // 4) Replies
            using var repliesCmd = conn.CreateCommand();
            repliesCmd.CommandText = $@"
                SELECT
                    c.Id,
                    c.ParentCommentId,
                    c.Body,
                    c.CreatedAt,

                    u.Id AS AuthorId,
                    u.Username AS AuthorName,
                    vp.AvatarUrl AS AuthorAvatar,
                    0 AS AuthorVerified,

                    COALESCE(SUM(CASE WHEN r.IsLike = 1 THEN 1 ELSE 0 END), 0) AS Likes,
                    COALESCE(SUM(CASE WHEN r.IsLike = 0 THEN 1 ELSE 0 END), 0) AS Dislikes,

                    MAX(CASE 
                        WHEN r.UserId = @currentUserId AND r.IsLike = 1 THEN 'like'
                        WHEN r.UserId = @currentUserId AND r.IsLike = 0 THEN 'dislike'
                        ELSE NULL
                    END) AS CurrentUserReaction

                FROM video_comments c
                JOIN usuarios u ON u.Id = c.UserId
                LEFT JOIN viewer_profile vp ON vp.UserId = c.UserId
                LEFT JOIN video_comment_reactions r ON r.CommentId = c.Id
                WHERE c.ParentCommentId IN ({idsCsv})
                  AND c.IsDeleted = 0
                  AND c.IsApproved = 1
                GROUP BY
                    c.Id, c.ParentCommentId, c.Body, c.CreatedAt,
                    u.Id, u.Username, vp.AvatarUrl
                ORDER BY c.CreatedAt ASC;";

            repliesCmd.Parameters.Add(
                new MySqlParameter("@currentUserId", currentUserId ?? (object)DBNull.Value));

            using (var reader = await repliesCmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    var reply = new CommentDto
                    {
                        Id = reader.GetInt64(0),
                        Body = reader.GetString(2),
                        CreatedAt = reader.GetDateTime(3),

                        AuthorId = reader.GetInt64(4),
                        AuthorName = reader.GetString(5),
                        AuthorAvatar = reader.IsDBNull(6) ? null : reader.GetString(6),
                        AuthorVerified = reader.GetBoolean(7),

                        Likes = reader.GetInt32(8),
                        Dislikes = reader.GetInt32(9),
                        CurrentUserReaction = reader.IsDBNull(10) ? null : reader.GetString(10),

                        Replies = new List<CommentDto>()
                    };

                    var parentId = reader.GetInt64(1);

                    if (rootComments.TryGetValue(parentId, out var parent))
                        parent.Replies.Add(reply);
                }
            }

            return new PagedCommentsResult
            {
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Items = rootComments.Values.ToList()
            };
        }

        public async Task<List<VideoCardDto>> GetRelatedVideosAsync(long id, int limit = 12)
        {
            using var conn = GetConn();
            await conn.OpenAsync();

            var videos = await conn.QueryAsync<VideoCardRaw>(
                RelatedMainQuery,
                new { id, limit });

            var result = new List<VideoCardDto>();

            foreach (var v in videos)
            {
                result.Add(new VideoCardDto
                {
                    Id = v.Id,
                    Title = v.Title,
                    VideoUrl = v.HlsPath,
                    ThumbnailUrl = v.ThumbnailPath,
                    Duration = FormatDuration(v.DurationSeconds),
                    Views = v.ViewCount,
                    UploadDate = v.PublishedAt,

                    ChannelId = v.UploaderId,
                    ChannelName = v.Username,
                    ChannelAvatar = v.AvatarUrl,
                    ChannelVerified = v.Role == "Creator" || v.Role == "Studio",
                    Subscribers = v.SubscribersCount,

                    Likes = v.LikeCount,
                    Dislikes = v.DislikeCount
                });
            }

            return result;
        }

        public async Task<List<VideoCardDto>> GetSameChannelVideosAsync(long id, int limit = 12)
        {
            using var conn = GetConn();
            await conn.OpenAsync();

            var videos = await conn.QueryAsync<VideoCardRaw>(
                SameChannelMainQuery,
                new { id, limit });

            var result = new List<VideoCardDto>();

            foreach (var v in videos)
            {
                result.Add(new VideoCardDto
                {
                    Id = v.Id,
                    Title = v.Title,
                    VideoUrl = v.HlsPath,
                    ThumbnailUrl = v.ThumbnailPath,
                    Duration = FormatDuration(v.DurationSeconds),
                    Views = v.ViewCount,
                    UploadDate = v.PublishedAt,

                    ChannelId = v.UploaderId,
                    ChannelName = v.Username,
                    ChannelAvatar = v.AvatarUrl,
                    ChannelVerified = v.Role == "Creator" || v.Role == "Studio",
                    Subscribers = v.SubscribersCount,

                    Likes = v.LikeCount,
                    Dislikes = v.DislikeCount
                });
            }

            return result;
        }

        public async Task<List<VideoCardDto>> GetTrendingVideosAsync(long id, int limit = 12)
        {
            using var conn = GetConn();
            await conn.OpenAsync();

            var videos = await conn.QueryAsync<VideoCardRaw>(
                TrendingMainQuery,
                new { id, limit });

            var result = new List<VideoCardDto>();

            foreach (var v in videos)
            {
                result.Add(new VideoCardDto
                {
                    Id = v.Id,
                    Title = v.Title,
                    VideoUrl = v.HlsPath,
                    ThumbnailUrl = v.ThumbnailPath,
                    Duration = FormatDuration(v.DurationSeconds),
                    Views = v.ViewCount,
                    UploadDate = v.PublishedAt,

                    ChannelId = v.UploaderId,
                    ChannelName = v.Username,
                    ChannelAvatar = v.AvatarUrl,
                    ChannelVerified = v.Role == "Creator" || v.Role == "Studio",
                    Subscribers = v.SubscribersCount,

                    Likes = v.LikeCount,
                    Dislikes = v.DislikeCount
                });
            }

            return result;
        }

        public async Task<bool> RegisterVideoViewAsync(
    long videoId,
    long? userId,
    string? ipAddress,
    CancellationToken ct)
{
    using var cnn = GetConn();
    await cnn.OpenAsync(ct);

    using var tx = cnn.BeginTransaction();

    try
    {
        var rows = await cnn.ExecuteAsync(
            @"
            INSERT INTO video_views (VideoId, UserId, IpAddress)
            SELECT @videoId, @userId, @ipAddress
            WHERE NOT EXISTS (
                SELECT 1
                FROM video_views
                WHERE VideoId = @videoId
                  AND (
                        (@userId IS NOT NULL AND UserId = @userId)
                     OR (@userId IS NULL AND UserId IS NULL AND IpAddress = @ipAddress)
                  )
                  AND ViewedAt >= DATE_SUB(UTC_TIMESTAMP(), INTERVAL 30 MINUTE)
            );
            ",
            new { videoId, userId, ipAddress },
            tx);

        if (rows > 0)
        {
            await cnn.ExecuteAsync(
                @"UPDATE videos
                  SET ViewCount = ViewCount + 1
                  WHERE Id = @videoId",
                new { videoId },
                tx);
        }

        await tx.CommitAsync();
        return true;
    }
    catch
    {
        await tx.RollbackAsync();
        throw;
    }
}



public async Task<UserProfileDto?> GetUserByIdAsync(long userId)
{
    using var cnn = GetConn();

    var sql = @"
    SELECT
        u.Id,
        u.Username,
        vp.DisplayName,
        u.Rol AS Role,

        vp.AvatarUrl,
        vp.CoverUrl,

        vp.Bio,
        vp.Location,
        vp.Links

    FROM usuarios u
    LEFT JOIN viewer_profile vp ON vp.UserId = u.Id
    WHERE u.Id = @userId
    LIMIT 1;
    ";

    return await cnn.QueryFirstOrDefaultAsync<UserProfileDto>(
        sql,
        new { userId });
}

public async Task<IEnumerable<UserVideoDto>> GetUserVideosAsync(long userId)
{
    using var cnn = GetConn();

    var sql = @"
    SELECT
        v.Id,
        v.Title,
        v.HlsPath,
        v.DurationSeconds,
        v.ViewCount,
        v.LikeCount,
        v.CommentsCount,
        v.PublishedAt,

        vt.FilePath AS ThumbnailPath

    FROM videos v
    LEFT JOIN video_thumbnails vt ON vt.VideoId = v.Id AND vt.IsPrimary = 1

    WHERE v.UploaderId = @userId
      AND v.Visibility = 'public'
      AND v.Status = 'approved'
      AND v.ProcessingStatus = 'ready'
      AND v.IsDeleted = 0

    ORDER BY v.PublishedAt DESC
    LIMIT 50;
    ";

    return await cnn.QueryAsync<UserVideoDto>(sql, new { userId });
}
    }
}