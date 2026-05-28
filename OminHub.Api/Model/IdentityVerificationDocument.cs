public class IdentityVerificationDocument
{
    public long Id { get; set; }
    public long RequestId { get; set; }

    public string Type { get; set; } // "front", "back", "selfie"
    public string Url { get; set; }

    public DateTime CreatedAt { get; set; }
}
