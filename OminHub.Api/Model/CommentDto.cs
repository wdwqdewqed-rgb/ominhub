namespace OminHub.Api.Model
{
    public class CommentDto
    {
        public long Id { get; set; }
        public string Body { get; set; } = null!;
        public DateTime CreatedAt { get; set; }

        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public string? CurrentUserReaction { get; set; }

        public long AuthorId { get; set; }
        public string AuthorName { get; set; } = null!;
        public string? AuthorAvatar { get; set; }
        public bool AuthorVerified { get; set; }

        public List<CommentDto> Replies { get; set; } = new();
    }
}