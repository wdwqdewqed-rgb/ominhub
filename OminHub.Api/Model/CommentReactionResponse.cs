namespace OminHub.Api.Model
{
    public class CommentReactionResponse
    {
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public string? UserReaction { get; set; } // "like" | "dislike" | null
    }
}