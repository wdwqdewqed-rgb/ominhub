namespace OminHub.Core.Video.DTOs
{
    public class FeaturedVideoDto
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Duration { get; set; }
        public long Views { get; set; }
        public List<string> Categories { get; set; }
        public List<string> Tags { get; set; }
    }
}