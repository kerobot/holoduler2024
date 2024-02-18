﻿using holoduler.Server.Models;
using holoduler.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;

namespace holoduler.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HolodulesController : ControllerBase
    {
        private readonly IDataService _dataService;
        private readonly ILogger<HolodulesController> _logger;

        public HolodulesController(ILogger<HolodulesController> logger, IDataService dataService)
        {
            _logger = logger;
            _dataService = dataService;
        }

        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] string? sdate, [FromQuery] string? edate, [FromQuery] string? code, [FromQuery] string? group)
        {
#if DEBUG
            var endpoint = "http://127.0.0.1:8001";
#else
            var endpoint = _dataService.Endpoint;
#endif
            _logger.LogInformation("endpoint:{endpoint}", endpoint);

            var tokenpath = "/token";
            var schedulespath = "/schedules";
            var client = new RestClient(endpoint);

            // トークンの取得
            _logger.LogInformation("request access token.");

            var postRequest = new RestRequest(tokenpath);
            postRequest.AddParameter("username", _dataService.UserName, ParameterType.GetOrPost);
            postRequest.AddParameter("password", _dataService.Password, ParameterType.GetOrPost);

            var postResponse = await client.PostAsync(postRequest);
            if (!postResponse.IsSuccessful || postResponse.Content == null)
            {
                return BadRequest(error: "Login error.");
            }

            Token? token = JsonConvert.DeserializeObject<Token>(postResponse.Content);
            if (token == null)
            {
                return BadRequest(error: "Token error.");
            }

            // スケジュールの取得
            _logger.LogInformation("request holodules sdate:{sdate} edate:{edate} code:{code} group:{group}.", sdate, edate, code, group);

            var getRequest = new RestRequest(schedulespath);
            getRequest.AddHeader("Content-Type", "application/json");
            getRequest.AddHeader("Authorization", $"{token.TokenType} {token.AccessToken}");
            if (!string.IsNullOrEmpty(sdate))
            {
                getRequest.AddParameter("sdate", sdate, ParameterType.GetOrPost);
            }
            if (!string.IsNullOrEmpty(edate))
            {
                getRequest.AddParameter("edate", edate, ParameterType.GetOrPost);
            }
            if (!string.IsNullOrEmpty(code))
            {
                getRequest.AddParameter("code", code, ParameterType.GetOrPost);
            }
            if (!string.IsNullOrEmpty(group))
            {
                getRequest.AddParameter("group", group, ParameterType.GetOrPost);
            }

            var getResponse = await client.GetAsync(getRequest);
            if (!getResponse.IsSuccessful || getResponse.Content == null)
            {
                return BadRequest(error: "Holodules error.");
            }

            // RestResponseをJSONとして返却
            return Content(getResponse.Content, "application/json");
        }
    }
}
