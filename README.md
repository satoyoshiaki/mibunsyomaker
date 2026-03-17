# Fiction Card Maker — フィクションカードジェネレーター

> **⚠️ 注意**: このアプリは創作・エンタメ専用のフィクションカードジェネレーターです。
> 生成されたカードは**本物の身分証明書ではありません**。公式書類として使用・提示・偽造に用いることは絶対にしないでください。
> **NOT AN OFFICIAL ID · FOR ENTERTAINMENT ONLY · SAMPLE**

---

## 概要

キャラクター画像と設定情報を入力すると、創作・エンタメ向けの「フィクションカード」を生成・ダウンロードできるWebアプリです。

- 実在の身分証明書を模倣しない完全オリジナルデザイン
- 透かし・警告表示を常時表示（除去不可）
- 画像はサーバー保存なし（クライアント完結）

## 機能

| 機能 | 内容 |
|------|------|
| 画像アップロード | PNG/JPG/WEBP ドラッグ&ドロップ対応 (最大5MB) |
| 顔画像トリミング | ズーム・位置調整、丸型/角丸/四角フレーム選択 |
| テンプレート3種 | Neon License / Civic Profile / Travel Archive Pass |
| リアルタイムプレビュー | フォーム入力が即時反映 |
| PNG出力 | 高解像度 (3x) エクスポート、ダウンロード前注意表示 |
| ダークモード | ライト/ダーク切替対応 |
| レスポンシブ | PC 左右2カラム、モバイル縦積み |

## テンプレート

| テンプレート名 | 雰囲気 |
|---|---|
| Neon License | サイバーパンク・ネオン配色 |
| Civic Profile | クリーン・フォーマル |
| Travel Archive Pass | ヴィンテージ・旅行者風 |

## セットアップ

**必要環境:** Node.js 18.17.0+, pnpm

```bash
# 依存関係インストール
pnpm install

# 開発サーバー起動
pnpm dev
```

ブラウザで http://localhost:3000 を開きます。

## コマンド

```bash
pnpm dev        # 開発サーバー
pnpm build      # 本番ビルド
pnpm start      # 本番サーバー起動
pnpm lint       # ESLint チェック
pnpm typecheck  # TypeScript 型チェック
```

## ディレクトリ構成

```
app/                    # Next.js App Router
components/
  card-templates/       # カードテンプレート (NeonLicense, CivicProfile, TravelPass)
  ui/                   # 基本UIコンポーネント (Button, Input, Dialog等)
  CardEditor.tsx        # メインエディタレイアウト
  CardForm.tsx          # 入力フォーム
  CardPreview.tsx       # プレビュー表示
  ExportButton.tsx      # PNGエクスポート
  ImageUploader.tsx     # 画像アップロード
  CropDialog.tsx        # トリミングダイアログ
  SafetyNotice.tsx      # 安全上の注意表示
  ThemeToggle.tsx       # ダークモード切替
lib/
  utils.ts              # ユーティリティ関数
  schema.ts             # Zod バリデーションスキーマ
  getCroppedImg.ts      # Canvas ベース画像クロップ
types/
  card.ts               # カードデータ型定義
```

## 安全要件（設計方針）

- 実在する免許証・マイナンバーカード・パスポート等のレイアウトを複製しない
- 実在の国名・官公庁名・ロゴ・正式書式を使用しない
- 本物らしく見える番号体系を使わない
- MRZ・バーコード・QRコード等の本人確認要素を入れない
- カード上に常時 "FAN CARD / SAMPLE / NOT AN OFFICIAL ID / FOR ENTERTAINMENT ONLY" を表示
- 透かし・警告表示はエクスポート後も削除不可

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **react-hook-form + zod** (フォームバリデーション)
- **react-dropzone** (ドラッグ&ドロップ)
- **react-easy-crop** (画像トリミング)
- **html-to-image** (PNGエクスポート)
- **next-themes** (ダークモード)
- **lucide-react** (アイコン)
- **Radix UI** (アクセシブルなUIプリミティブ)
