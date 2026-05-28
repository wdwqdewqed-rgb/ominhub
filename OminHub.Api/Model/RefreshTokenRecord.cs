public class RefreshTokenRecord
{
    public long Id { get; set; }
    public int UserId { get; set; }
    public string TokenSha256 { get; set; }
    public string TokenBcrypt { get; set; }
    public string? DeviceId { get; set; }
    public string? UserAgent { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime? RevokedAt { get; set; }
    public string? ReplacedByTokenSha256 { get; set; }
}
