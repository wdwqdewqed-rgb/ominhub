using Dapper;
using MySql.Data.MySqlClient;
using OminHub.Api.Model;
using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Api.Repositories.Users.Viewer
{
    public class ViewerRepository : IViewerRepository
    {
        private readonly string _connectionString;

        public ViewerRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        private MySqlConnection GetConn()
            => new MySqlConnection(_connectionString);

        // ============================================================
        // PROFILE
        // ============================================================
        public async Task<bool> UpdateProfileAsync(long userId, ViewerProfileUpdate data)
        {
            using var conn = GetConn();
            await conn.OpenAsync();

            const string sql = @"
                UPDATE viewer_profile
                SET DisplayName = @DisplayName,
                    AvatarUrl = @AvatarUrl,
                    Bio = @Bio
                WHERE UserId = @UserId;
            ";

            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@UserId", userId);
            cmd.Parameters.AddWithValue("@DisplayName", (object?)data.DisplayName ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@AvatarUrl", (object?)data.AvatarUrl ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Bio", (object?)data.Bio ?? DBNull.Value);

            return await cmd.ExecuteNonQueryAsync() > 0;
        }

        // ============================================================
        // BOOKMARKS (TOGGLE CORRECTO)
        // ============================================================
        public async Task<bool> ToggleBookmarkAsync(long userId, long contentId)
        {
            using var conn = GetConn();
            await conn.OpenAsync();

            // MySQL NO permite IF EXISTS fuera de procedimientos
            const string deleteSql = @"
                DELETE FROM viewer_bookmarks
                WHERE UserId=@UserId AND ContentId=@ContentId;
            ";

            using var delCmd = new MySqlCommand(deleteSql, conn);
            delCmd.Parameters.AddWithValue("@UserId", userId);
            delCmd.Parameters.AddWithValue("@ContentId", contentId);

            var rows = await delCmd.ExecuteNonQueryAsync();
            if (rows > 0)
                return true;

            const string insertSql = @"
                INSERT INTO viewer_bookmarks (UserId, ContentId)
                VALUES (@UserId, @ContentId);
            ";

            using var insCmd = new MySqlCommand(insertSql, conn);
            insCmd.Parameters.AddWithValue("@UserId", userId);
            insCmd.Parameters.AddWithValue("@ContentId", contentId);

            return await insCmd.ExecuteNonQueryAsync() > 0;
        }

        // ============================================================
        // REACTIONS
        // ============================================================
        public async Task AddOrUpdateReactionAsync(long videoId, long userId, string type, CancellationToken ct)
        {
            using var conn = GetConn();
            await conn.OpenAsync(ct);

            const string sql = @"
                INSERT INTO video_reactions (VideoId, UserId, Type)
                VALUES (@Vid, @Uid, @Type)
                ON DUPLICATE KEY UPDATE Type = @Type;
            ";

            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Vid", videoId);
            cmd.Parameters.AddWithValue("@Uid", userId);
            cmd.Parameters.AddWithValue("@Type", type);

            await cmd.ExecuteNonQueryAsync(ct);
        }

        public async Task RemoveReactionAsync(long videoId, long userId, CancellationToken ct)
        {
            using var conn = GetConn();
            await conn.OpenAsync(ct);

            const string sql = "DELETE FROM video_reactions WHERE VideoId=@Vid AND UserId=@Uid";

            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Vid", videoId);
            cmd.Parameters.AddWithValue("@Uid", userId);

            await cmd.ExecuteNonQueryAsync(ct);
        }

        // ============================================================
        // COMMENTS
        // ============================================================
        public async Task<long> AddCommentAsync(VideoComment c, CancellationToken ct)
        {
            using var conn = GetConn();
            await conn.OpenAsync(ct);

            const string sql = @"
                INSERT INTO video_comments
                (VideoId, UserId, ParentCommentId, Body)
                VALUES
                (@Vid, @Uid, @Parent, @Body);
                SELECT LAST_INSERT_ID();
            ";

            using var cmd = new MySqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@Vid", c.VideoId);
            cmd.Parameters.AddWithValue("@Uid", c.UserId);
            cmd.Parameters.AddWithValue("@Parent", (object?)c.ParentCommentId ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@Body", c.Body);

            return Convert.ToInt64(await cmd.ExecuteScalarAsync(ct));
        }

        private static string GetOrderBy(string sort)
        {
            return sort switch
            {
                "oldest" => "c.CreatedAt ASC",
                "top" => "LikeCount DESC",
                _ => "c.CreatedAt DESC"
            };
        }

  

        private CommentDto MapComment(dynamic raw)
        {
            return new CommentDto
            {
                Id = raw.Id,
                Body = raw.Body,
                CreatedAt = raw.CreatedAt,
                Likes = raw.LikeCount,
                Dislikes = raw.DislikeCount,
                CurrentUserReaction = raw.CurrentUserIsLike == null
                    ? null
                    : raw.CurrentUserIsLike == true ? "like" : "dislike",
                AuthorId = raw.UserId,
                AuthorName = raw.Username,
                AuthorAvatar = raw.AvatarUrl,
                AuthorVerified = raw.IsVerified
            };
        }






public async Task<CommentDto> CreateCommentAsync(
    long videoId,
    long userId,
    string body,
    long? parentCommentId)
{
    using var conn = GetConn();
    await conn.OpenAsync();

    if (parentCommentId <= 0)
        parentCommentId = null;

    if (parentCommentId.HasValue)
    {
        var parent = await conn.QueryFirstOrDefaultAsync<dynamic>(
            @"SELECT Id, ParentCommentId, VideoId
              FROM video_comments
              WHERE Id = @parentCommentId
                AND IsDeleted = 0",
            new { parentCommentId });

        if (parent == null)
            throw new Exception("Parent not found");

        if ((long)parent.VideoId != videoId)
            throw new Exception("Parent does not belong to this video");

        if (parent.ParentCommentId != null)
            throw new Exception("Only 1 level of replies allowed");
    }

    await conn.ExecuteAsync(
        @"INSERT INTO video_comments
          (VideoId, UserId, ParentCommentId, Body, IsApproved, IsDeleted)
          VALUES (@videoId, @userId, @parentCommentId, @body, 1, 0);",
        new { videoId, userId, parentCommentId, body });

    var newId = await conn.ExecuteScalarAsync<long>("SELECT LAST_INSERT_ID();");

    var comment = await conn.QuerySingleAsync<CommentDto>(
        @"
        SELECT
            vc.Id,
            vc.Body,
            vc.CreatedAt,

            vc.LikeCount AS Likes,
            vc.DislikeCount AS Dislikes,
            NULL AS CurrentUserReaction,

            u.Id AS AuthorId,
            u.Username AS AuthorName,
            vp.AvatarUrl AS AuthorAvatar,
            0 AS AuthorVerified

        FROM video_comments vc
        JOIN usuarios u ON u.Id = vc.UserId
        LEFT JOIN viewer_profile vp ON vp.UserId = vc.UserId
        WHERE vc.Id = @newId;",
        new { newId });

    comment.Replies = new List<CommentDto>();
    return comment;
}













        public async Task<CommentReactionResponse?> ToggleCommentReactionAsync(
    long commentId,
    long userId,
    string reactionType)
{
    if (reactionType != "like" && reactionType != "dislike")
        throw new ArgumentException("Invalid reaction type");

            using var conn = GetConn();
            await conn.OpenAsync();
            var isLike = reactionType == "like";

    var existing = await conn.QueryFirstOrDefaultAsync<bool?>(
        @"SELECT IsLike
          FROM video_comment_reactions
          WHERE CommentId = @commentId
          AND UserId = @userId
          LIMIT 1;",
        new { commentId, userId });

    if (existing == null)
    {
        await conn.ExecuteAsync(
            @"INSERT INTO video_comment_reactions
              (CommentId, UserId, IsLike)
              VALUES (@commentId, @userId, @isLike);",
            new { commentId, userId, isLike });
    }
    else if (existing == isLike)
    {
        await conn.ExecuteAsync(
            @"DELETE FROM video_comment_reactions
              WHERE CommentId = @commentId
              AND UserId = @userId;",
            new { commentId, userId });
    }
    else
    {
        await conn.ExecuteAsync(
            @"UPDATE video_comment_reactions
              SET IsLike = @isLike
              WHERE CommentId = @commentId
              AND UserId = @userId;",
            new { commentId, userId, isLike });
    }

    // Obtener conteos actualizados
    var counts = await conn.QuerySingleAsync<(int Likes, int Dislikes)>(
        @"SELECT
            SUM(CASE WHEN IsLike = 1 THEN 1 ELSE 0 END) AS Likes,
            SUM(CASE WHEN IsLike = 0 THEN 1 ELSE 0 END) AS Dislikes
          FROM video_comment_reactions
          WHERE CommentId = @commentId;",
        new { commentId });

    // Obtener reacción actual del usuario
    var current = await conn.QueryFirstOrDefaultAsync<bool?>(
        @"SELECT IsLike
          FROM video_comment_reactions
          WHERE CommentId = @commentId
          AND UserId = @userId
          LIMIT 1;",
        new { commentId, userId });

    string? userReaction = null;

    if (current.HasValue)
        userReaction = current.Value ? "like" : "dislike";

    return new CommentReactionResponse
    {
        Likes = counts.Likes,
        Dislikes = counts.Dislikes,
        UserReaction = userReaction
    };
}

















        public async Task<VideoReactionResultDto?> ToggleReactionAsync(
            long videoId,
            long userId,
            string reaction)

        {
            using var conn = GetConn();
            await conn.OpenAsync();

            using var tx = await conn.BeginTransactionAsync(IsolationLevel.ReadCommitted);

            // 🔐 Validar video y bloquear fila
            var video = await conn.QuerySingleOrDefaultAsync<dynamic>(
                @"
                SELECT Id, LikeCount, DislikeCount
                FROM videos
                WHERE Id = @videoId
                AND Visibility = 'public'
                AND Status = 'approved'
                AND ProcessingStatus = 'ready'
                AND IsDeleted = 0
                FOR UPDATE;",
                new { videoId },
                tx);

            if (video == null)
                return null;
var existing = await conn.QuerySingleOrDefaultAsync<dynamic>(
    @"
    SELECT Id, Type
    FROM video_reactions
    WHERE VideoId = @videoId AND UserId = @userId
    FOR UPDATE;",
    new { videoId, userId },
    tx);

int likeCount = (int)video.LikeCount;
int dislikeCount = (int)video.DislikeCount;
string? finalReaction = null;

if (existing == null)
{
    await conn.ExecuteAsync(
        @"
        INSERT INTO video_reactions (VideoId, UserId, Type)
        VALUES (@videoId, @userId, @reaction);",
        new { videoId, userId, reaction },
        tx);

    if (reaction == "like") likeCount++;
    else dislikeCount++;

    finalReaction = reaction;
}
else
{
    string currentType = existing.Type;

    if (currentType == reaction)
    {
        await conn.ExecuteAsync(
            @"DELETE FROM video_reactions
              WHERE Id = @id;",
            new { id = existing.Id },
            tx);

        if (reaction == "like") likeCount--;
        else dislikeCount--;

        finalReaction = null;
    }
    else
    {
        await conn.ExecuteAsync(
            @"UPDATE video_reactions
              SET Type = @reaction
              WHERE Id = @id;",
            new { reaction, id = existing.Id },
            tx);

        if (reaction == "like")
        {
            likeCount++;
            dislikeCount--;
        }
        else
        {
            dislikeCount++;
            likeCount--;
        }

        finalReaction = reaction;
    }
}

await conn.ExecuteAsync(
    @"
    UPDATE videos
    SET LikeCount = @likeCount,
        DislikeCount = @dislikeCount
    WHERE Id = @videoId;",
    new
    {
        likeCount = likeCount < 0 ? 0 : likeCount,
        dislikeCount = dislikeCount < 0 ? 0 : dislikeCount,
        videoId
    },
    tx);

await tx.CommitAsync();

return new VideoReactionResultDto
{
    Likes = likeCount < 0 ? 0 : likeCount,
    Dislikes = dislikeCount < 0 ? 0 : dislikeCount,
    UserReaction = finalReaction
};
        }

        public async Task<bool> ToggleSubscriptionAsync(long subscriberId, long channelId)
{
            using var conn = GetConn();
            await conn.OpenAsync();

            var exists = await conn.QueryFirstOrDefaultAsync<int?>(
        @"SELECT 1 FROM channel_subscriptions
          WHERE ChannelId = @channelId
          AND SubscriberId = @subscriberId",
        new { channelId, subscriberId });

    if (exists != null)
    {
        await conn.ExecuteAsync(
            @"DELETE FROM channel_subscriptions
              WHERE ChannelId = @channelId
              AND SubscriberId = @subscriberId",
            new { channelId, subscriberId });

        return false; // unsubscribed
    }

    await conn.ExecuteAsync(
        @"INSERT INTO channel_subscriptions (ChannelId, SubscriberId)
          VALUES (@channelId, @subscriberId)",
        new { channelId, subscriberId });

    return true; // subscribed
}

public async Task<int> GetSubscribersCountAsync(long channelId)
{
            using var conn = GetConn();
            await conn.OpenAsync();
            return await conn.ExecuteScalarAsync<int>(
        @"SELECT COUNT(*) 
          FROM channel_subscriptions
          WHERE ChannelId = @channelId",
        new { channelId });
}
    }
}
