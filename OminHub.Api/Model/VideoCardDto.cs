namespace OminHub.Api.Model
{
    public class VideoCardDto
    {
        public long Id { get; set; }
        public string Title { get; set; } = null!;

        public string? VideoUrl { get; set; }
        public string? ThumbnailUrl { get; set; }

        public string Duration { get; set; } = "0:00";
        public long Views { get; set; }
        public DateTime UploadDate { get; set; }

        public List<string> Categories { get; set; } = new();
        public List<string> Tags { get; set; } = new();

        public long ChannelId { get; set; }
        public string ChannelName { get; set; } = null!;
        public string? ChannelAvatar { get; set; }
        public bool ChannelVerified { get; set; }
        public long Subscribers { get; set; }

        public long Likes { get; set; }
        public long Dislikes { get; set; }
    }
}