import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";
import type { Database } from "./types";

const dialect = new MysqlDialect({
	pool: createPool({
		host: process.env.DB_HOST || "localhost",
		port: Number(process.env.DB_PORT) || 3306,
		user: process.env.DB_USER || "root",
		password: process.env.DB_PASSWORD || "",
		database: process.env.DB_NAME || "task_tracker",
	}),
});

export const db = new Kysely<Database>({
	dialect,
});

// 型エクスポート
export * from "./types";
 