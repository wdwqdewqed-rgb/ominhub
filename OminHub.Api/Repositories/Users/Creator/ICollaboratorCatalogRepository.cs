using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OminHub.Api.Model;

namespace OminHub.Api.Repositories.System
{
    public interface ICollaboratorCatalogRepository
    {
        Task<List<CatalogCollaborator>> GetCollaboratorsByCreatorAsync(
            ulong creatorId,
            CancellationToken ct
        );

        Task<ulong> CreateCollaboratorAsync(
            CatalogCollaborator entity,
            CancellationToken ct
        );
    }
}
