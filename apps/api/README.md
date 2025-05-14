# APIパッケージ（Kysely + MySQL + dbmate）

## セットアップ手順

### 1. 依存インストール
```sh
pnpm install
```

### 2. DBマイグレーション（dbmate）
- dbmateは[公式リリース](https://github.com/amacneil/dbmate/releases)やHomebrewでインストールしてください。
- マイグレーションファイルは`src/db/migrations/`配下に配置します。

```sh
# 例: .envファイルにDB接続情報を記載
export DATABASE_URL="mysql://user:password@localhost:3306/dbname"

# マイグレーション適用
cd apps/api
DATABASE_URL=... dbmate -d src/db/migrations up
```

### 3. KyselyによるDB操作
- `src/db/schema.ts`で型定義
- `src/db/index.ts`で接続ユーティリティ
- `src/db/sampleQueries.ts`にサンプルクエリあり

---

## ディレクトリ構成
```
apps/api/
  src/db/
    migrations/   # dbmate用マイグレーション
    schema.ts     # Kysely用型定義
    index.ts      # DB接続ユーティリティ
    sampleQueries.ts # サンプルクエリ
```

---

## 注意事項
- コミット・進捗管理は`TASK_GUIDE.md`/`TASKS.md`に従ってください。
- マイグレーションは必ずレビュー・テストの上で適用してください。 

## RPC (Hono RPC)

APIサーバー上で型安全なRPCエンドポイントを提供します。`src/index.ts`に以下の設定を追加済みです。

```ts
// src/index.ts
// RPC用にアプリの型をエクスポート
export type AppType = typeof app;

// サンプルRPCエンドポイント
app.post(
  "/rpc/hello",
  zValidator("json", z.object({ name: z.string() })),
  (c) => c.json({ greeting: `Hello, ${c.req.valid("json").name}` })
);
```

### クライアント利用例
クライアント側では`hono/client`を使って型安全にRPCを呼び出せます。

```ts
import { hc } from 'hono/client';
import type { AppType } from '../src/index'; // AppTypeをインポート

const client = hc<AppType>('http://localhost:4000');

async function hello() {
  const res = await client.rpc.hello.$post({ json: { name: 'World' } });
  if (res.ok) {
    const data = await res.json(); // { greeting: string }
    console.log(data.greeting);
  }
} 
```

## エンドポイント

| メソッド | パス               | 説明                         | レスポンス例                      |
|---------|------------------|-----------------------------|--------------------------------|
| GET     | /health          | サーバーの生存確認           | ok                             |
| GET     | /health/db       | DB 接続確認                  | DB connection OK               |
| GET     | /tasks           | タスク一覧取得               | { ok: true, tasks: Task[] }     |
| GET     | /tasks/:id       | タスク詳細取得               | { ok: true, task: Task }        |
| POST    | /tasks           | タスク新規作成 （JSON）       | { ok: true, task: Task }        |
| PUT     | /tasks/:id       | タスク更新（JSON）           | { ok: true, task: Task }        |
| DELETE  | /tasks/:id       | タスク削除                   | { ok: true, id: number }        |