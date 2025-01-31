using Newtonsoft.Json;

namespace holoduler.Server.Models
{
    /// <summary>
    /// Web API に渡す認証情報を保持するクラス
    /// </summary>
    [JsonObject]
    public class Auth(string username, string password)
    {
        [JsonProperty("username")]
        public string Username { get; private set; } = username;

        [JsonProperty("password")]
        public string Password { get; private set; } = password;
    }
}
