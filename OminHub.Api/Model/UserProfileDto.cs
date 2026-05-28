namespace OminHub.Models
{
    public class UserProfileDto
{
    // identidad
    public long Id { get; set; }
    public string Username { get; set; }
    public string? DisplayName { get; set; }

    // estado
    public string Role { get; set; }

    // visual
    public string? AvatarUrl { get; set; }
    public string? CoverUrl { get; set; }

    // contenido
    public string? Bio { get; set; }
    public string? Location { get; set; }
    public string? Links { get; set; }
}
}