export type QuizQuestionSeed = {
  question: string;
  questionEn: string | null;
  correctAnswer: string;
  wrongAnswers: string[];
  explanation: string;
  explanationEn: string | null;
  category: string;
  difficulty: number;
  era: string | null;
};

export function normalizeWrongAnswers(raw: unknown, correctAnswer: string): string[] {
  let answers: string[] = [];

  if (Array.isArray(raw)) {
    answers = raw.map(String);
  } else if (typeof raw === "string") {
    const trimmed = raw.trim();
    const arrayMatch = trimmed.match(/^ARRAY\[(.*)\]$/is);
    if (arrayMatch) {
      answers = arrayMatch[1]
        .split(",")
        .map((item) => item.trim().replace(/^'/, "").replace(/'$/, "").replace(/''/g, "'"))
        .filter(Boolean);
    } else if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
      try {
        const parsed = JSON.parse(trimmed.replace(/^\{/, "[").replace(/\}$/, "]"));
        answers = Array.isArray(parsed) ? parsed.map(String) : [trimmed];
      } catch {
        answers = [trimmed];
      }
    } else {
      answers = [trimmed];
    }
  }

  return [...new Set(
    answers
      .map((answer) => answer.replace(/^ARRAY\[/i, "").replace(/\]$/, "").trim())
      .filter((answer) => answer && answer !== "undefined" && answer !== correctAnswer),
  )].slice(0, 3);
}

export function normalizeQuizQuestion(raw: Record<string, unknown>): QuizQuestionSeed | null {
  const question = String(raw.question ?? "").trim();
  const correctAnswer = String(raw.correctAnswer ?? "").trim();
  const wrongAnswers = normalizeWrongAnswers(raw.wrongAnswers, correctAnswer);
  const explanation = String(raw.explanation ?? "").trim();
  const category = String(raw.category ?? "").trim();

  if (!question || question.length < 10) return null;
  if (!correctAnswer || correctAnswer === "undefined") return null;
  if (!explanation || explanation === "undefined" || explanation.length < 15) return null;
  if (wrongAnswers.length < 3) return null;
  if (category === "undefined" || !category) return null;
  if (question.match(/^\d{4}-\d{4}$/)) return null;

  const questionEn = raw.questionEn ? String(raw.questionEn).trim() : null;
  const explanationEn = raw.explanationEn ? String(raw.explanationEn).trim() : null;

  return {
    question,
    questionEn: questionEn && questionEn !== "null" ? questionEn : null,
    correctAnswer,
    wrongAnswers,
    explanation,
    explanationEn: explanationEn && explanationEn !== "null" ? explanationEn : null,
    category,
    difficulty: Math.min(3, Math.max(1, Number(raw.difficulty) || 1)),
    era: raw.era ? String(raw.era).trim() : null,
  };
}

export function dedupeQuizQuestions(questions: QuizQuestionSeed[]): QuizQuestionSeed[] {
  const seen = new Set<string>();
  const result: QuizQuestionSeed[] = [];

  for (const question of questions) {
    const normalized = normalizeQuizQuestion(question as unknown as Record<string, unknown>);
    if (!normalized || seen.has(normalized.question)) continue;
    seen.add(normalized.question);
    result.push(normalized);
  }

  return result;
}
