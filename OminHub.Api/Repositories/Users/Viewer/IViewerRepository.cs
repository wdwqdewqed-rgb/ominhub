using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OminHub.Api.Model;

namespace OminHub.Api.Repositories.Users.Viewer
{
    public interface IViewerRepository
    {
        // ============================================================
        // PROFILE
        // ============================================================

        Task<bool> UpdateProfileAsync(long userId, ViewerProfileUpdate data);

        // ============================================================
        // BOOKMARKS
        // ============================================================

        Task<bool> ToggleBookmarkAsync(long userId, long contentId);

        // ============================================================
        // REACTIONS
        // ============================================================

        Task AddOrUpdateReactionAsync(
            long videoId,
            long userId,
            string type,
            CancellationToken ct
        );

        Task RemoveReactionAsync(
            long videoId,
            long userId,
            CancellationToken ct
        );

        // ============================================================
        // COMMENTS
        // ============================================================

        Task<long> AddCommentAsync(
            VideoComment comment,
            CancellationToken ct
        );

       

       Task<CommentDto> CreateCommentAsync(
    long videoId,
    long userId,
    string body,
    long? parentCommentId);














        Task<CommentReactionResponse?> ToggleCommentReactionAsync(
    long commentId,
    long userId,
    string reactionType);


















        Task<VideoReactionResultDto?> ToggleReactionAsync(
            long videoId,
            long userId,
            string reaction);

Task<int> GetSubscribersCountAsync(long channelId);
        Task<bool> ToggleSubscriptionAsync(long subscriberId, long channelId);
    }
}
