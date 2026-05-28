using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OminHub.Api.Model;
using OminHub.Api.Repositories.System;
using OminHub.Api.Repositories.Users.Viewer;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace OminHub.Api.Controllers.System
{
    [ApiController]
    [Route("api/system")]
    public class SystemController : ControllerBase
    {
        private readonly ISystemRepository _systemRepo;

        public SystemController(ISystemRepository systemRepo)
        {
            _systemRepo = systemRepo;
        }

        long UserId => long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var result = await _systemRepo.GetProfileAsync(UserId);
            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("featured")]
        public async Task<IActionResult> GetFeatured([FromQuery] int page, [FromQuery] int pageSize)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _systemRepo.GetFeaturedVideos(page, pageSize);
            return Ok(result);
        }
        
        [HttpGet("videos/{id:long}")]
        public async Task<IActionResult> GetVideo(long id)
        {
            long? userId = User.Identity!.IsAuthenticated
                ? long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!)
                : null;

            var result = await _systemRepo.GetVideoDetailAsync(id, userId);

            if (result == null)
                return NotFound();

            return Ok(result);
        }




        [HttpGet("{id:long}/comments")]
        public async Task<IActionResult> GetComments(
            long id,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 6,
            [FromQuery] string sort = "newest")
        {
            var claim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            long? userId = null;

            if (long.TryParse(claim, out var parsedId))
                userId = parsedId;

            var result = await _systemRepo.GetVideoCommentsAsync(
                id, page, pageSize, sort, userId);

            return Ok(result);
        }














        [HttpGet("videos/{id:long}/related")]
        public async Task<IActionResult> GetRelated(long id)
        {
            var videos = await _systemRepo.GetRelatedVideosAsync(id);

            return Ok(videos);
        }

        [HttpGet("videos/{id:long}/samechannel")]
        public async Task<IActionResult> GetSameChannel(long id)
        {
            var videos = await _systemRepo.GetSameChannelVideosAsync(id);

            return Ok(videos);
        }

        [HttpGet("videos/{id:long}/trending")]
        public async Task<IActionResult> GetTrending(long id)
        {
            var videos = await _systemRepo.GetTrendingVideosAsync(id);

            return Ok(videos);
        }

        [HttpPost("videos/{id:long}/view")]
        public async Task<IActionResult> RegisterView(long id, CancellationToken ct)
        {
            var ip = HttpContext.Connection.RemoteIpAddress?.ToString();

            var success = await _systemRepo.RegisterVideoViewAsync(
                id,
                UserId == 0 ? null : UserId,
                ip, ct);

            if (!success)
                return NotFound();

            return Ok();
        }

        [HttpGet("users/{id:long}")]
        public async Task<IActionResult> GetProfile(long id)
        {
            var profile = await _systemRepo.GetUserByIdAsync(id);

            if (profile == null)
                return NotFound();

            var isOwner = UserId == id;

            return Ok(new
            {
                profile,
                isOwner
            });
        }

        [HttpGet("users/{id:long}/videos")]
        public async Task<IActionResult> GetUserVideos(long id)
        {
            var videos = await _systemRepo.GetUserVideosAsync(id);
            return Ok(videos);
        }
    }
}