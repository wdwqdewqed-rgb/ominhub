using Microsoft.AspNetCore.Mvc;
using OminHub.Api.Model;
using OminHub.Api.Repositories.System;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Linq;



namespace OminHub.Api.Controllers.System
{
    [ApiController]
    [Route("api/collaborators")]
    public class CollaboratorController : ControllerBase
    {
        private readonly ICollaboratorCatalogRepository _repo;
        private readonly IWebHostEnvironment _env;

        public CollaboratorController(
            ICollaboratorCatalogRepository repo,
            IWebHostEnvironment env
        )
        {
            _repo = repo;
            _env = env;
        }

        // =========================
        // POST con DTO 5
        // =========================
        [HttpPost("add")]
        [RequestSizeLimit(20_000_000)]
        public async Task<IActionResult> AddCollaborator(
            [FromForm] AddCollaboratorRequest req,
            CancellationToken ct
        )
        {
            var currentCreator = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if ((ulong)currentCreator != req.CreatorId)
                return Forbid();


            if (!new[]{"performer","partner","guest","producer"}.Contains(req.Role))
                return BadRequest("invalid role");


            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // 1) Guardado de archivo
            string folder = Path.Combine(
                _env.ContentRootPath,
                "wwwroot",
                "users",
                req.CreatorId.ToString(),
                "docs-identity"
            );

            Directory.CreateDirectory(folder);

            string fileName =
                DateTime.UtcNow.Ticks +
                Path.GetExtension(req.ConsentFile.FileName);

            string path = Path.Combine(folder, fileName);

            using (var fs = new FileStream(path, FileMode.Create))
            {
                await req.ConsentFile.CopyToAsync(fs, ct);
            }

            var publicUrl = $"{Request.Scheme}://{Request.Host}/uploads/users/{req.CreatorId}/docs-identity/{fileName}";


            // 2) Mapping a entidad de tabla
            var entity = new CatalogCollaborator
            {
                CreatorId = req.CreatorId,
                Type = "manual",
                Name = req.Name,
                Document = req.Document,
                Role = req.Role,
                ConsentFileUrl = publicUrl,
                RequestState = "pending",
                CreatedAt = DateTime.UtcNow
            };

            // 3) Insert
            var id = await _repo.CreateCollaboratorAsync(entity, ct);

            return Ok(new { id, consentFileUrl = publicUrl });

        }

        // =========================
        // GET para tabla inferior
        // =========================
        [HttpGet("by-creator/{creatorId}")]
        public async Task<IActionResult> GetByCreator(
            ulong creatorId,
            CancellationToken ct
        )
        {
            var data = await _repo.GetCollaboratorsByCreatorAsync(creatorId, ct);
            return Ok(data);
        }
    }
}
