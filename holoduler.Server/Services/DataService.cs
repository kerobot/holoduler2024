namespace holoduler.Server.Services
{
    /// <summary>
    /// Web API で利用する設定情報を扱う、サービスコンテナへ登録するサービスクラス
    /// </summary>
    public class DataService : IDataService
    {
        private readonly string _userName;
        private readonly string _password;
        private readonly string _endpoint;

        public DataService(string userName, string password, string endpoint)
        {
            _userName = userName;
            _password = password;
            _endpoint = endpoint;
        }

        public string UserName => _userName;
        public string Password => _password;
        public string Endpoint => _endpoint;
    }
}
