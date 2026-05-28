using System;
using System.Data.Common;

namespace OminHub.Api.Model
{
    public class VideoComment : IMySqlMappable<VideoComment>
    {
        public long Id { get; set; }
        public long VideoId { get; set; }
        public long UserId { get; set; }
        public long? ParentCommentId { get; set; }
        public string Body { get; set; } = null!;
        public bool IsApproved { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public VideoComment FromReader(DbDataReader rd)
        {
            Id = rd.GetInt64(rd.GetOrdinal("Id"));
            VideoId = rd.GetInt64(rd.GetOrdinal("VideoId"));
            UserId = rd.GetInt64(rd.GetOrdinal("UserId"));

            ParentCommentId = rd.IsDBNull(rd.GetOrdinal("ParentCommentId"))
                ? null
                : rd.GetInt64(rd.GetOrdinal("ParentCommentId"));

            Body = rd.GetString(rd.GetOrdinal("Body"));
            IsApproved = rd.GetBoolean(rd.GetOrdinal("IsApproved"));
            IsDeleted = rd.GetBoolean(rd.GetOrdinal("IsDeleted"));
            CreatedAt = rd.GetDateTime(rd.GetOrdinal("CreatedAt"));

            UpdatedAt = rd.IsDBNull(rd.GetOrdinal("UpdatedAt"))
                ? null
                : rd.GetDateTime(rd.GetOrdinal("UpdatedAt"));

            DeletedAt = rd.IsDBNull(rd.GetOrdinal("DeletedAt"))
                ? null
                : rd.GetDateTime(rd.GetOrdinal("DeletedAt"));

            return this;
        }
    }
}
