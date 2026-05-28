namespace OminHub.Core.Video.DTOs
{
    public class CreatorVideoListItemDto
    {
        public long Id { get; set; }
        public string Title { get; set; } = null!;
        public string Visibility { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string ProcessingStatus { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime? PublishedAt { get; set; }
        public long ViewCount { get; set; }
        public int LikeCount { get; set; }
        public int CommentsCount { get; set; }
    }
}
