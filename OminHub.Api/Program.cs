using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OminHub.Api.Middleware;
using OminHub.Api.Repositories.Auth;
using OminHub.Api.Repositories.Role;
using OminHub.Api.Repositories.System;
using OminHub.Api.Repositories.Users.Creator;
using OminHub.Api.Repositories.Users.Viewer;
using OminHub.Api.Services;
using OminHub.Core.Abstractions;
using OminHub.Core.Video;
using OminHub.Infrastructure.Repositories;
using System.Security.Cryptography;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://*:{port}");

// =========================================================
// CONFIG
// =========================================================
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

// =========================================================
// RATE LIMIT
// =========================================================
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(ctx =>
    {
        var ip = ctx.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        return RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: ip,
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 45,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            }
        );
    });
});

// =========================================================
// CUSTOM MIDDLEWARE
// =========================================================
builder.Services.AddSingleton<DeviceIdMiddleware>();

// =========================================================
// CORS
// =========================================================
builder.Services.AddCors(o =>
{
    o.AddPolicy("AllowAll", p =>
        p.WithOrigins(
            "http://localhost",
            "http://localhost:5000",
            "https://localhost:5001"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

// =========================================================
// MVC
// =========================================================
builder.Services.AddControllers();

// =========================================================
// SWAGGER
// =========================================================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    opt.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "OminHub API",
        Version = "v1"
    });

    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Escribe: Bearer {token}",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

// =========================================================
// REPOSITORIES & SERVICES
// =========================================================
var connString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddSingleton<JwtServiceRSA>();

builder.Services.AddScoped<IMultiPlatformRefreshTokenRepository>(x =>
    new MultiPlatformRefreshTokenRepository(
        connString!,
        x.GetRequiredService<JwtServiceRSA>()
    )
);

builder.Services.AddScoped<IUserRepository>(x =>
    new UserRepository(connString!)
);

builder.Services.AddScoped<ISystemRepository>(x =>
    new SystemRepository(connString!)
);

builder.Services.AddScoped<IRoleUpdateRepository>(x =>
    new RoleUpdateRepository(connString!)
);

builder.Services.AddScoped<ICollaboratorCatalogRepository>(x =>
    new CollaboratorCatalogRepository(connString!)
);

builder.Services.AddScoped<ICatalogRepository>( x => 
    new CatalogRepository(connString!)
);

builder.Services.AddScoped<ICreatorRepository>(x =>
    new CreatorRepository(connString!)
);

builder.Services.AddScoped<IVideoThumbnailRepository>(x =>
    new VideoThumbnailRepository(connString!)
);

builder.Services.AddScoped<IVideoProcessingRepository>(x =>
    new VideoProcessingRepository(connString!)
);
builder.Services.AddScoped<IViewerRepository>(x =>
    new ViewerRepository(connString!)
);

builder.Services.AddScoped<IVideoTranscodingService, VideoTranscodingService>();


builder.Services.AddHostedService<VideoProcessorWorker>();

// =========================================================
// REGISTER RSA KEY
// =========================================================
builder.Services.AddSingleton<RsaSecurityKey>(sp =>
{
    var jwt = sp.GetRequiredService<JwtServiceRSA>();
    return jwt.GetRsaSecurityKey();
});




// =========================================================
// AUTH
// =========================================================
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var sp = builder.Services.BuildServiceProvider();
        var jwt = sp.GetRequiredService<JwtServiceRSA>();
        var rsa = sp.GetRequiredService<RsaSecurityKey>();

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = jwt.ISSUER,

            ValidateAudience = true,
            ValidAudience = jwt.AUDIENCE,

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = rsa,

            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromSeconds(60)
        };
    });


builder.Services.AddAuthorization();

// =========================================================
// BUILD APP
// =========================================================
var app = builder.Build();

app.UseCors("AllowAll");

// =========================================================
// STATIC FILES (SERVE FRONTEND)
// =========================================================
app.UseDefaultFiles();
// Sirve archivos estáticos dentro de /wwwroot/pages/** 
var projectRoot = builder.Environment.ContentRootPath;

var uploadsRoot = Path.Combine(
    builder.Environment.ContentRootPath,
    "wwwroot",
    "users"
);

var uploadsTmp = Path.Combine(
    builder.Environment.ContentRootPath,
    "wwwroot",
    "tmp"
);

Directory.CreateDirectory(uploadsRoot);

Directory.CreateDirectory(uploadsTmp);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsRoot),
    RequestPath = "/uploads/users"
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsTmp),
    RequestPath = "/uploads/tmp"
});


app.UseStaticFiles();


// Ruta real para archivos estáticos dentro de wwwroot/pages
app.UseStaticFiles(new StaticFileOptions
{
    RequestPath = "/pages",
    FileProvider = new PhysicalFileProvider(
        Path.Combine(projectRoot, "wwwroot", "pages")
    )
});


// =========================================================
// SWAGGER (DEV)
// =========================================================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// =========================================================
// PIPELINE
// =========================================================
//app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseRateLimiter();

app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<DeviceIdMiddleware>();

app.MapControllers();

// Public endpoint for debugging keys
app.MapGet("/api/public-key", (JwtServiceRSA j) =>
    Results.Ok(new { publicKeyPem = j.GetPublicKeyPem() })
);

app.Run();
