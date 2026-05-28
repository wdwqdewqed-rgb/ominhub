using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OminHub.Api.Contracts.Creator
{
    public class CreateVideoOrchestratedRequest
    {
        // =========================
        // VIDEO
        // =========================
        [Required]
        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        [Required]
        public string Visibility { get; set; } = null!;

        public bool IsSensitive { get; set; } = false;

        public bool AllowComments { get; set; } = true;

        public bool RequiresApproval { get; set; } = true;

        // =========================
        // FILE
        // =========================
        [Required]
        public IFormFile VideoFile { get; set; } = null!;

        // =========================
        // RELATIONS
        // =========================
        public List<int> CategoryIds { get; set; } = new();

        public List<int> TagIds { get; set; } = new();

        public List<long> CollaboratorIds { get; set; } = new();

        // =========================
        // THUMBNAILS
        // =========================
        public List<ThumbnailInputDto> Thumbnails { get; set; } = new();
    }

    public class ThumbnailInputDto
    {
        [Required]
        public string FilePath { get; set; } = null!;

        public bool IsPrimary { get; set; }

        public int OrderIndex { get; set; }
    }
}
