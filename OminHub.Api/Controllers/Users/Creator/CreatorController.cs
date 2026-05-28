using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OminHub.Api.Contracts.Creator;
using OminHub.Api.Model;
using OminHub.Api.Repositories.Users.Creator;
using OminHub.Core.Abstractions;
using OminHub.Core.Models;
using OminHub.Models;
using System.Security.Claims;

namespace OminHub.Api.Controllers.Creator
{
    [ApiController]
    [Route("api/creator")]
    [Authorize]
    public class CreatorController : ControllerBase
    {
        private readonly ICreatorRepository _repo;
        private readonly IWebHostEnvironment _env;

        public CreatorController(
            ICreatorRepository repo,
            IWebHostEnvironment env
        )
        {
            _repo = repo;
            _env = env;
        }

        long UserId => long.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpPost("create")]
        public async Task<IActionResult> CreateVideo(
            [FromBody] CreateVideoRequest req,
            CancellationToken ct
        )
        {
            if (string.IsNullOrWhiteSpace(req.Title))
                return BadRequest("Title is required.");

            if (string.IsNullOrWhiteSpace(req.Visibility))
                return BadRequest("Visibility is required.");

            if (req.Visibility != "public" &&
                req.Visibility != "unlisted" &&
                req.Visibility != "private")
                return BadRequest("Invalid visibility value.");

            var video = new Video
            {
                UploaderId = UserId,
                Title = req.Title.Trim(),
                Description = req.Description?.Trim(),
                CategoryId = req.CategoryId,
                IsSensitive = req.IsSensitive,

                Visibility = req.Visibility,
                Status = "draft",
                ProcessingStatus = "uploaded",

                OriginalFilePath = null,
                HlsPath = null,
                DurationSeconds = null,
                Width = null,
                Height = null,
                MimeType = null,
                SizeBytes = null,

                AllowComments = req.AllowComments,
                RequiresApproval = req.RequiresApproval
            };

            var videoId = await _repo.CreateVideoAsync(video, ct);

            return Ok(new
            {
                id = videoId,
                status = "draft"
            });
        }

        [HttpPost("videos/{videoId:long}/file")]
        [RequestSizeLimit(10L * 1024 * 1024 * 1024)]
        public async Task<IActionResult> UploadVideoFile(
            long videoId,
            IFormFile file,
            CancellationToken ct
        )
        {
            if (file == null || file.Length == 0)
                return BadRequest("Video file is required.");

            if (!file.ContentType.StartsWith("video/"))
                return BadRequest("Invalid file type.");

            var uploaderId = await _repo.GetUploaderIdAsync(videoId, ct);
            if (uploaderId != UserId)
                return Forbid();

            var uploadsRoot = Path.Combine(
                _env.WebRootPath,
                "uploads",
                "users",
                uploaderId.ToString(),
                "videos-upload",
                videoId.ToString()
            );

            Directory.CreateDirectory(uploadsRoot);

            var extension = Path.GetExtension(file.FileName);
            var fileName = "original" + extension;
            var physicalPath = Path.Combine(uploadsRoot, fileName);

            await using (var fs = new FileStream(physicalPath, FileMode.Create))
            {
                await file.CopyToAsync(fs, ct);
            }

            var publicUrl =
                $"{Request.Scheme}://{Request.Host}" +
                $"/uploads/users/{uploaderId}/videos-upload/{videoId}/{fileName}";

            await _repo.UpdateVideoFileAsync(
                videoId,
                publicUrl,
                file.ContentType,
                file.Length,
                ct
            );

            return Ok(new
            {
                VideoId = videoId,
                FileName = fileName,
                Url = publicUrl,
                SizeBytes = file.Length,
                MimeType = file.ContentType
            });
        }

        [HttpGet("videos/{videoId:long}/processing-status")]
        public async Task<IActionResult> GetProcessingStatus(
            long videoId,
            CancellationToken ct
        )
        {
            var uploaderId = await _repo.GetUploaderIdAsync(videoId, ct);
            if (uploaderId != UserId)
                return Forbid();

            var status = await _repo.GetProcessingStatusAsync(videoId, ct);

            return Ok(new
            {
                videoId,
                processingStatus = status
            });
        }

        [HttpPost("temp")]
        [RequestSizeLimit(50 * 1024 * 1024)]
        public async Task<IActionResult> UploadTemp(
            [FromForm] List<IFormFile> files,
            CancellationToken ct
        )
        {
            if (files == null || files.Count == 0)
                return BadRequest("At least one file is required.");

            if (files.Count > 5)
                return BadRequest("Maximum 5 files allowed.");

            var now = DateTime.UtcNow;

            var basePath = Path.Combine(
                _env.WebRootPath,
                "uploads",
                "tmp",
                now.Year.ToString(),
                now.Month.ToString("D2")
            );

            Directory.CreateDirectory(basePath);

            var results = new List<object>();

            foreach (var file in files)
            {
                if (!file.ContentType.StartsWith("image/"))
                    return BadRequest("Only image files are allowed.");

                var ext = Path.GetExtension(file.FileName);
                var name = $"{Guid.NewGuid():N}{ext}";
                var physicalPath = Path.Combine(basePath, name);

                await using var fs = new FileStream(physicalPath, FileMode.Create);
                await file.CopyToAsync(fs, ct);

                var publicUrl =
                    $"{Request.Scheme}://{Request.Host}" +
                    $"/uploads/tmp/{now.Year}/{now.Month:D2}/{name}";

                results.Add(new
                {
                    fileName = name,
                    url = publicUrl,
                    sizeBytes = file.Length,
                    mimeType = file.ContentType
                });
            }

            return Ok(new { items = results });
        }


