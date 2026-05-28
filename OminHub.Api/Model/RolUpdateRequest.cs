public class RoleUpdateRequest
{
    public long Id { get; set; }
    public long UserId { get; set; }

    public string RoleRequest { get; set; }   // Creator, Studio

    public string State { get; set; } = "pending"; // pending, approved, rejected

    public string? RequestNotes { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? ReviewedAt { get; set; }
    public long? ReviewedBy { get; set; }

    public string? IPAddress { get; set; }
    public int AttemptNumber { get; set; } = 1;

    public List<IdentityVerificationDocument> Documents { get; set; } = new();
}
