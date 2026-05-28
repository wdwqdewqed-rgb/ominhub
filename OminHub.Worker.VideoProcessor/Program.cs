using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OminHub.Core.Video;
using OminHub.Infrastructure.Repositories;

var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((ctx, services) =>
    {
        // =========================
        // CONFIG
        // =========================
        var connectionString =
            ctx.Configuration.GetConnectionString("Default");

        // =========================
        // CORE
        // =========================
        services.AddSingleton<IVideoTranscodingService, VideoTranscodingService>();

        // =========================
        // INFRASTRUCTURE
        // =========================
        services.AddSingleton<IVideoProcessingRepository>(
            _ => new VideoProcessingRepository(connectionString)
        );

        // =========================
        // WORKER
        // =========================
        services.AddHostedService<VideoProcessorWorker>();
    })
    .Build();

await host.RunAsync();
