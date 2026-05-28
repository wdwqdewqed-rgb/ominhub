using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.RegularExpressions;
using OminHub.Api.Services;
using OminHub.Api.Repositories.Auth;
using OminHub.Api.Model;
using OminHub.Models;
using OminHub.Api.Helpers;
using OminHub.Api.Repositories.Role;

namespace OminHub.Api.Controllers.Auth
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _user;
        private readonly JwtServiceRSA _jwt;
        private readonly IMultiPlatformRefreshTokenRepository _repo;
        private readonly IRoleUpdateRepository _identityRepo;

        public AuthController(
            IUserRepository user,
            JwtServiceRSA jwt,
            IMultiPlatformRefreshTokenRepository repo, IRoleUpdateRepository identityRepo)
        {
            _user = user ?? throw new ArgumentNullException(nameof(user));
            _jwt = jwt ?? throw new ArgumentNullException(nameof(jwt));
            _repo = repo ?? throw new ArgumentNullException(nameof(repo));
            _identityRepo = identityRepo ?? throw new ArgumentNullException(nameof(identityRepo));
        }

        // =============================================================
        // REGISTER
        // =============================================================
        [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterRequest req, CancellationToken ct)
{
    var username = req.Username.Trim();
    var email = req.Email.Trim().ToLowerInvariant();

    if (await _user.EmailExisteAsync(email, ct))
        return Conflict(new { message = "El email ya está registrado" });

    if (await _user.UsernameExisteAsync(username, ct))
        return Conflict(new { message = "El username ya está registrado" });

    var password = req.Password?.Trim();
    if (string.IsNullOrWhiteSpace(password))
        return BadRequest(new { message = "La contraseña es obligatoria" });

    var passwordRegex = new Regex(@"^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$");
    if (!passwordRegex.IsMatch(password))
        return BadRequest(new { message = "La contraseña debe tener mínimo 8 caracteres, al menos una letra, un número y un símbolo." });

    var rolesPermitidos = new[] { "Viewer", "Creator", "Studio" };
    if (!rolesPermitidos.Contains(req.Role))
        return BadRequest(new { message = "El role seleccionado no es válido" });

    var hash = BCrypt.Net.BCrypt.HashPassword(req.Password, workFactor: 12);

    

    var nuevo = new UserDto
    {
        Username = username,
        Email = email,
        PasswordHash = hash,
        Role = "Viewer"
    };

    try
    {
        var id = await _user.CreateUserAsync(nuevo, ct);
        if (id <= 0)
            return StatusCode(500, new { message = "No se pudo registrar el usuario" });
            
        if (req.Role == "Studio" || req.Role == "Creator")
        {
            var solicitud = new RoleUpdateRequest
            {
                UserId = id,                // recién creado
                RoleRequest = req.Role,      // Creator o Studio
                State = "pending",

                RequestNotes = null,
                ReviewedAt = null,
                ReviewedBy = null,

                IPAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),

                AttemptNumber = 1,

                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _identityRepo.CreateRequestAsync(solicitud, ct);
        }



        // ====================
        // AUTO LOGIN
        // ====================
        var user = await _user.GetById(id, ct);

        var accessToken = _jwt.GenerateAccessToken(new Claim[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        });

        var refreshToken = _jwt.GenerateRefreshToken();

        var device = Request.Headers["X-Device-ID"].ToString();
        var agent  = Request.Headers["User-Agent"].ToString();

        await _repo.StoreRefreshTokenAsync(
            user.Id,
            refreshToken,
            device,
            agent,
            ct
        );

        Response.Cookies.Append("refresh_token", refreshToken, new CookieOptions
        {
            SameSite = SameSiteMode.None,
            Secure = true,
            HttpOnly = true,
            Expires = DateTimeOffset.UtcNow.AddDays(7),
            Path = "/"
        });

        return Ok(new
        {
            message = "Usuario registrado y logueado correctamente",
            accessToken,
            expiresIn = 900,
            user = new
            {
                user.Id,
                user.Email,
                user.Username,
                user.Role
            }
        });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = "Error interno", detail = ex.Message });
    }
}


        // =============================================================
        // LOGIN
        // =============================================================
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req, CancellationToken ct)
        {

            if (string.IsNullOrEmpty(req.Password))
                return Unauthorized();


            var identifier = req.EmailOrUsername.Trim();
            var password = req.Password.Trim();

            var user = await _user.ObtenerPorEmailOUsername(identifier, ct);
            if (user == null)
                return Unauthorized(new { message = "Credenciales inválidas" });

            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                return Unauthorized(new { message = "Credenciales inválidas" });

            // ACCESS TOKEN
            var accessToken = _jwt.GenerateAccessToken(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            });

            // REFRESH TOKEN seguro
            var refreshToken = _jwt.GenerateRefreshToken();

            var device = Request.Headers["X-Device-ID"].ToString();
            var agent  = Request.Headers["User-Agent"].ToString();

            await _repo.StoreRefreshTokenAsync(
                user.Id,
                refreshToken,
                device,
                agent,
                ct
            );

            Response.Cookies.Append("refresh_token", refreshToken, new CookieOptions
            {
                SameSite = SameSiteMode.None,
                Secure = true,
                HttpOnly = true,
                Expires = DateTimeOffset.UtcNow.AddDays(7),
                Path = "/"
            });

            return Ok(new
            {
                accessToken,
                expiresIn = 900,
                user = new
                {
                    user.Id,
                    user.Email,
                    user.Username,
                    user.Role
                }
            });
        }

        [HttpPost("refresh")]
