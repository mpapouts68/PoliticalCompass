import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "../db";
import { pmDecisions, pmPolicyOptions, pmScenarios } from "@shared/schema";
import type { PmScenarioBundle } from "./pmHelpers";
import flatScenariosData from "./data/pmScenarios.json";
import flatOptionsData from "./data/pmOptions.json";
import extraBundlesData from "./data/extraPmScenarios.json";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");

type FlatScenario = {
  sourceId: number;
  title: string;
  titleEn: string | null;
  description: string;
  descriptionEn: string | null;
  context: string;
  contextEn: string | null;
  category: string;
  difficulty: number;
  timePressure: number;
};

type FlatOption = {
  scenarioId: number;
  optionText: string;
  optionTextEn: string | null;
  politicalCost: number;
  economicImpact: number;
  socialImpact: number;
  partyAlignment: string;
  consequences: string;
  consequencesEn: string | null;
};

function loadJsonFromDisk<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
}

function dedupeOptions(options: FlatOption[]): FlatOption[] {
  const seen = new Set<string>();
  const result: FlatOption[] = [];
  for (const option of options) {
    const key = `${option.scenarioId}::${option.optionText}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(option);
  }
  return result;
}

export async function refreshPmData(): Promise<void> {
  const flatScenarios = (
    (flatScenariosData as FlatScenario[]).length
      ? flatScenariosData
      : loadJsonFromDisk<FlatScenario[]>("pmScenarios.json")
  ) as FlatScenario[];
  const flatOptions = (
    (flatOptionsData as FlatOption[]).length
      ? flatOptionsData
      : loadJsonFromDisk<FlatOption[]>("pmOptions.json")
  ) as FlatOption[];
  const extraBundles = (
    (extraBundlesData as PmScenarioBundle[]).length
      ? extraBundlesData
      : loadJsonFromDisk<PmScenarioBundle[]>("extraPmScenarios.json")
  ) as PmScenarioBundle[];

  const scenarioByTitle = new Map<string, FlatScenario & { options: FlatOption[] }>();

  for (const scenario of flatScenarios) {
    if (scenarioByTitle.has(scenario.title)) continue;
    scenarioByTitle.set(scenario.title, { ...scenario, options: [] });
  }

  for (const bundle of extraBundles) {
    if (scenarioByTitle.has(bundle.title)) continue;
    const { options, sourceId, ...fields } = bundle;
    scenarioByTitle.set(bundle.title, {
      sourceId,
      ...fields,
      options: options.map((option) => ({
        scenarioId: sourceId,
        ...option,
      })),
    });
  }

  const optionsBySourceId = new Map<number, FlatOption[]>();
  for (const option of dedupeOptions(flatOptions)) {
    const list = optionsBySourceId.get(option.scenarioId) ?? [];
    list.push(option);
    optionsBySourceId.set(option.scenarioId, list);
  }

  for (const scenario of scenarioByTitle.values()) {
    if (scenario.options.length > 0) continue;
    const parsed = optionsBySourceId.get(scenario.sourceId) ?? [];
    scenario.options = parsed.slice(0, 3);
  }

  const validScenarios = [...scenarioByTitle.values()].filter(
    (scenario) => scenario.options.length >= 3,
  );

  await db.delete(pmDecisions);
  await db.delete(pmPolicyOptions);
  await db.delete(pmScenarios);

  let optionCount = 0;
  for (const scenario of validScenarios) {
    const { sourceId, options, ...values } = scenario;
    const [inserted] = await db.insert(pmScenarios).values(values).returning();
    const optionRows = options.slice(0, 3).map((option) => ({
      scenarioId: inserted.id,
      optionText: option.optionText,
      optionTextEn: option.optionTextEn,
      politicalCost: option.politicalCost,
      economicImpact: option.economicImpact,
      socialImpact: option.socialImpact,
      partyAlignment: option.partyAlignment,
      consequences: option.consequences,
      consequencesEn: option.consequencesEn,
    }));
    await db.insert(pmPolicyOptions).values(optionRows);
    optionCount += optionRows.length;
  }

  console.log(`Refreshed PM data: ${validScenarios.length} scenarios, ${optionCount} options.`);
}

if (process.argv[1]?.includes("refreshPm")) {
  refreshPmData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("PM refresh failed:", error);
      process.exit(1);
    });
}
