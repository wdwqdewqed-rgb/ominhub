using System.Diagnostics;

using OminHub.Core.Abstractions;
using OminHub.Core.Video;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace OminHub.Core.Video
{
    public class VideoTranscodingService : IVideoTranscodingService
    {
        private readonly IVideoProcessingRepository _videoRepo;
        private readonly ILogger<VideoTranscodingService> _logger;
        private readonly IHostEnvironment _env;

        public VideoTranscodingService(
            IVideoProcessingRepository videoRepo,
            ILogger<VideoTranscodingService> logger,
            IHostEnvironment env
        )
        {
            _videoRepo = videoRepo;
            _logger = logger;
            _env = env;
        }


        
    public async Task TranscodeToHlsAsync(
        long videoId,
        long uploaderId,
        string inputFilePath,
        CancellationToken ct
    )
        {
            try
            {
                var metadata = await ProbeVideoAsync(inputFilePath, ct);
                
                await _videoRepo.UpdateVideoMetadataTranscodingAsync(
                    videoId,
                    metadata.DurationSeconds,
                    metadata.Width,
                    metadata.Height,
                    ct
                );
                
                await _videoRepo.UpdateProcessingStatusAsync(
                    videoId,
                    "transcoding",
                    ct
                );

                var hlsPhysicalDir = Path.Combine(
                    _env.ContentRootPath,
                    "wwwroot",
                    "uploads",
                    "users",
                    uploaderId.ToString(),
                    "videos-upload",
                    videoId.ToString(),
                    "hls"
                );

                Directory.CreateDirectory(hlsPhysicalDir);

                for (int i = 0; i < 5; i++)
                {
                    Directory.CreateDirectory(Path.Combine(hlsPhysicalDir, i.ToString()));
                }

                


                var ffmpegArgs = BuildFfmpegArgs(
                    inputFilePath,
                    hlsPhysicalDir
                );

                await RunFfmpegAsync(ffmpegArgs, ct);

                // Ruta pública (NO física)
                var publicHlsPath =
                    $"/uploads/users/{uploaderId}/videos-upload/{videoId}/hls/master.m3u8";

                await _videoRepo.MarkHlsReadyAsync(
                    videoId,
                    publicHlsPath,
                    ct
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "HLS transcoding failed for video {VideoId}",
                    videoId
                );

                await _videoRepo.UpdateProcessingStatusAsync(
                    videoId,
                    "failed",
                    ct
                );

                throw;
            }
        }

        private async Task<(int DurationSeconds, int Width, int Height)> ProbeVideoAsync(
    string input,
    CancellationToken ct)
{
    var args =
        $"-v error " +
        "-select_streams v:0 " +
        "-show_entries stream=width,height " +
        "-show_entries format=duration " +
        "-of json " +
        $"\"{input}\"";

    var psi = new ProcessStartInfo
    {
        FileName = "ffprobe",
        Arguments = args,
        RedirectStandardOutput = true,
        RedirectStandardError = true,
        UseShellExecute = false,
        CreateNoWindow = true
    };

    using var process = Process.Start(psi)
        ?? throw new InvalidOperationException("Failed to start ffprobe");

    var stdout = await process.StandardOutput.ReadToEndAsync();
    var stderr = await process.StandardError.ReadToEndAsync();

    await process.WaitForExitAsync(ct);

    if (process.ExitCode != 0)
        throw new Exception($"ffprobe failed: {stderr}");

    using var doc = System.Text.Json.JsonDocument.Parse(stdout);

    var root = doc.RootElement;

    var stream = root.GetProperty("streams")[0];
    var format = root.GetProperty("format");

    var width = stream.GetProperty("width").GetInt32();
    var height = stream.GetProperty("height").GetInt32();

    var durationRaw = format.GetProperty("duration").GetString();
    var duration = (int)Math.Round(double.Parse(durationRaw!, System.Globalization.CultureInfo.InvariantCulture));

    return (duration, width, height);
}



        


        private string BuildFfmpegArgs(string input, string outputDir)
        {
            return
                $"-y " +
                $"-i \"{input}\" " +
                "-filter_complex " +
                "\"[0:v]split=5[v1][v2][v3][v4][v5];" +
                "[v1]scale=426:240[v240];" +
                "[v2]scale=640:360[v360];" +
                "[v3]scale=854:480[v480];" +
                "[v4]scale=1280:720[v720];" +
                "[v5]scale=1920:1080[v1080]\" " +
                "-map [v240] -map 0:a? " +
                "-map [v360] -map 0:a? " +
                "-map [v480] -map 0:a? " +
                "-map [v720] -map 0:a? " +
                "-map [v1080] -map 0:a? " +
                "-c:v libx264 -c:a aac " +
                "-movflags +faststart " +
                "-pix_fmt yuv420p " +
                "-profile:v main " +
                "-preset veryfast " +
                "-crf 20 " +
                "-b:v:0 400k -b:v:1 800k -b:v:2 1400k -b:v:3 2800k -b:v:4 5000k " +
                "-f hls -hls_time 6 -hls_playlist_type vod " +
                "-hls_flags independent_segments " +
                $"-hls_segment_filename \"{outputDir}/%v/segment_%03d.ts\" " +
                "-var_stream_map \"v:0,a:0 v:1,a:1 v:2,a:2 v:3,a:3 v:4,a:4\" " +
                "-master_pl_name master.m3u8 " +
                $"\"{outputDir}/%v/index.m3u8\"";
        }




        private async Task RunFfmpegAsync(string args, CancellationToken ct)
{
    var psi = new ProcessStartInfo
    {
        FileName = "ffmpeg",
        Arguments = args,
        RedirectStandardError = true,
        RedirectStandardOutput = true,
        UseShellExecute = false,
        CreateNoWindow = true
    };

    using var process = Process.Start(psi)
        ?? throw new InvalidOperationException("Failed to start ffmpeg process");

    var stdOutTask = process.StandardOutput.ReadToEndAsync();
    var stdErrTask = process.StandardError.ReadToEndAsync();

    await process.WaitForExitAsync(ct);

    var stdout = await stdOutTask;
    var stderr = await stdErrTask;

    _logger.LogInformation("FFmpeg stdout:\n{StdOut}", stdout);

    if (process.ExitCode != 0)
    {
        _logger.LogError("FFmpeg stderr:\n{StdErr}", stderr);
        throw new Exception("FFmpeg transcoding failed");
    }
}

    }
}