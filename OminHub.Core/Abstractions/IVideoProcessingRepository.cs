using OminHub.Core.Abstractions;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Core.Video
{

    public interface IVideoProcessingRepository
    {
        Task UpdateProcessingStatusAsync(
                long videoId,
                string processingStatus,
                CancellationToken ct
            );

        Task MarkHlsReadyAsync(
            long videoId,
            string hlsPath,
            CancellationToken ct
        );


        Task<VideoProcessingJob?> TryAcquireNextPendingAsync(CancellationToken ct);
    
    
        Task UpdateVideoMetadataTranscodingAsync(
            long videoId,
            int duration,
            int width,
            int height,
            CancellationToken ct
        );
    }
}
