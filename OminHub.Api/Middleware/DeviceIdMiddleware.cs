using System.Security.Claims;

namespace OminHub.Api.Middleware
{
    public class DeviceIdMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext ctx, RequestDelegate next)
{
    var path = ctx.Request.Path.Value?.ToLower() ?? "";

    // ---- PERMITIR SWAGGER SIN DEVICE ID ----
    if (path.Contains("/swagger") || path.Contains("/swagger/index.html"))
    {
        await next(ctx);
        return;
    }

    // Permitir login/register/refresh sin device
    if (path.Contains("/api/auth/login") ||
        path.Contains("/api/auth/register") ||
        path.Contains("/api/auth/refresh"))
    {
        await next(ctx);
        return;
    }

    var device = ctx.Request.Headers["X-Device-ID"].ToString();
    if (string.IsNullOrWhiteSpace(device))
    {
        ctx.Response.StatusCode = StatusCodes.Status400BadRequest;
        await ctx.Response.WriteAsync("Falta X-Device-ID");
        return;
    }

    await next(ctx);
}
    }

}
