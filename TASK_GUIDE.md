# タスク進め方ガイド

## 1. タスク管理
- タスクは細かく分割し、`TASKS.md`で進捗を管理します。
- 各タスクの完了後、必ず`TASKS.md`を更新し、進捗を反映させます。

## 2. コミット方針
- キリの良い単位で必ずコミット＆プッシュします。
- コミットメッセージは具体的に記述し、変更内容を明確にします。

## 3. 技術スタック
- **フロントエンド**: Vite + React + Tailwind v4 + shadcn/ui + Biome
- **バックエンド**: Hono + TypeScript
- **データベース**: Drizzle + Cloudflare D1
- **その他**: TanStack Query, Hono RPC

## 4. 開発環境
- モノレポ構成（pnpm workspaces）で開発します。
- 依存関係はルートの`package.json`に必要なものを追加します。
- `pnpm`のバージョンはCloudflare Pagesのビルド環境に合わせて固定します。

## 5. デプロイ
- Cloudflare Pagesにデプロイします。
- ビルドコマンドは`pnpm build`（ルートのscriptsで`pnpm --filter web... build`）に統一します。

## 6. APIサーバー
- Hono v4 + TypeScriptでAPIを実装します。
- `/health`エンドポイントで動作確認を行います。

## 7. その他
- 各パッケージで依存を完結させることは現状難しいため、ルートに必要な依存を追加します。
- トラブルシュートは都度対応し、`TASKS.md`に記録します。 