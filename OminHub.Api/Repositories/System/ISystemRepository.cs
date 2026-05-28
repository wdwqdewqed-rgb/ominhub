using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OminHub.Api.Model;
using OminHub.Core.Video;
using OminHub.Core.Video.DTOs;
using OminHub.Models;

namespace OminHub.Api.Repositories.System
{
    public interface ISystemRepository
    {
        // ============================================================
        // VIDEOS
        // ============================================================
         Task<bool> RegisterVideoViewAsync(
long videoId,
long? userId,
string? ipAddress,
CancellationToken ct);
        Task<Video?> GetVideoByIdAsync(long id, CancellationToken ct);

        Task<IEnumerable<Video>> ListVideosByUserAsync(
            long userId,
            int page,
            int pageSize,
            CancellationToken ct
        );

        Task<IEnumerable<Video>> SearchVideosAsync(
            string q,
            int page,
            int pageSize,
            CancellationToken ct
        );

        // ============================================================
        // THUMBNAILS
        // ============================================================

        Task SetPrimaryThumbnailAsync(
            long videoId,
            long thumbnailId,
            CancellationToken ct
        );

        // ============================================================
        // REACTIONS
        // ============================================================

        Task<int> GetReactionCountsAsync(
            long videoId,
            CancellationToken ct
        );

        // ============================================================
        // VIEWS
        // ============================================================

        Task AddViewAsync(
            long videoId,
            long? userId,
            string? deviceId,
            string? ip,
            CancellationToken ct
        );

        Task<long> GetViewCountAsync(
            long videoId,
            CancellationToken ct
        );

        // ============================================================
        // COMMENTS
        // ============================================================

        Task<IEnumerable<VideoComment>> GetCommentsAsync(
            long videoId,
            int page,
            int pageSize,
            CancellationToken ct
        );

        // ============================================================
        // VIEWER PROFILE
        // ============================================================

        Task<ViewerProfile?> GetProfileAsync(
            long userId
        );

        Task<PagedResult<FeaturedVideoDto>> GetFeaturedVideos(int page, int pageSize);

        Task<VideoDetailDto?> GetVideoDetailAsync(long id, long? userId);

        Task<List<VideoCardDto>> GetRelatedVideosAsync(long id, int limit = 12);

        Task<List<VideoCardDto>> GetSameChannelVideosAsync(long id, int limit = 12);

        Task<List<VideoCardDto>> GetTrendingVideosAsync(long id, int limit = 12);

  Task<PagedCommentsResult> GetVideoCommentsAsync(
    long videoId,
    int page,
    int pageSize,
    string sort,
    long? currentUserId);

 


Task<UserProfileDto?> GetUserByIdAsync(long userId);

Task<IEnumerable<UserVideoDto>> GetUserVideosAsync(long userId);



    
    }
    
}
