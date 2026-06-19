import Database from "better-sqlite3";

const db = new Database("data/political-compass.db");

const total = db.prepare("SELECT count(*) as c FROM ideology_questions").get();
console.log("Total:", total);

const cats = db.prepare("SELECT DISTINCT category FROM ideology_questions ORDER BY category").all();
console.log("\nCategories:", cats.map((r) => r.category));

const noEn = db.prepare(
  "SELECT count(*) as c FROM ideology_questions WHERE text_en IS NULL OR text_en = ''"
).get();
console.log("\nMissing textEn:", noEn.c);

const enOnly = db
  .prepare(
    `SELECT id, substr(text, 1, 120) as text, category
     FROM ideology_questions
     WHERE text GLOB '*[A-Za-z]*'
       AND text NOT LIKE '%α%' AND text NOT LIKE '%β%' AND text NOT LIKE '%γ%'
       AND text NOT LIKE '%δ%' AND text NOT LIKE '%ε%' AND text NOT LIKE '%ζ%'
       AND text NOT LIKE '%η%' AND text NOT LIKE '%θ%' AND text NOT LIKE '%ι%'
       AND text NOT LIKE '%κ%' AND text NOT LIKE '%λ%' AND text NOT LIKE '%μ%'
       AND text NOT LIKE '%ν%' AND text NOT LIKE '%ξ%' AND text NOT LIKE '%ο%'
       AND text NOT LIKE '%π%' AND text NOT LIKE '%ρ%' AND text NOT LIKE '%σ%'
       AND text NOT LIKE '%τ%' AND text NOT LIKE '%υ%' AND text NOT LIKE '%φ%'
       AND text NOT LIKE '%χ%' AND text NOT LIKE '%ψ%' AND text NOT LIKE '%ω%'
       AND text NOT LIKE '%Α%' AND text NOT LIKE '%Β%' AND text NOT LIKE '%Γ%'
       AND text NOT LIKE '%Δ%' AND text NOT LIKE '%Ε%' AND text NOT LIKE '%Ζ%'
       AND text NOT LIKE '%Η%' AND text NOT LIKE '%Θ%' AND text NOT LIKE '%Ι%'
       AND text NOT LIKE '%Κ%' AND text NOT LIKE '%Λ%' AND text NOT LIKE '%Μ%'
       AND text NOT LIKE '%Ν%' AND text NOT LIKE '%Ξ%' AND text NOT LIKE '%Ο%'
       AND text NOT LIKE '%Π%' AND text NOT LIKE '%Ρ%' AND text NOT LIKE '%Σ%'
       AND text NOT LIKE '%Τ%' AND text NOT LIKE '%Υ%' AND text NOT LIKE '%Φ%'
       AND text NOT LIKE '%Χ%' AND text NOT LIKE '%Ψ%' AND text NOT LIKE '%Ω%'`
  )
  .all();
console.log("\nEnglish-only text:", enOnly.length);
for (const r of enOnly.slice(0, 15)) {
  console.log(`  [${r.id}] ${r.category}: ${r.text}`);
}

const mixed = db
  .prepare(
    `SELECT id, substr(text, 1, 120) as text, substr(text_en, 1, 80) as text_en, category
     FROM ideology_questions
     WHERE text GLOB '*[A-Za-z]*'
       AND (text LIKE '%α%' OR text LIKE '%Α%' OR text LIKE '%ο%' OR text LIKE '%Ο%')`
  )
  .all();
console.log("\nMixed Greek+Latin text:", mixed.length);
for (const r of mixed.slice(0, 15)) {
  console.log(`  [${r.id}] ${r.category}: ${r.text}`);
}
