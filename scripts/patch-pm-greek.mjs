import Database from "better-sqlite3";

const db = new Database("data/political-compass.db");

const r1 = db
  .prepare(
    `UPDATE pm_scenarios SET description = ?
     WHERE description LIKE '%tech πιλοτικά%'`
  )
  .run(
    "Εταιρείες τεχνολογίας πιλοτικά εισάγουν 4ήμερη εβδομάδα. Συνδικάτα ζητούν νομοθεσία."
  );

const r2 = db
  .prepare(
    `UPDATE pm_scenarios SET context = REPLACE(context, 'social media', 'μέσα κοινωνικής δικτύωσης')
     WHERE context LIKE '%social media%'`
  )
  .run();

console.log("PM updates:", r1.changes, r2.changes);

const mixed = db
  .prepare(
    `SELECT count(*) as c FROM ideology_questions
     WHERE text GLOB '*[A-Za-z]*'
       AND (text LIKE '%α%' OR text LIKE '%Α%')`
  )
  .get();
console.log("Remaining mixed ideology questions:", mixed.c);
