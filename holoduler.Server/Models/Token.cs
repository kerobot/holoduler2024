using Newtonsoft.Json;

namespace holoduler.Server.Models
{
    /// <summary>
    /// Web API から返却されるアクセストークンを保持するクラス
    /// </summary>
    [JsonObject]
    public class Token
    {
        [JsonProperty("access_token")]
        public string? AccessToken { get; private set; }

        [JsonProperty("token_type")]
        public string? TokenType { get; private set; }

        public Token()
        {
        }
    }
}
