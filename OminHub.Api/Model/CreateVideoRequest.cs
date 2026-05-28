namespace OminHub.Api.Contracts.Creator
{
    public class CreateVideoRequest
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public int? CategoryId { get; set; }
        public bool IsSensitive { get; set; }
        public string Visibility { get; set; } = "public";
        public bool AllowComments { get; set; } = true;
        public bool RequiresApproval { get; set; } = true;
    }
}
