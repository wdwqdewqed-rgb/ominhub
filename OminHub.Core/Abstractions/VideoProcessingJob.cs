using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Core.Abstractions
{
    /// <summary>
    /// Representa un video pendiente de procesamiento (transcodificación)
    /// </summary>
    public sealed record VideoProcessingJob
    (
        long VideoId,
        long UploaderId,
        string InputFilePath
    );
}
