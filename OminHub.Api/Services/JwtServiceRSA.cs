using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IO;

namespace OminHub.Api.Services
{
    public class JwtServiceRSA
    {
        private readonly string _issuer;
        private readonly string _audience;
        public string ISSUER => _issuer;
        public string AUDIENCE => _audience;

        private readonly int _accessTokenMinutes;
        private readonly int _refreshTokenDays;
        private readonly bool _useAsymmetric;

        private readonly SymmetricSecurityKey? _symmetricKey;
        private readonly RsaSecurityKey? _rsaPrivateKey;
        private readonly RsaSecurityKey? _rsaPublicKey;

        private readonly SigningCredentials _signingCredentials;
        private readonly JwtSecurityTokenHandler _tokenHandler = new();

        public JwtServiceRSA(IConfiguration config)
        {
            _issuer = config["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer");
            _audience = config["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience");

            _accessTokenMinutes = int.Parse(config["Jwt:AccessTokenExpirationMinutes"]);
            _refreshTokenDays = int.Parse(config["Jwt:RefreshTokenExpirationDays"]);

            _useAsymmetric = bool.TryParse(config["Jwt:UseAsymmetric"], out var a) && a;

            if (_useAsymmetric)
            {
                _rsaPrivateKey = LoadPrivateKey(config);
                _rsaPublicKey = LoadPublicKey(config);
                _signingCredentials = new SigningCredentials(_rsaPrivateKey, SecurityAlgorithms.RsaSha256);
            }
            else
            {
                _symmetricKey = LoadSymmetricKey(config);
                _signingCredentials = new SigningCredentials(_symmetricKey, SecurityAlgorithms.HmacSha256);
            }
        }

        // ===================== RSA KEYS ===========================
        private static RsaSecurityKey LoadPrivateKey(IConfiguration config)
        {
            var path = config["Jwt:PrivateKeyPath"];
            if (string.IsNullOrWhiteSpace(path))
                throw new Exception("Jwt:PrivateKeyPath no definido");

            if (!File.Exists(path))
                throw new Exception($"No se encontró private.pem en {path}");

            var rsa = RSA.Create();
            rsa.ImportFromPem(File.ReadAllText(path));
            return new RsaSecurityKey(rsa);
        }

        private static RsaSecurityKey LoadPublicKey(IConfiguration config)
        {
            var path = config["Jwt:PublicKeyPath"];
            if (string.IsNullOrWhiteSpace(path))
                throw new Exception("Jwt:PublicKeyPath no definido");

            if (!File.Exists(path))
                throw new Exception($"No se encontró public.pem en {path}");

            var rsa = RSA.Create();
            rsa.ImportFromPem(File.ReadAllText(path));
            return new RsaSecurityKey(rsa);
        }

        // ===================== HMAC ================================
        private static SymmetricSecurityKey LoadSymmetricKey(IConfiguration c)
        {
            var signingKey = c["Jwt:SigningKey"];
            if (string.IsNullOrWhiteSpace(signingKey))
                throw new ArgumentNullException("Jwt:SigningKey debe definirse cuando UseAsymmetric=false");

            try
            {
                return new SymmetricSecurityKey(Convert.FromBase64String(signingKey));
            }
            catch
            {
                return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey));
            }
        }

        // ===================== GENERATE ACCESS ======================
        public string GenerateAccessToken(IEnumerable<Claim> additionalClaims)
        {
            var now = DateTime.UtcNow;
            var expires = now.AddMinutes(_accessTokenMinutes);

            var claims = new List<Claim>(additionalClaims ?? Enumerable.Empty<Claim>());
            claims.TryAdd(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.TryAdd(new Claim(
                JwtRegisteredClaimNames.Iat,
                new DateTimeOffset(now).ToUnixTimeSeconds().ToString(),
                ClaimValueTypes.Integer64
            ));

            var jwt = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                notBefore: now,
                expires: expires,
                signingCredentials: _signingCredentials
            );

            return _tokenHandler.WriteToken(jwt);
        }

        // ===================== REFRESH TOKEN =========================
        public string GenerateRefreshToken(int bytes = 64)
        {
            var raw = new byte[bytes];
            RandomNumberGenerator.Fill(raw);
            return Base64Url(raw);
        }

        // ===================== EXPIRACION =============================
        public DateTime GetRefreshTokenExpirationUtc() => DateTime.UtcNow.AddDays(_refreshTokenDays);
        public DateTime GetAccessExpirationUtc() => DateTime.UtcNow.AddMinutes(_accessTokenMinutes);

        // ===================== VALIDACIÓN =============================
        public ClaimsPrincipal? GetPrincipalFromToken(string token, bool validateLifetime = true)
        {
            var p = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = true,
                ValidAudience = _audience,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = validateLifetime,
                ClockSkew = TimeSpan.FromSeconds(60),
            };

            if (_useAsymmetric)
            {
                p.IssuerSigningKey = _rsaPublicKey;
                p.ValidAlgorithms = new[] { SecurityAlgorithms.RsaSha256 };
            }
            else
            {
                p.IssuerSigningKey = _symmetricKey;
                p.ValidAlgorithms = new[] { SecurityAlgorithms.HmacSha256 };
            }

            try
            {
                return _tokenHandler.ValidateToken(token, p, out _);
            }
            catch
            {
                return null;
            }
        }

        // ===================== HELPERS =============================
        private static string Base64Url(byte[] input)
        {
            return Convert.ToBase64String(input)
                .Replace("+", "-")
                .Replace("/", "_")
                .Replace("=", "");
        }

        // ===================== PUBLIC KEY EXPORT (DER) =============================
        public string GetPublicKey()
        {
            if (_rsaPublicKey == null)
                throw new Exception("No hay clave pública cargada (UseAsymmetric=false).");

            // DER base64
            return Convert.ToBase64String(_rsaPublicKey.Rsa.ExportRSAPublicKey());
        }

        // ===================== PUBLIC KEY EXPORT (PEM) =============================
        public string GetPublicKeyPem()
        {
            if (_rsaPublicKey == null)
                throw new Exception("No hay clave pública cargada (UseAsymmetric=false).");

            var der = _rsaPublicKey.Rsa.ExportSubjectPublicKeyInfo();
            var base64 = Convert.ToBase64String(der);

            return
                "-----BEGIN PUBLIC KEY-----\n" +
                Chunk(base64, 64) +
                "-----END PUBLIC KEY-----\n";
        }

        private static string Chunk(string s, int size)
        {
            var r = "";
            for (int i = 0; i < s.Length; i += size)
                r += s.Substring(i, Math.Min(size, s.Length - i)) + "\n";
            return r;
        }

        // ===================== SECURITY KEYS =============================
        public SecurityKey GetSecurityKey()
        {
            if (_useAsymmetric)
                return _rsaPublicKey!;

            return _symmetricKey!;
        }

        public RsaSecurityKey GetRsaSecurityKey()
        {
            if (!_useAsymmetric || _rsaPublicKey == null)
                throw new Exception("Jwt configurado sin claves RSA. UseAsymmetric debe ser true.");

            return _rsaPublicKey;
        }
    }

    static class ClaimListExtensions
    {
        public static void TryAdd(this List<Claim> list, Claim c)
        {
            if (!list.Any(x => x.Type == c.Type))
                list.Add(c);
        }
    }
}
