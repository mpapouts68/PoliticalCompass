import Database from "better-sqlite3";

const db = new Database("data/political-compass.db");

const rows = db
  .prepare(
    `SELECT id, text FROM ideology_questions
     WHERE text GLOB '*[A-Za-z]*'
       AND (text LIKE '%α%' OR text LIKE '%Α%' OR text LIKE '%ο%' OR text LIKE '%Ο%')`
  )
  .all();

console.log("Mixed questions:", rows.length);
for (const r of rows) {
  console.log(`[${r.id}] ${r.text}`);
}
