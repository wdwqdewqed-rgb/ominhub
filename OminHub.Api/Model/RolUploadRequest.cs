namespace OminHub.Api.Model
{
    public class RoleUploadRequest
    {
        public IFormFile File { get; set; }
        public string Type { get; set; }
    }
}