        [HttpPost("videos/orchestrate")]
[RequestSizeLimit(10L * 1024 * 1024 * 1024)]
public async Task<IActionResult> CreateVideoOrchestrated(
    [FromForm] CreateVideoOrchestratedRequest req,
    [FromServices] IVideoThumbnailRepository thumbnailRepo,
    CancellationToken ct
)
{
    if (string.IsNullOrWhiteSpace(req.Title))
        return BadRequest("Title is required.");

    if (!new[] { "public", "unlisted", "private" }.Contains(req.Visibility))
        return BadRequest("Invalid visibility.");

    if (req.VideoFile == null || req.VideoFile.Length == 0)
        return BadRequest("Video file is required.");

    if (req.CategoryIds.Count < 1)
        return BadRequest("At least one category is required.");

    if (req.TagIds.Count < 1)
        return BadRequest("At least one tag is required.");

    if (req.Thumbnails.Count == 0 || req.Thumbnails.Count > 5)
        return BadRequest("Between 1 and 5 thumbnails are required.");

    var video = new Video
    {
        UploaderId = UserId,
        Title = req.Title.Trim(),
        Description = req.Description?.Trim(),
        Visibility = req.Visibility,
        IsSensitive = req.IsSensitive,
        Status = "draft",
        ProcessingStatus = "uploaded",
        AllowComments = req.AllowComments,
        RequiresApproval = req.RequiresApproval
    };

    var videoId = await _repo.CreateVideoAsync(video, ct);

    var root = Path.Combine(
        _env.WebRootPath,
        "uploads",
        "users",
        UserId.ToString(),
        "videos-upload",
        videoId.ToString()
    );

    Directory.CreateDirectory(root);

    var ext = Path.GetExtension(req.VideoFile.FileName);
    var fileName = "original" + ext;
    var physicalPath = Path.Combine(root, fileName);

    await using (var fs = new FileStream(physicalPath, FileMode.Create))
        await req.VideoFile.CopyToAsync(fs, ct);

    var publicUrl =
        $"{Request.Scheme}://{Request.Host}" +
        $"/uploads/users/{UserId}/videos-upload/{videoId}/{fileName}";

    await _repo.UpdateVideoFileAsync(
        videoId,
        publicUrl,
        req.VideoFile.ContentType,
        req.VideoFile.Length,
        ct
    );

    await _repo.SyncVideoCategoriesAsync(videoId, req.CategoryIds, ct);
    await _repo.SyncVideoTagsAsync(videoId, req.TagIds, ct);

    if (req.CollaboratorIds.Any())
    {
        await _repo.SyncVideoCollaboratorsAsync(
            videoId,
            UserId,
            req.CollaboratorIds,
            ct
        );
    }

    await thumbnailRepo.InsertInitialAsync(
        videoId,
        req.Thumbnails.Select(t => new VideoThumbnailInput
        {
            FilePath = t.FilePath,
            OrderIndex = (byte)t.OrderIndex,
            IsPrimary = t.IsPrimary,
            IsAutoGenerated = false
        }),
        ct
    );


    return Accepted(new
    {
        videoId,
        status = "processing"
    });
}


        [HttpPost("videos/{videoId:long}/tags")]
        public async Task<IActionResult> AddTags(
            long videoId,
            [FromBody] IEnumerable<int> tagIds,
            CancellationToken ct
        )
        {
            if (tagIds == null || !tagIds.Any())
                return BadRequest("No tags provided.");

            await _repo.AddVideoTagsAsync(videoId, tagIds, ct);

            return Ok(new
            {
                videoId,
                added = tagIds.Distinct().Count()
            });
        }

        // ============================================================
        // SYNC – usado en edición (add + remove)
        // ============================================================
        [HttpPut("videos/{videoId:long}/tags")]
        public async Task<IActionResult> SyncTags(
            long videoId,
            [FromBody] IEnumerable<int> tagIds,
            CancellationToken ct
        )
        {
            if (tagIds == null)
                return BadRequest("Tag list is required.");

            await _repo.SyncVideoTagsAsync(videoId, tagIds, ct);

            return Ok(new
            {
                videoId,
                total = tagIds.Distinct().Count()
            });
        }

        // ============================================================
        // ADD – creación o agregado incremental
        // ============================================================
        [HttpPost("videos/{videoId:long}/categories")]
        public async Task<IActionResult> AddCategories(
            long videoId,
            [FromBody] IEnumerable<int> categoryIds,
            CancellationToken ct
        )
        {
            if (categoryIds == null || !categoryIds.Any())
                return BadRequest("No categories provided.");

            await _repo.AddVideoCategoriesAsync(videoId, categoryIds, ct);

            return Ok(new
            {
                videoId,
                added = categoryIds.Distinct().Count()
            });
        }

