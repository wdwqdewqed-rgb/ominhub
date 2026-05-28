using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Core.Video
{
    public interface IVideoTranscodingService
    {
        Task TranscodeToHlsAsync(
            long videoId,
            long uploaderId,
            string inputPath,
            CancellationToken ct
        );

    }
}

