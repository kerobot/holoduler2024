using holoduler.Server.Models;
using Newtonsoft.Json;
using RestSharp;

namespace holoduler.Server.Services
{
    public class HoloduleService(IDataService dataService, IRestClient client) : IHoloduleService
    {
        private readonly IDataService _dataService = dataService;
        private readonly IRestClient _client = client;

        public async Task<Token?> GetTokenAsync()
        {
            var tokenpath = "/token";
            var postRequest = new RestRequest(tokenpath);
            postRequest.AddParameter("username", _dataService.UserName, ParameterType.GetOrPost);
            postRequest.AddParameter("password", _dataService.Password, ParameterType.GetOrPost);

            var postResponse = await _client.PostAsync(postRequest);
            if (!postResponse.IsSuccessful || postResponse.Content == null)
            {
                return null;
            }

            return JsonConvert.DeserializeObject<Token>(postResponse.Content);
        }

        public async Task<string?> GetSchedulesAsync(string? sdate, string? edate, string? code, string? group, string? keyword, Token token)
        {
            var schedulespath = "/schedules";
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
            if (!string.IsNullOrEmpty(keyword))
            {
                getRequest.AddParameter("keyword", keyword, ParameterType.GetOrPost);
            }

            var getResponse = await _client.GetAsync(getRequest);
            if (!getResponse.IsSuccessful || getResponse.Content == null)
            {
                return null;
            }

            return getResponse.Content;
        }
    }
}
