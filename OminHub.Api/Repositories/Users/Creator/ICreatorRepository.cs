using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OminHub.Api.Model;
using OminHub.Core.Models;
using OminHub.Core.Video.DTOs;
using OminHub.Models;

namespace OminHub.Api.Repositories.Users.Creator
{
    public interface ICreatorRepository
    {
        // Videos
        Task<long> CreateVideoAsync(Video video, CancellationToken ct);
        Task UpdateVideoFileAsync(
            long videoId,
            string publicUrl,
            string mimeType,
            long sizeBytes,
            CancellationToken ct
        );

        Task<string> GetProcessingStatusAsync(long videoId, CancellationToken ct);

        Task<long?> GetUploaderIdAsync(long videoId, CancellationToken ct);

        Task AddVideoCategoriesAsync(
            long videoId,
            IEnumerable<int> categoryIds,
            CancellationToken ct
        );

        Task SyncVideoCategoriesAsync(
            long videoId,
            IEnumerable<int> categoryIds,
            CancellationToken ct
        );


        Task AddVideoTagsAsync(
            long videoId,
            IEnumerable<int> tagIds,
            CancellationToken ct
        );

        Task SyncVideoTagsAsync(
            long videoId,
            IEnumerable<int> tagIds,
            CancellationToken ct
        );





        Task InsertInitialVideoThumbnailsAsync(
            long videoId,
            IEnumerable<VideoThumbnailInput> thumbnails,
            CancellationToken ct
        );


        Task<IReadOnlyList<VideoThumbnail>> GetByVideoAsync(
            long videoId,
            CancellationToken ct
        );

        Task SyncVideoThumbnailsAsync(
            long videoId,
            IEnumerable<VideoThumbnailInput> thumbnails,
            CancellationToken ct
        );







        Task SyncVideoCollaboratorsAsync(
            long videoId,
            long creatorId,
            IEnumerable<long> collaboratorIds,
            CancellationToken ct
        );










        







        Task UpdateVideoMetadataAsync(Video video, CancellationToken ct);

        // Comments
        Task ApproveCommentAsync(long commentId, bool approve, CancellationToken ct);
        Task DeleteCommentAsync(long commentId, CancellationToken ct);

        // Moderation / admin
        Task<IEnumerable<Video>> GetPendingVideosAsync(int page, int pageSize, CancellationToken ct);


        Task<IReadOnlyList<CreatorVideoListItemDto>> GetVideosByUploaderAsync(long uploaderId, CancellationToken ct);
    
        Task<UserAnalyticsDto> GetUserAnalyticsAsync(long userId);

        Task UpdateUserProfileAsync(long userId, UpdateUserProfileDto dto);
    }
}
