namespace OminHub.Models
{
public class UserVideoDto
{
    public long Id { get; set; }
    public string Title { get; set; }

    public string? HlsPath { get; set; }
    public int? DurationSeconds { get; set; }

    public long ViewCount { get; set; }
    public int LikeCount { get; set; }
    public int CommentsCount { get; set; }

    public DateTime? PublishedAt { get; set; }

    public string? ThumbnailPath { get; set; }
}
}