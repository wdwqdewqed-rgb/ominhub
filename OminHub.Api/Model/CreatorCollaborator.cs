namespace OminHub.Model
{
    public class CreatorCollaborator
    {
        public long Id { get; set; }
        public long CreatorId { get; set; }
        public string Type { get; set; } = "manual";
        public string Name { get; set; } = null!;
        public string Document { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string? ConsentFileUrl { get; set; }
        public long? LinkedUserId { get; set; }
        public string RequestState { get; set; } = "pending";
        public DateTime CreatedAt { get; set; }
        public DateTime? ApprovedAt { get; set; }
        public DateTime? RejectedAt { get; set; }
    }
}
