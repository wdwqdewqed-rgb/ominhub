using OminHub.Api.Model;


namespace OminHub.Api.Repositories.System
{
    public interface ICatalogRepository
    {
        Task<List<Category>> GetCategoriesAsync(CancellationToken ct);
        Task<List<Tag>> GetTagsAsync(CancellationToken ct);
    }
}
