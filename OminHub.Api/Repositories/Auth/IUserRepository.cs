using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OminHub.Models;

namespace OminHub.Api.Repositories.Auth
{
    /// <summary>
    /// Interfaz para operaciones relacionadas con usuarios y gestión de refresh tokens (tokenhash).
    /// Implementar en UsuarioRepository (ADO.NET).
    /// </summary>
    /// <summary>
    /// Interfaz para operaciones relacionadas con usuarios y gestión de refresh tokens (tokenhash).
    /// Implementar en UserRepository (ADO.NET).
    /// </summary>
    public interface IUserRepository
    {
        /// <summary>
        /// Crea un nuevo usuario y devuelve el Id generado.
        /// </summary>
        Task<int> CreateUserAsync(UserDto user, CancellationToken ct);

        /// <summary>
        /// Verifica si un email ya existe.
        /// </summary>
        Task<bool> EmailExisteAsync(string email, CancellationToken ct);

        /// <summary>
        /// Verifica si un username ya existe.
        /// </summary>
        Task<bool> UsernameExisteAsync(string username, CancellationToken ct);

        /// <summary>
        /// Obtiene usuario por email o username.
        /// </summary>
        Task<UserDto?> ObtenerPorEmailOUsername(string identifier, CancellationToken ct);

        /// <summary>
        /// Obtiene usuario por su Id.
        /// </summary>
        Task<UserDto?> GetById(int id, CancellationToken ct);
    }
}
