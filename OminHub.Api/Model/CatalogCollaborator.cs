using System;

namespace OminHub.Api.Model
{
    public class CatalogCollaborator
    {
        public ulong Id { get; set; }

        public ulong CreatorId { get; set; }

        public string Type { get; set; }

        public string Name { get; set; }

        public string Document { get; set; }

        public string Role { get; set; }

        public string ConsentFileUrl { get; set; }

        public ulong? LinkedUserId { get; set; }

        public string RequestState { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? ApprovedAt { get; set; }

        public DateTime? RejectedAt { get; set; }

    }
}
