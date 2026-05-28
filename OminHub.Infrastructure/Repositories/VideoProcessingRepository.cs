using MySql.Data.MySqlClient;
using OminHub.Core.Abstractions;
using OminHub.Core.Video;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Infrastructure.Repositories
{
    public class VideoProcessingRepository : IVideoProcessingRepository
    {
        private readonly string _connectionString;

        public VideoProcessingRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        private MySqlConnection GetConn()
            => new MySqlConnection(_connectionString);

        // ===============================
        // UPDATE STATUS
        // ===============================
        public async Task UpdateProcessingStatusAsync(
            long videoId,
            string processingStatus,
            CancellationToken ct
        )
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            var cmd = new MySqlCommand(
                @"UPDATE videos
              SET ProcessingStatus = @Status,
                  UpdatedAt = CURRENT_TIMESTAMP
              WHERE Id = @Id",
                cnn
            );

            cmd.Parameters.AddWithValue("@Id", videoId);
            cmd.Parameters.AddWithValue("@Status", processingStatus);

            await cmd.ExecuteNonQueryAsync(ct);
        }

        // ===============================
        // MARK HLS READY
        // ===============================
        public async Task MarkHlsReadyAsync(
            long videoId,
            string hlsPath,
            CancellationToken ct
        )
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            var cmd = new MySqlCommand(
                @"UPDATE videos
              SET Status = 'pending',
                  HlsPath = @HlsPath,
                  ProcessingStatus = 'ready',
                  UpdatedAt = CURRENT_TIMESTAMP
              WHERE Id = @Id",
                cnn
            );

            cmd.Parameters.AddWithValue("@Id", videoId);
            cmd.Parameters.AddWithValue("@HlsPath", hlsPath);

            await cmd.ExecuteNonQueryAsync(ct);
        }

        // ===============================
        // ACQUIRE NEXT JOB (WORKER)
        // ===============================
        public async Task<VideoProcessingJob?> TryAcquireNextPendingAsync(
    CancellationToken ct
)
        {
            using var cnn = GetConn();
            await cnn.OpenAsync(ct);

            using var tx = await cnn.BeginTransactionAsync(ct);

            VideoProcessingJob? job = null;

            var select = new MySqlCommand(
                @"SELECT Id, UploaderId, OriginalFilePath
          FROM videos
          WHERE ProcessingStatus = 'uploaded'
          ORDER BY CreatedAt
          LIMIT 1
          FOR UPDATE", /*FOR UPDATE SKIP LOCKED en maria db 10.6+ para más de un worker*/
                cnn,
                (MySqlTransaction)tx
            );

            using (var rd = await select.ExecuteReaderAsync(ct))
            {
                if (!await rd.ReadAsync(ct))
                {
                    // IMPORTANTE: cerrar reader antes del rollback
                    return null;
                }

                job = new VideoProcessingJob(
                    rd.GetInt64("Id"),
                    rd.GetInt64("UploaderId"),
                    rd.GetString("OriginalFilePath")
                );
            } // ← AQUÍ el reader ya está cerrado

            var update = new MySqlCommand(
                @"UPDATE videos
          SET ProcessingStatus = 'transcoding',
              UpdatedAt = CURRENT_TIMESTAMP
          WHERE Id = @Id",
                cnn,
                (MySqlTransaction)tx
            );

            update.Parameters.AddWithValue("@Id", job.VideoId);
            await update.ExecuteNonQueryAsync(ct);

            await tx.CommitAsync(ct);

            return job;
        }

        public async Task UpdateVideoMetadataTranscodingAsync(
    long videoId,
    int duration,
    int width,
    int height,
    CancellationToken ct)
{
    using var cnn = GetConn();
    await cnn.OpenAsync(ct);

    var cmd = new MySqlCommand(
        @"UPDATE videos
          SET DurationSeconds = @Duration,
              Width = @Width,
              Height = @Height,
              UpdatedAt = CURRENT_TIMESTAMP
          WHERE Id = @Id",
        cnn);

    cmd.Parameters.AddWithValue("@Id", videoId);
    cmd.Parameters.AddWithValue("@Duration", duration);
    cmd.Parameters.AddWithValue("@Width", width);
    cmd.Parameters.AddWithValue("@Height", height);

    await cmd.ExecuteNonQueryAsync(ct);
}


    }
}
