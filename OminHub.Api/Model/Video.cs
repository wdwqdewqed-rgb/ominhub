using System;
using System.Data.Common;

namespace OminHub.Api.Model
{
    public class Video : IMySqlMappable<Video>
    {
        public long Id { get; set; }
        public long UploaderId { get; set; }
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public int? CategoryId { get; set; }
        public bool IsSensitive { get; set; }
        public string Visibility { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string ProcessingStatus { get; set; } = null!;
        public string? OriginalFilePath { get; set; }
        public string? HlsPath { get; set; }
        public int? DurationSeconds { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }
        public string? MimeType { get; set; }
        public long? SizeBytes { get; set; }
        public bool AllowComments { get; set; }
        public bool RequiresApproval { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? PublishedAt { get; set; }
        public DateTime? ApprovedAt { get; set; }
        public long? ApprovedBy { get; set; }
        public long ViewCount { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
        public int CommentsCount { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedAt { get; set; }

        public Video FromReader(DbDataReader rd)
        {
            return new Video
            {
                Id = rd.GetInt64(rd.GetOrdinal("Id")),
                UploaderId = rd.GetInt64(rd.GetOrdinal("UploaderId")),
                Title = rd.GetString(rd.GetOrdinal("Title")),
                Description = rd.IsDBNull(rd.GetOrdinal("Description")) ? null : rd.GetString(rd.GetOrdinal("Description")),
                CategoryId = rd.IsDBNull(rd.GetOrdinal("CategoryId")) ? null : rd.GetInt32(rd.GetOrdinal("CategoryId")),
                IsSensitive = rd.GetBoolean(rd.GetOrdinal("IsSensitive")),
                Visibility = rd.GetString(rd.GetOrdinal("Visibility")),
                Status = rd.GetString(rd.GetOrdinal("Status")),
                ProcessingStatus = rd.GetString(rd.GetOrdinal("ProcessingStatus")),
                OriginalFilePath = rd.IsDBNull(rd.GetOrdinal("OriginalFilePath")) ? null : rd.GetString(rd.GetOrdinal("OriginalFilePath")),
                HlsPath = rd.IsDBNull(rd.GetOrdinal("HlsPath")) ? null : rd.GetString(rd.GetOrdinal("HlsPath")),
                DurationSeconds = rd.IsDBNull(rd.GetOrdinal("DurationSeconds")) ? null : rd.GetInt32(rd.GetOrdinal("DurationSeconds")),
                Width = rd.IsDBNull(rd.GetOrdinal("Width")) ? null : rd.GetInt32(rd.GetOrdinal("Width")),
                Height = rd.IsDBNull(rd.GetOrdinal("Height")) ? null : rd.GetInt32(rd.GetOrdinal("Height")),
                MimeType = rd.IsDBNull(rd.GetOrdinal("MimeType")) ? null : rd.GetString(rd.GetOrdinal("MimeType")),
                SizeBytes = rd.IsDBNull(rd.GetOrdinal("SizeBytes")) ? null : rd.GetInt64(rd.GetOrdinal("SizeBytes")),
                AllowComments = rd.GetBoolean(rd.GetOrdinal("AllowComments")),
                RequiresApproval = rd.GetBoolean(rd.GetOrdinal("RequiresApproval")),
                CreatedAt = rd.GetDateTime(rd.GetOrdinal("CreatedAt")),
                UpdatedAt = rd.GetDateTime(rd.GetOrdinal("UpdatedAt")),
                PublishedAt = rd.IsDBNull(rd.GetOrdinal("PublishedAt")) ? null : rd.GetDateTime(rd.GetOrdinal("PublishedAt")),
                ApprovedAt = rd.IsDBNull(rd.GetOrdinal("ApprovedAt")) ? null : rd.GetDateTime(rd.GetOrdinal("ApprovedAt")),
                ApprovedBy = rd.IsDBNull(rd.GetOrdinal("ApprovedBy")) ? null : rd.GetInt64(rd.GetOrdinal("ApprovedBy")),
                ViewCount = rd.GetInt64(rd.GetOrdinal("ViewCount")),
                LikeCount = rd.GetInt32(rd.GetOrdinal("LikeCount")),
                DislikeCount = rd.GetInt32(rd.GetOrdinal("DislikeCount")),
                CommentsCount = rd.GetInt32(rd.GetOrdinal("CommentsCount")),
                IsDeleted = rd.GetBoolean(rd.GetOrdinal("IsDeleted")),
                DeletedAt = rd.IsDBNull(rd.GetOrdinal("DeletedAt")) ? null : rd.GetDateTime(rd.GetOrdinal("DeletedAt"))
            };
        }
    }
}
