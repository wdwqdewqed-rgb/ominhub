using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Api.Repositories.Users.Admin
{
    public interface IAdminRepository
    {
        // =========================
        // USER VERIFICATION
        // =========================

        Task<bool> ApproveAsync(
            long requestId,
            long adminId,
            CancellationToken ct
        );

        Task<bool> RejectAsync(
            long requestId,
            string notes,
            long adminId,
            CancellationToken ct
        );

        // =========================
        // VIDEO MODERATION
        // =========================

        Task ApproveVideoAsync(
            long videoId,
            long adminId,
            string? notes,
            CancellationToken ct
        );

        Task RejectVideoAsync(
            long videoId,
            long adminId,
            string? notes,
            CancellationToken ct
        );
    }
}
