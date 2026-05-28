using Microsoft.AspNetCore.Mvc;
using OminHub.Api.Repositories.System;

namespace OminHub.Api.Controllers.System
{
    [ApiController]
    [Route("api/catalog")]
    public class CatalogController : ControllerBase
    {
        private readonly ICatalogRepository _repo;

        public CatalogController(ICatalogRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories(CancellationToken ct)
        {
            var data = await _repo.GetCategoriesAsync(ct);
            return Ok(data);
        }

        [HttpGet("tags")]
        public async Task<IActionResult> GetTags(CancellationToken ct)
        {
            var data = await _repo.GetTagsAsync(ct);
            return Ok(data);
        }
    }
}
