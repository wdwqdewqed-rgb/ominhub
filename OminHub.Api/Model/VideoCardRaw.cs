namespace OminHub.Api.Model
{
    public class VideoCardRaw
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string HlsPath { get; set; }
        public int DurationSeconds { get; set; }
        public long ViewCount { get; set; }
        public DateTime PublishedAt { get; set; }
        public long LikeCount { get; set; }
        public long DislikeCount { get; set; }
        public long UploaderId { get; set; }

        public string Username { get; set; }
        public string Role { get; set; }
        public long SubscribersCount { get; set; }

        public string? AvatarUrl { get; set; }
        public string? ThumbnailPath { get; set; }
    }
}
