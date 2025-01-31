using holoduler.Server.Models;

namespace holoduler.Server.Services
{
    public interface IHoloduleService
    {
        Task<Token?> GetTokenAsync();
        Task<string?> GetSchedulesAsync(string? sdate, string? edate, string? code, string? group, string? keyword, Token token);
    }
}
