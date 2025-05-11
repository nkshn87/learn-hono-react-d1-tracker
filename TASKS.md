# タスク管理表

## ✅ 完了済み

- [x] Gitリポジトリ作成 & 初期Push
- [x] Vite + React + Tailwind + shadcn/ui + Biome構築
- [x] Cloudflare Pagesデプロイ
- [x] API（Hono）雛形作成
- [x] Drizzle関連の依存・設定ファイル・コードを削除
- [x] DBスキーマ型定義ファイルの作成（TypeScript）
- [x] Kysely本体・MySQLドライバのインストール
- [x] DB接続ユーティリティの作成
- [x] サンプルテーブル（tasks, projects等）の型定義
- [x] サンプルクエリ（select, insert, update, leftJoin, hasMany等）の実装
- [x] マイグレーションツール（dbmate等）の導入・セットアップ
- [x] README/ガイドの更新
- [x] メモリ上でのタスク管理CRUD実装

## 🟢 進行中

- [ ] TASK-001: 型共有・Hono RPC導入（[詳細](../tasks/TASK-001-hono-rpc.md)）
    - [x] 型共有用パッケージ（packages/types）新設
    - [x] 共通型（Task, Project, APIレスポンス型など）の定義
    - [ ] Hono RPCの依存追加・セットアップ
    - [ ] サンプルRPCエンドポイントの実装
    - [ ] 型共有・RPCの動作確認
    - [ ] ドキュメント/ガイドの更新

## ⏳ 今後の予定

- [ ] TASK-002: DB接続・実装（[詳細](../tasks/TASK-002-db-implementation.md)）
    - [ ] 環境変数設定（.env）
    - [ ] マイグレーション実行
    - [ ] タスク管理のDB実装
    - [ ] 動作確認・テスト
    - [ ] ドキュメント/ガイドの更新

- [ ] TanStack QueryによるAPI通信
- [ ] UI/UX拡張（shadcn/ui, Toaster, Dialog等）
- [ ] Cloudflare D1マイグレーション・本番デプロイ 