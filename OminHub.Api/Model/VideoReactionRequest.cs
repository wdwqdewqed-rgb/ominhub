namespace OminHub.Api.Model
{
    public class VideoReactionRequest
    {
        public string Reaction { get; set; } = null!; // "like" | "dislike"
    }
}