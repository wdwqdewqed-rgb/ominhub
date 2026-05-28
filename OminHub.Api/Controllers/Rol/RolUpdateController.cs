using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OminHub.Api.Model;
using OminHub.Api.Repositories.Role;
using OminHub.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Hosting;


namespace OminHub.Api.Controllers.Role
{
    [ApiController]
    [Route("api/verification")]
    public class RoleUpdateController : ControllerBase
    {
        private readonly IRoleUpdateRepository _repo;
        private readonly IWebHostEnvironment _env;

        public RoleUpdateController(IRoleUpdateRepository repo, IWebHostEnvironment env)
        {
            _repo = repo ?? throw new ArgumentNullException(nameof(repo));
            _env = env;
        }


        // =====================================================================
// CREATE VERIFICATION REQUEST
// =====================================================================
[HttpPost("create")]
[Authorize]
public async Task<IActionResult> CreateRequest([FromBody] RoleUpdateRequest req, CancellationToken ct)
{
    try
    {
        var userId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        // Construimos la solicitud real con datos obligatorios
        var newRequest = new RoleUpdateRequest
        {
            UserId = userId,
            RoleRequest = req.RoleRequest ?? "Creator",
            State = "pending",
            RequestNotes = req.RequestNotes,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            ReviewedAt = null,
            ReviewedBy = null,
            IPAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
            AttemptNumber = 1
        };

        var id = await _repo.CreateRequestAsync(newRequest, ct);

        return Ok(new
        {
            message = "Verification request created successfully",
            requestId = id
        });
    }
    catch (Exception ex)
    {
        return BadRequest(new { message = "Error creating verification request", error = ex.Message });
    }
}



        // =====================================================================
        // GET REQUEST BY ID
        // =====================================================================
        [HttpGet("{id:long}")]
        [Authorize]
        public async Task<IActionResult> GetRequest(long id, CancellationToken ct)
        {
            var req = await _repo.GetRequestByIdAsync(id, ct);
            if (req == null)
                return NotFound(new { message = "Solicitud no encontrada" });

            req.Documents = await _repo.GetDocumentsAsync(req.Id, ct);

            return Ok(req);
        }

        // =====================================================================
        // UPLOAD DOCUMENT
        // =====================================================================
        [Authorize]
        [HttpPost("{requestId:long}/upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Upload(
            long requestId,
            [FromForm] RoleUploadRequest request,
            CancellationToken ct)
        {
            if (request.File == null || request.File.Length == 0)
                return BadRequest(new { message = "Debe subir un archivo válido" });

            var validTypes = new[] { "Front", "Back", "Selfie" };
            if (!validTypes.Contains(request.Type))
                return BadRequest(new { message = "Tipo inválido. Use: Front / Back / Selfie" });

            var req = await _repo.GetRequestByIdAsync(requestId, ct);
            if (req == null)
                return NotFound(new { message = "Solicitud no encontrada" });

            var userId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (userId != req.UserId)
                return Forbid();

            // ============================================================
            // PATH REAL DONDE GUARDAMOS
            // ============================================================
            var uploadsPath = Path.Combine(
                _env.ContentRootPath,
                "wwwroot",
                "users",
                userId.ToString(),
                "docs-identity"
            );

            Directory.CreateDirectory(uploadsPath);

            // Nombre único
            var fileName = $"{Guid.NewGuid()}_{request.File.FileName}";
            var finalPath = Path.Combine(uploadsPath, fileName);

            // Guardar archivo
            using (var stream = new FileStream(finalPath, FileMode.Create))
            {
                await request.File.CopyToAsync(stream, ct);
            }

            // ==============================
            // URL ABSOLUTA SERVIBLE EN EL FRONT
            // ==============================
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var publicUrl = $"{baseUrl}/uploads/users/{userId}/docs-identity/{fileName}";


            var doc = new IdentityVerificationDocument
            {
                RequestId = req.Id,
                Type = request.Type,
                Url = publicUrl, // URL FINAL SERVIDA AL FRONT
                CreatedAt = DateTime.UtcNow
            };

            await _repo.AddDocumentAsync(doc, ct);

            return Ok(new
            {
                message = "Documento subido correctamente",
                document = doc
            });
        }

        // =====================================================================
        // GET MY REQUEST
        // =====================================================================
        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetMyRequest(CancellationToken ct)
        {
            var userId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var req = await _repo.GetRequestByUserIdAsync(userId, ct);
            if (req == null)
                return Ok(null);

            req.Documents = await _repo.GetDocumentsAsync(req.Id, ct);

            return Ok(req);
        }
    }
}
