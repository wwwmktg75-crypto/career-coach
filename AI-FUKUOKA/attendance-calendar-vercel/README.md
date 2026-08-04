# AI SUMMER SCHOOL 2026 出席カレンダー for Vercel

Vercel へ載せるフロントエンド一式です。データ保存と集計は Google Apps Script 側をそのまま使い、Vercel からは `/api/gas` 経由で呼び出します。

## 構成

- `index.html`: 画面本体
- `styles.css`: スタイル
- `app.js`: フロントエンドロジック
- `api/gas.js`: Vercel Serverless Function。GAS の Web アプリをプロキシ
- `vercel.json`: Vercel 設定

## 先にやること

1. `attendance-calendar-gas/Code.gs` を Apps Script に配置
2. Web アプリとしてデプロイ
3. デプロイURLを控える

GAS 側は `doGet(e)` / `doPost(e)` で `?api=1&action=...` を受けるようにしてあります。

## Vercel で必要な環境変数

- `GAS_WEB_APP_URL`
  - 今回の値: `https://script.google.com/macros/s/AKfycbxiFoY38xSpiODtC8ZK5d8KGdOVIKVekG_gNoOAHRXIX2G4gTV9JZYK6DYtdjWzID3X/exec`

## デプロイ方法

1. この `attendance-calendar-vercel` フォルダを Vercel にアップロード
2. Project Settings > Environment Variables で `GAS_WEB_APP_URL` を設定
3. 再デプロイ

ローカル確認用に `.env.example` も追加してあります。

## 注意

- ブラウザから GAS を直接叩かず、Vercel の `/api/gas` を挟んでいます
  - GAS の CORS 制約を避けるためです
- 参加者データが空のときは `参加者が未登録です` と表示されます
- `参加者` シートには少なくとも `参加者ID`, `名前`, `利用状態=有効` が必要です
