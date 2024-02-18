using holoduler.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// 環境変数から取得
var userName = Environment.GetEnvironmentVariable("API_USERNAME")!;
var password = Environment.GetEnvironmentVariable("API_PASSWORD")!;
var endpoint = Environment.GetEnvironmentVariable("API_ENDPOINT")!;

// サービスコンテナへ登録
builder.Services.AddTransient<IDataService>(_ => new DataService(userName, password, endpoint));
// コントローラーを使用
builder.Services.AddControllers();
// Swaggerを生成
builder.Services.AddSwaggerGen();
// CORS を追加
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAll",
        builder =>
        {
            // すべてのオリジンからのアクセスを許可
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// アプリケーションを構築
var app = builder.Build();

// 開発モードの場合 Swagger を使用
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS を許可
app.UseCors("AllowAll");
// デフォルトファイルを使用
app.UseDefaultFiles();
// 静的ファイルを使用
app.UseStaticFiles();
// HTTP 要求を HTTPS へリダイレクト
app.UseHttpsRedirection();
// 認証を使用
app.UseAuthorization();
// コントローラーを使用
app.MapControllers();
// フォールバックファイルを使用
app.MapFallbackToFile("/index.html");
// アプリケーションを実行
app.Run();
