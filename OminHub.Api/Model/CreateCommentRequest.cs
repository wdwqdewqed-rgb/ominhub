public class CreateCommentRequest
{
    public string Body { get; set; } = null!;
    public long? ParentCommentId { get; set; }
}