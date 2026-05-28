using System;
using System.Data.Common;

namespace OminHub.Api.Model
{
    public class ViewerProfile : IMySqlMappable<ViewerProfile>
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? AvatarUrl { get; set; }

        public ViewerProfile FromReader(DbDataReader rd)
        {
            return new ViewerProfile
            {
                Id = rd.GetInt64(rd.GetOrdinal("Id")),
                UserId = rd.GetInt64(rd.GetOrdinal("UserId")),
                DisplayName = rd.IsDBNull(rd.GetOrdinal("DisplayName")) ? null : rd.GetString(rd.GetOrdinal("DisplayName")),
                Bio = rd.IsDBNull(rd.GetOrdinal("Bio")) ? null : rd.GetString(rd.GetOrdinal("Bio")),
                AvatarUrl = rd.IsDBNull(rd.GetOrdinal("AvatarUrl")) ? null : rd.GetString(rd.GetOrdinal("AvatarUrl"))
            };
        }
    }
}
