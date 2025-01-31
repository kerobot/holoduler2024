using holoduler.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace holoduler.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoloduleController(ILogger<HoloduleController> logger, IHoloduleService holoduleService) : ControllerBase
    {
        private readonly IHoloduleService _holoduleService = holoduleService;
        private readonly ILogger<HoloduleController> _logger = logger;

        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] string? sdate, [FromQuery] string? edate, [FromQuery] string? code, [FromQuery] string? group, [FromQuery] string? keyword)
        {
            _logger.LogInformation("request holodules sdate:{sdate} edate:{edate} code:{code} group:{group} keyword:{keyword}.", sdate, edate, code, group, keyword);

            var token = await _holoduleService.GetTokenAsync();
            if (token == null)
            {
                return BadRequest("Login error.");
            }

            var schedules = await _holoduleService.GetSchedulesAsync(sdate, edate, code, group, keyword, token);
            if (schedules == null)
            {
                return BadRequest("Holodules error.");
            }

            return Content(schedules, "application/json");
        }
    }
}
