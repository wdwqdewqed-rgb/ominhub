using System.ComponentModel.DataAnnotations;

namespace OminHub.Api.Model
{
    public record RegisterRequest(
        [Required, StringLength(100)] string Username,
        [Required, StringLength(100, MinimumLength = 8)] string Password,
        [Required, EmailAddress, StringLength(254)] string Email,
        [Required, StringLength(100)] string Role
    );
}