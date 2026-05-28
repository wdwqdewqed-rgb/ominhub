using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using OminHub.Api.Repositories.Users.Admin;

namespace OminHub.Api.Controllers.Users
{
    [ApiController]
    [Route("api/viewer")]
    [Authorize(Roles = "Admin,Owner")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _repo;

        public AdminController(IAdminRepository repo)
        {
            _repo = repo ?? throw new ArgumentNullException(nameof(repo));
        }

        
        // =====================================================================
        // APPROVE REQUEST (ADMIN ONLY)
        // =====================================================================
        [Authorize(Roles = "Admin,Owner")]
        [HttpPost("{id:long}/approve")]
        public async Task<IActionResult> Approve(long id, CancellationToken ct)
        {
            var adminId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var ok = await _repo.ApproveAsync(id, adminId, ct);
            if (!ok)
                return NotFound(new { message = "No se pudo aprobar, solicitud inexistente" });

            return Ok(new { message = "Solicitud aprobada correctamente" });
        }

        // =====================================================================
        // REJECT REQUEST (ADMIN ONLY)
        // =====================================================================
        [Authorize(Roles = "Admin,Owner")]
        [HttpPost("{id:long}/reject")]
        public async Task<IActionResult> Reject(
            long id,
            [FromBody] RejectRequest body,
            CancellationToken ct)
        {
            if (string.IsNullOrWhiteSpace(body.Notes))
                return BadRequest(new { message = "Debe incluir una razón de rechazo" });

            var adminId = long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var ok = await _repo.RejectAsync(id, body.Notes, adminId, ct);
            if (!ok)
                return NotFound(new { message = "No se pudo rechazar, solicitud inexistente" });

            return Ok(new { message = "Solicitud rechazada correctamente" });
        }
    }

    public class RejectRequest
    {
        public string Notes { get; set; } = "";
    }
}