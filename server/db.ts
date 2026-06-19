import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import fs from "fs";
import path from "path";
import * as schema from "@shared/schema";
import { ensureProfileSchema } from "./ensureProfileSchema";

function resolveDbPath(): string {
  const url = process.env.DATABASE_URL;
  if (url?.startsWith("file:")) {
    return path.resolve(url.slice("file:".length));
  }
  if (url && !url.includes("://")) {
    return path.resolve(url);
  }
  return path.resolve("data", "political-compass.db");
}

export const dbPath = resolveDbPath();

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });

ensureProfileSchema(sqlite);

export function runMigrations(): void {
  const migrationsFolder = path.resolve("migrations");
  if (fs.existsSync(migrationsFolder)) {
    migrate(db, { migrationsFolder });
  }
}
