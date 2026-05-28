namespace OminHub.Api.Model
{
    public class PagedCommentsResult
{
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }

    public List<CommentDto> Items { get; set; } = new();
}
}