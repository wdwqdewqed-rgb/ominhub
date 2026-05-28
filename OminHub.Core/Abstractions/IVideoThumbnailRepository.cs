using OminHub.Core.Abstractions;
using OminHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Core.Abstractions
{
    public interface IVideoThumbnailRepository
    {
        Task InsertInitialAsync(
            long videoId,
            IEnumerable<VideoThumbnailInput> thumbnails,
            CancellationToken ct
        );
    }
}
