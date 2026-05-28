using System.Threading;
using System.Threading.Tasks;

namespace OminHub.Api.Repositories.Auth
{
    public interface IMultiPlatformRefreshTokenRepository
    {
        Task StoreRefreshTokenAsync(int userId, string refreshTokenPlain, string? deviceId, string? userAgent, CancellationToken ct);

        Task<RefreshTokenRecord?> GetValidRefreshTokenAsync(string refreshTokenPlain, CancellationToken ct);

        Task RotateRefreshTokenAsync(long tokenId, string newRefreshTokenPlain, string? newDevice, string? newAgent, CancellationToken ct);

        Task RevokeRefreshTokenByShaAsync(string sha, CancellationToken ct);

        Task RevokeRefreshTokenByPlainAsync(string refreshTokenPlain, CancellationToken ct);

        Task RevokeAllTokensForUser(int userId, CancellationToken ct);

        Task<bool> IsReusedToken(string sha, CancellationToken ct);
    }
}
