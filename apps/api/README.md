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