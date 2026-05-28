namespace OminHub.Api.Model
{
public class VideoTaxonomyDto
{
    public long VideoId { get; set; }
    public List<int> CategoryIds { get; set; } = new();
    public List<int> TagIds { get; set; } = new();
}
}