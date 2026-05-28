namespace OminHub.Api.Model
{
    public class CommentReactionRequest
    {
        public string Type { get; set; } = default!; // "like" | "dislike"
    }
}