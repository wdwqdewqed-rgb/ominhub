using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OminHub.Api.Model;
using OminHub.Api.Repositories.Users.Viewer;
using System.Security.Claims;
using System.Threading.Tasks;

namespace OminHub.Api.Controllers.Users
{
    [ApiController]
    [Route("api/viewer")]
    [Authorize(Roles = "Viewer,Creator,Studio")]
    public class ViewerController : ControllerBase
    {
        private readonly IViewerRepository _viewerRepo;

        public ViewerController(IViewerRepository viewerRepo)
        {
            _viewerRepo = viewerRepo;
        }

        private long UserId
        {
            get
            {
                var claim = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (!long.TryParse(claim, out var userId))
                    throw new UnauthorizedAccessException("Invalid or missing user id claim.");
                return userId;
            }
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] ViewerProfileUpdate data)
        {
            var ok = await _viewerRepo.UpdateProfileAsync(UserId, data);
            return ok ? Ok() : BadRequest();
        }

        [HttpPost("bookmark/{contentId:long}")]
        public async Task<IActionResult> ToggleBookmark(long contentId)
        {
            var ok = await _viewerRepo.ToggleBookmarkAsync(UserId, contentId);
            return ok ? Ok() : BadRequest();
        }

        [HttpPost("{id:long}/comments")]
        public async Task<IActionResult> CreateComment(
            long id,
            [FromBody] CreateCommentRequest request)
        {
            try
            {
                if (request == null)
                    return BadRequest();

                if (string.IsNullOrWhiteSpace(request.Body))
                    return BadRequest("Comment body required");

                if (request.Body.Length > 5000)
                    return BadRequest("Comment too long");

                var claim = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (!long.TryParse(claim, out var userId))
                    return Unauthorized();

                var comment = await _viewerRepo.CreateCommentAsync(
                    id,
                    userId,
                    request.Body.Trim(),
                    request.ParentCommentId);

                return Ok(comment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    error = ex.Message,
                    inner = ex.InnerException?.Message
                });
            }
        }

        [HttpPost("comments/{commentId:long}/react")]
        public async Task<IActionResult> ReactToComment(
            long commentId,
            [FromBody] CommentReactionRequest request)
        {
            if (request == null ||
                (request.Type != "like" && request.Type != "dislike"))
            {
                return BadRequest("Invalid reaction");
            }

            var result = await _viewerRepo.ToggleCommentReactionAsync(
                commentId,
                UserId,
                request.Type);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost("videos/{id:long}/reaction")]
        public async Task<IActionResult> ReactToVideo(
            long id,
            [FromBody] VideoReactionRequest request)
        {
            if (request == null ||
                (request.Reaction != "like" && request.Reaction != "dislike"))
            {
                return BadRequest("Invalid reaction");
            }

            var result = await _viewerRepo.ToggleReactionAsync(
                id,
                UserId,
                request.Reaction);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost("channels/{channelId:long}/subscribe")]
        public async Task<IActionResult> ToggleSubscribe(long channelId)
        {
            if (UserId == channelId)
                return BadRequest("Cannot subscribe to yourself");

            var isSubscribed = await _viewerRepo.ToggleSubscriptionAsync(UserId, channelId);
            var subscribersCount = await _viewerRepo.GetSubscribersCountAsync(channelId);

            return Ok(new
            {
                isSubscribed,
                subscribersCount
            });
        }
    }

    public class CreateCommentRequest
    {
        public string Body { get; set; } = string.Empty;
        public long? ParentCommentId { get; set; }
    }
}