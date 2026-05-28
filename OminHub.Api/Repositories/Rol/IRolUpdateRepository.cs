using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OminHub.Models;

namespace OminHub.Api.Repositories.Role
{
    public interface IRoleUpdateRepository
    {
        Task<long> CreateRequestAsync(RoleUpdateRequest req, CancellationToken ct);
        Task AddDocumentAsync(IdentityVerificationDocument doc, CancellationToken ct);
        Task<RoleUpdateRequest?> GetRequestByIdAsync(long id, CancellationToken ct);
        Task<List<IdentityVerificationDocument>> GetDocumentsAsync(long requestId, CancellationToken ct);
        Task<RoleUpdateRequest?> GetRequestByUserIdAsync(long userId, CancellationToken ct);
    }
}
