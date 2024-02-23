# ホロジューラ― 2024

ホロコレクトで MongoDB に収集したホロライブの配信情報をホロサービス経由で取得し表示する React/TypeScript Webアプリケーションです。

## 開発環境

* Windows 11 23H2
* PowerShell 7.4.1
* Visual Studio 2022 17.8.7
* Node 20.11.0 + npm 10.2.4
* React 18.2.0 + React Router 6.22.0
* Chakra UI/React 2.8.2 + Chakra UI/Icons 2.1.1
* TypeScript 5.2.2
* ホロコレクト（[ホロジュール収集プログラム（Python）のアップデート](https://qiita.com/kerobot/items/c1944dc29d6de542ad86)）
* ホロサービス（[ホロジュール収集バックエンド API の FastAPI 化](https://qiita.com/kerobot/items/28b109c8c5736a692b95)）

## Node.js と npm の確認

```powershell
> node --version
v20.11.0
> npm --version
10.2.4
```

## 環境変数

ホロサービスへの接続情報を環境変数として設定しておく必要があります。

* API_ENDPOINT
* API_USERNAME
* API_PASSWORD

## デバッグ実行

Visual Studio 2022 でソリューションを開き、デバッグ実行を行います。

下記を参考にしてください。

[チュートリアル: Visual Studio での React を使用した ASP.NET Core アプリの作成](https://learn.microsoft.com/ja-jp/visualstudio/javascript/tutorial-asp-net-core-with-react?view=vs-2022)
