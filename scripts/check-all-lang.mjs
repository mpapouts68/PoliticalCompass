import Database from "better-sqlite3";

const db = new Database("data/political-compass.db");

const rows = db
  .prepare(
    `SELECT id, question FROM quiz_questions
     WHERE question GLOB '*[A-Za-z]*'
       AND (question LIKE '%α%' OR question LIKE '%Α%')`
  )
  .all();

console.log("Quiz mixed:", rows.length);
for (const r of rows.slice(0, 30)) {
  console.log(`[${r.id}] ${r.question.substring(0, 120)}`);
}

const pm = db
  .prepare(
    `SELECT id, substr(description,1,120) as d FROM pm_scenarios
     WHERE description GLOB '*[A-Za-z]*'
       AND (description LIKE '%α%' OR description LIKE '%Α%')`
  )
  .all();
console.log("\nPM mixed:", pm.length);
for (const r of pm.slice(0, 15)) {
  console.log(`[${r.id}] ${r.d}`);
}
