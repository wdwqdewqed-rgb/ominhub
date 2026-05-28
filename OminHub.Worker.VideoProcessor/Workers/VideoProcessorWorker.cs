using OminHub.Core.Video;

public class VideoProcessorWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<VideoProcessorWorker> _logger;

    public VideoProcessorWorker(
        IServiceScopeFactory scopeFactory,
        ILogger<VideoProcessorWorker> logger
    )
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        _logger.LogInformation("VideoProcessorWorker STARTED");

        while (!ct.IsCancellationRequested)
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();

                var repo = scope.ServiceProvider
                    .GetRequiredService<IVideoProcessingRepository>();

                var transcoder = scope.ServiceProvider
                    .GetRequiredService<IVideoTranscodingService>();

                var job = await repo.TryAcquireNextPendingAsync(ct);

                if (job == null)
                {
                    await Task.Delay(5000, ct);
                    continue;
                }

                await transcoder.TranscodeToHlsAsync(
                    job.VideoId,
                    job.UploaderId,
                    job.InputFilePath,
                    ct
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Worker loop failed");
                await Task.Delay(5000, ct);
            }
        }
    }

}
