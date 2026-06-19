import { eq } from "drizzle-orm";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { questions } from "@shared/schema";
import { db } from "../db";
import greekTextFixes from "./data/greekTextFixes.json";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixes = greekTextFixes as Record<string, string>;

export async function patchGreekQuestionText(): Promise<void> {
  let updated = 0;

  for (const [oldText, newText] of Object.entries(fixes)) {
    await db.update(questions).set({ text: newText }).where(eq(questions.text, oldText));
    updated++;
  }

  console.log(`Patched ${updated} Greek survey question texts.`);
}

function patchJsonFile(relativePath: string): void {
  const filePath = path.join(__dirname, relativePath);
  let content = readFileSync(filePath, "utf-8");
  let fileUpdates = 0;

  for (const [oldText, newText] of Object.entries(fixes)) {
    if (content.includes(oldText)) {
      content = content.split(oldText).join(newText);
      fileUpdates++;
    }
  }

  if (fileUpdates > 0) {
    writeFileSync(filePath, content, "utf-8");
    console.log(`Updated ${fileUpdates} entries in ${relativePath}`);
  }
}

function patchSeedFiles(): void {
  patchJsonFile("data/surveyQuestions.json");
  patchJsonFile("data/programQuestions.json");
  patchJsonFile("data/surveyTranslationsExtra.json");
  patchJsonFile("data/missingTranslations.json");
}

if (process.argv[1]?.includes("patchGreekQuestionText")) {
  patchSeedFiles();
  patchGreekQuestionText()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Patch failed:", error);
      process.exit(1);
    });
}
