import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import * as schema from "@shared/schema";
import { ensureProfileSchema } from "./ensureProfileSchema";

/** Repo root: /app in production (dist/index.js → parent is /app). */
const APP_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function resolveDbPath(): string {
  const url = process.env.DATABASE_URL;
  if (url?.startsWith("file:")) {
    let raw = url.slice("file:".length);
    if (raw.startsWith("//")) raw = raw.slice(2);
    if (path.isAbsolute(raw)) return raw;
    return path.join(APP_ROOT, raw);
  }
  if (url && !url.includes("://")) {
    return path.isAbsolute(url) ? url : path.join(APP_ROOT, url);
  }
  return path.join(APP_ROOT, "data", "political-compass.db");
}

function openDatabase(preferredPath: string): { db: Database; path: string } {
  const candidates = [
    preferredPath,
    path.join("/tmp", "political-compass.db"),
    path.join(os.tmpdir(), "political-compass.db"),
  ];

  const seen = new Set<string>();
  for (const candidate of candidates) {
    if (seen.has(candidate)) continue;
    seen.add(candidate);

    try {
      fs.mkdirSync(path.dirname(candidate), { recursive: true });
      const db = new Database(candidate);
      if (candidate !== preferredPath) {
        console.warn(`[db] Using fallback path: ${candidate} (preferred: ${preferredPath})`);
      } else {
        console.log(`[db] SQLite database: ${candidate}`);
      }
      return { db, path: candidate };
    } catch (error) {
      console.warn(`[db] Could not open ${candidate}:`, error);
    }
  }

  throw new Error("Unable to open SQLite database in any writable location");
}

const preferredPath = resolveDbPath();
const opened = openDatabase(preferredPath);

export const dbPath = opened.path;
export const isVolatileStorage =
  dbPath.includes(`${path.sep}tmp${path.sep}`) ||
  dbPath.startsWith("/tmp/") ||
  dbPath.startsWith(os.tmpdir());
export const sqlite = opened.db;
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });

export function runMigrations(): void {
  const migrationsFolder = path.resolve(APP_ROOT, "migrations");
  if (fs.existsSync(migrationsFolder)) {
    migrate(db, { migrationsFolder });
  }
}

runMigrations();
ensureProfileSchema(sqlite);
