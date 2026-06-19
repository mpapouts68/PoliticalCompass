import type Database from "better-sqlite3";

function columnExists(db: Database.Database, table: string, column: string): boolean {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  return columns.some((c) => c.name === column);
}

export function ensureProfileSchema(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS anonymous_profiles (
      id TEXT PRIMARY KEY NOT NULL,
      nickname TEXT,
      created_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS quiz_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      profile_id TEXT NOT NULL,
      session_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      accuracy REAL NOT NULL,
      difficulty INTEGER NOT NULL,
      duration_seconds INTEGER,
      show_on_leaderboard INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER
    );
  `);

  if (!columnExists(db, "survey_results", "profile_id")) {
    db.exec(`ALTER TABLE survey_results ADD COLUMN profile_id TEXT`);
  }
  if (!columnExists(db, "ideology_results", "profile_id")) {
    db.exec(`ALTER TABLE ideology_results ADD COLUMN profile_id TEXT`);
  }
}
