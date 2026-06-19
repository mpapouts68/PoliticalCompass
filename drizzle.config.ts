import { defineConfig } from "drizzle-kit";
import fs from "fs";
import path from "path";

const dbPath = process.env.DATABASE_URL?.replace(/^file:/, "") ?? "./data/political-compass.db";
fs.mkdirSync(path.dirname(path.resolve(dbPath)), { recursive: true });

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: dbPath,
  },
});
