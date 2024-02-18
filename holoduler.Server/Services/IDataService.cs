namespace holoduler.Server.Services
{
    /// <summary>
    /// Web API で利用する設定情報を扱う、サービスコンテナへ登録するサービスのインターフェース
    /// </summary>
    public interface IDataService
    {
        string UserName { get; }
        string Password { get; }
        string Endpoint { get; }
    }
}