public async Task<IActionResult> Refresh(CancellationToken ct)
{
    var refreshToken = Request.Cookies["refresh_token"];
    if (string.IsNullOrWhiteSpace(refreshToken))
        return Unauthorized();

    // 1) find the token record (repo verifies bcrypt after sha lookup)
    var record = await _repo.GetValidRefreshTokenAsync(refreshToken, ct);
    if (record is null)
        return Unauthorized(new { message = "Invalid refresh token" });
    
    var sha = HashHelper.ComputeSha256Hex(refreshToken);

    var wasReused = await _repo.IsReusedToken(sha, ct);

    if (wasReused)
    {
        await _repo.RevokeAllTokensForUser(record.UserId, ct);
        Response.Cookies.Delete("refresh_token");

        return Unauthorized(new
        {
            message = "Refresh token reused (family replay). All sessions revoked."
        });
    }

    // 1.5) device/agent check (detect reuse)
    var device = Request.Headers["X-Device-ID"].ToString();
    var agent  = Request.Headers["User-Agent"].ToString();

    if ((record.DeviceId ?? "") != (device ?? "") || (record.UserAgent ?? "") != (agent ?? ""))
    {
        // hard kill all sessions for this user (recommended Google-style)
        await _repo.RevokeAllTokensForUser(record.UserId, ct);
        Response.Cookies.Delete("refresh_token");
        return Unauthorized(new { message = "Token reuse detected" });
    }

    // 2) load user
    var user = await _user.GetById(record.UserId, ct);
    if (user is null)
        return Unauthorized();

    // 3) create new access + new refresh token, rotate atomically
    var newAccess = _jwt.GenerateAccessToken(new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Role, user.Role)
    });

    var newRefresh = _jwt.GenerateRefreshToken();

    // rotate: revokes old and inserts new token using repo method (pass device/agent)
    await _repo.RotateRefreshTokenAsync(record.Id, newRefresh, device, agent, ct);

    // set new cookie (HttpOnly)
    Response.Cookies.Append("refresh_token", newRefresh, new CookieOptions
    {
        SameSite = SameSiteMode.None,
        Secure = true,
        HttpOnly = true,
        Expires = DateTimeOffset.UtcNow.AddDays(30),
        Path = "/"
    });

    return Ok(new { accessToken = newAccess, expiresIn = _jwt.GetAccessExpirationUtc().Subtract(DateTime.UtcNow).TotalSeconds });
}





[HttpPost("logout")]
public async Task<IActionResult> Logout(CancellationToken ct)
{
    var refreshToken = Request.Cookies["refresh_token"];
    if (string.IsNullOrWhiteSpace(refreshToken))
    {
        // ensure cookie deleted client-side
        Response.Cookies.Delete("refresh_token");
        return Ok();
    }

    // Revoke by plain value -> repo computes SHA and revokes
    await _repo.RevokeRefreshTokenByPlainAsync(refreshToken, ct);

    Response.Cookies.Delete("refresh_token");
    return Ok();
}



    }
}
