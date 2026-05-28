using System.ComponentModel.DataAnnotations;

namespace OminHub.Api.Model
{
    public class AddCollaboratorRequest
    {
        public ulong CreatorId { get; set; }
        public string Name { get; set; } = null!;
        public string Document { get; set; } = null!;
        public string Role { get; set; } = null!;
        [Required]
        public IFormFile ConsentFile { get; set; }

    }
}