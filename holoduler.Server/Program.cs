using holoduler.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// ���ϐ�����擾
var userName = Environment.GetEnvironmentVariable("API_USERNAME")!;
var password = Environment.GetEnvironmentVariable("API_PASSWORD")!;
var endpoint = Environment.GetEnvironmentVariable("API_ENDPOINT")!;

// �T�[�r�X�R���e�i�֓o�^
builder.Services.AddTransient<IDataService>(_ => new DataService(userName, password, endpoint));
// �R���g���[���[���g�p
builder.Services.AddControllers();
// Swagger�𐶐�
builder.Services.AddSwaggerGen();
// CORS ��ǉ�
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowAll",
        builder =>
        {
            // ���ׂẴI���W������̃A�N�Z�X������
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// �A�v���P�[�V�������\�z
var app = builder.Build();

// �J�����[�h�̏ꍇ Swagger ���g�p
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS ������
app.UseCors("AllowAll");
// �f�t�H���g�t�@�C�����g�p
app.UseDefaultFiles();
// �ÓI�t�@�C�����g�p
app.UseStaticFiles();
// HTTP �v���� HTTPS �փ��_�C���N�g
app.UseHttpsRedirection();
// �F�؂��g�p
app.UseAuthorization();
// �R���g���[���[���g�p
app.MapControllers();
// �t�H�[���o�b�N�t�@�C�����g�p
app.MapFallbackToFile("/index.html");
// �A�v���P�[�V���������s
app.Run();