        // ============================================================
        // SYNC – edición completa
        // ============================================================
        [HttpPut("videos/{videoId:long}/categories")]
        public async Task<IActionResult> SyncCategories(
            long videoId,
            [FromBody] IEnumerable<int> categoryIds,
            CancellationToken ct
        )
        {
            if (categoryIds == null)
                return BadRequest("Category list is required.");

            await _repo.SyncVideoCategoriesAsync(videoId, categoryIds, ct);

            return Ok(new
            {
                videoId,
                total = categoryIds.Distinct().Count()
            });
        }

        [HttpPost("videos/{videoId:long}/thumbnails")]
        [Authorize]
        [RequestSizeLimit(50 * 1024 * 1024)] // 50MB total
        public async Task<IActionResult> UploadInitialThumbnails(
            long videoId,
            [FromForm] List<IFormFile> files,
            [FromServices] IWebHostEnvironment env,
            CancellationToken ct
        )
        {
            if (files == null || files.Count == 0)
                return BadRequest("At least one thumbnail is required.");

            if (files.Count > 5)
                return BadRequest("Maximum 5 thumbnails allowed.");

            // Verificar ownership
            var uploaderId = await _repo.GetUploaderIdAsync(videoId, ct);
            if (uploaderId != UserId)
                return Forbid();

            var basePath = Path.Combine(
                _env.WebRootPath,
                "uploads",
                "users",
                uploaderId.ToString(),
                "videos-upload",
                videoId.ToString(),
                "thumbnails"
            );

            Directory.CreateDirectory(basePath);

            var inputs = new List<VideoThumbnailInput>();
            int order = 0;

            foreach (var file in files)
            {
                if (!file.ContentType.StartsWith("image/"))
                    return BadRequest("Invalid thumbnail type.");

                var ext = Path.GetExtension(file.FileName);
                var name = $"{Guid.NewGuid():N}{ext}";
                var physical = Path.Combine(basePath, name);

                await using var fs = new FileStream(physical, FileMode.Create);
                await file.CopyToAsync(fs, ct);

                var publicPath =
                    $"{Request.Scheme}://{Request.Host}" +
                    $"/uploads/users/{uploaderId}/videos-upload/{videoId}/thumbnails/{name}";

                inputs.Add(new VideoThumbnailInput
                {
                    FilePath = publicPath,
                    OrderIndex = (byte)order,
                    IsPrimary = order == 0,
                    IsAutoGenerated = false
                });

                order++;
            }

            await _repo.InsertInitialVideoThumbnailsAsync(videoId, inputs, ct);

            return Ok(new
            {
                videoId,
                count = inputs.Count
            });
        }

        [HttpGet("videos/{videoId:long}")]
        public async Task<IActionResult> Get(long videoId, CancellationToken ct)
        {
            var data = await _repo.GetByVideoAsync(videoId, ct);
            return Ok(data);
        }

        [HttpPut("videos/{videoId:long}/thumbnails/sync")]
        public async Task<IActionResult> SyncThumbnails(
            long videoId,
            [FromBody] List<VideoThumbnailInput> thumbnails,
            CancellationToken ct
        )
        {
            if (thumbnails == null || thumbnails.Count == 0)
                return BadRequest("At least one thumbnail is required.");

            if (thumbnails.Count > 5)
                return BadRequest("Maximum 5 thumbnails allowed.");

            await _repo.SyncVideoThumbnailsAsync(videoId, thumbnails, ct);
            return Ok();
        }

        [HttpPut("videos/{videoId:long}/collaborators")]
        public async Task<IActionResult> SyncCollaborators(
            long videoId,
            [FromBody] long[] collaboratorIds,
            CancellationToken ct
        )
        {
            if (collaboratorIds == null)
                return BadRequest("Collaborators are required.");

            await _repo.SyncVideoCollaboratorsAsync(
                videoId,
                UserId,
                collaboratorIds,
                ct
            );

            return NoContent();
        }
        [HttpGet("mine")]
        public async Task<IActionResult> GetMyVideos(CancellationToken ct)
        {
            var userId = long.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier)!
            );

            var videos = await _repo.GetVideosByUploaderAsync(userId, ct);
            return Ok(videos);
        }

        [HttpGet("users/{id:long}/analytics")]
        public async Task<IActionResult> GetAnalytics(long id)
        {
            if (UserId != id)
                return Forbid();

            var data = await _repo.GetUserAnalyticsAsync(id);
            return Ok(data);
        }

        [HttpPut("users/me")]
        public async Task<IActionResult> UpdateProfile(
            [FromBody] UpdateUserProfileDto dto,
            CancellationToken ct)
        {
            if (UserId == 0)
                return Unauthorized();

            await _repo.UpdateUserProfileAsync(UserId, dto);

            return Ok();
        }
    }
}


