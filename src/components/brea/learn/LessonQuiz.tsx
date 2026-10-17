import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw, Check, ArrowLeft } from "lucide-react";
import { QUIZ, quizScore } from "@/lib/brea/learning-data";
import { cn } from "@/lib/utils";
import { LearnButton, PrimaryButton } from "./LearnPrimitives";
export function LessonQuiz({ onResult, onClose }: { onResult: (score: number) => void; onClose: () => void }) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);
  const question = QUIZ[index];
  if (!question) return null;
  if (finished) return <section className="brea-fade-in py-8 text-center"><p className="text-xs text-brea-sage-deep">A little knowledge check</p><h2 className="mt-4 text-5xl">{quizScore(answers)} out of 3</h2><p className="mx-auto mt-4 max-w-md text-sm leading-relaxed">{quizScore(answers) === 3 ? "Beautifully remembered!" : "Every question is another chance to learn."} Your Anatomy Explorer badge is yours to keep.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><LearnButton onClick={() => { setAnswers([]); setIndex(0); setChoice(null); setChecked(false); setFinished(false); }}><RotateCcw /> Try Again</LearnButton><PrimaryButton asChild><Link to="/brea/learn">Back to Learning <ArrowRight /></Link></PrimaryButton></div></section>;
  return <section className="brea-fade-in py-6"><LearnButton className="border-0 px-0" onClick={onClose}><ArrowLeft /> Leave Quiz</LearnButton><p className="mt-6 text-xs text-brea-sage-deep">Optional quiz · Question {index + 1} of 3</p><h2 className="mt-3 text-3xl leading-tight sm:text-4xl">{question.question}</h2><div role="group" aria-label="Answer choices" className="mt-6 space-y-3">{question.answers.map((answer,i) => <LearnButton key={answer} disabled={checked} aria-pressed={choice === i} className={cn("w-full justify-start rounded-2xl px-5 py-4 text-left", choice === i && "border-brea-sage-deep bg-brea-sage/20", checked && i === question.correct && "bg-brea-sage/25 border-brea-sage-deep disabled:opacity-100")} onClick={() => setChoice(i)}><span className="shrink-0 text-xs">{String.fromCharCode(65 + i)}.</span>{answer}{checked && i === question.correct && <Check className="ml-auto" />}</LearnButton>)}</div>{checked && <div role="status" className="mt-5 border-l-2 border-brea-blush px-4 py-2 text-sm leading-relaxed"><strong>{choice === question.correct ? "That’s right!" : "A lovely chance to learn."}</strong><p className="mt-1">{question.explanation}</p></div>}<PrimaryButton className="mt-6" disabled={choice === null} onClick={() => { if (choice === null) return; if (!checked) { setChecked(true); return; } const next = [...answers, choice]; setAnswers(next); if (index === 2) { onResult(quizScore(next)); setFinished(true); } else { setIndex(index + 1); setChoice(null); setChecked(false); } }}>{checked ? index === 2 ? "See My Score" : "Next Question" : "Check Answer"}<ArrowRight /></PrimaryButton></section>;
}
