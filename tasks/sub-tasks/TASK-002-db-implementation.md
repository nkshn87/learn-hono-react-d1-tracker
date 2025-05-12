# TASK-002: DB接続・実装

このファイルは`TASKS.md`の「TASK-002: DB接続・実装」の詳細タスク・進捗を記録します。

## サブタスク
- [x] MySQLコンテナの用意・起動（docker-compose.yml作成、永続化・ポート設定）
- [x] .envのDB接続情報をDocker用に調整
- [x] MySQLコンテナの起動・初期化確認
- [x] Kysely＋MySQLの接続テスト（Dockerコンテナに接続）
- [ ] マイグレーション実行（dbmate up等）
- [ ] テーブル作成確認
- [ ] タスク管理のDB実装（GET/POST/PUT/DELETE順に対応）
- [ ] エラーハンドリング・テスト
- [ ] ドキュメント/ガイドの更新

## メモ・進捗
- DB接続設定ファイル（`apps/api/src/db/index.ts`）は作成済み
- マイグレーションファイル（`apps/api/db/migrations/20240320000000_create_tasks_table.sql`）も作成済み
- 次はMySQLコンテナの用意・起動から着手 