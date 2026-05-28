namespace OminHub.Api.Model
{
    public class VideoDetailRaw
    {
        public long Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;

        public string HlsPath { get; set; } = null!;
        public int? DurationSeconds { get; set; }
        public long ViewCount { get; set; }
        public DateTime PublishedAt { get; set; }

        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }

        public long UploaderId { get; set; }

        public string Username { get; set; } = null!;
        public string Role { get; set; } = null!;
        public long SubscribersCount { get; set; }

        public string? AvatarUrl { get; set; }
        public string? ThumbnailPath { get; set; }

        public bool IsSubscribed { get; set; }
    }
}

