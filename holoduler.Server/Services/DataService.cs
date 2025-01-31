namespace holoduler.Server.Services
{
    /// <summary>
    /// Web API で利用する設定情報を扱う、サービスコンテナへ登録するサービスクラス
    /// </summary>
    public class DataService(string userName, string password, string endpoint) : IDataService
    {
        public string UserName { get; } = userName;
        public string Password { get; } = password;
        public string Endpoint { get; } = endpoint;
    }
}
