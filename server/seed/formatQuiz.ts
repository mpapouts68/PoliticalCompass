import { normalizeWrongAnswers, type QuizQuestionSeed } from "./normalizeQuiz";

export function formatQuizQuestionForClient(question: {
  id: number;
  question: string;
  questionEn: string | null;
  correctAnswer: string;
  wrongAnswers: unknown;
  explanation: string;
  explanationEn: string | null;
  category: string;
  difficulty: number;
  era: string | null;
}): QuizQuestionSeed & { id: number } {
  const wrongAnswers = normalizeWrongAnswers(question.wrongAnswers, question.correctAnswer);
  return {
    id: question.id,
    question: question.question,
    questionEn: question.questionEn,
    correctAnswer: question.correctAnswer,
    wrongAnswers: wrongAnswers.length >= 3 ? wrongAnswers : wrongAnswers.concat(["—", "—", "—"]).slice(0, 3),
    explanation: question.explanation,
    explanationEn: question.explanationEn,
    category: question.category,
    difficulty: question.difficulty,
    era: question.era,
  };
}
