import { Confetti } from "./Celebration";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Flower2, Check } from "lucide-react";
import { completeLesson, useLearning } from "@/lib/brea/learning";
import { LESSON_ID } from "@/lib/brea/learning-data";
import { AnatomyExplorer } from "./AnatomyExplorer";
import { AnatomyBadge, LearnButton, LearnShell, PrimaryButton, ProgressBar } from "./LearnPrimitives";
import { MedicalTerm, MedDecode } from "./LearnPanels";
import { LessonQuiz } from "./LessonQuiz";
import { addExplored } from "@/lib/brea/learning";
const SECTION_NAMES = ["Explore the anatomy", "What do breasts do?", "Why anatomy matters"];
export function MeetYourBreasts() {
  const { state, name, ready, update, storageNotice } = useLearning();
  const [mode, setMode] = useState<"lesson" | "celebration" | "quiz">("lesson");
  const [celebrate, setCelebrate] = useState(false);
  const [term, setTerm] = useState<string>();
  const heading = useRef<HTMLHeadingElement>(null);
  const [moved, setMoved] = useState(false);
  useEffect(() => {
    if (ready && !state.started) update((current) => ({ ...current, started: true }));
  }, [ready]);
  useEffect(() => {
    if (moved) { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }
  }, [state.position, mode]);
  useEffect(() => {
    if (!celebrate) return;
    const timer = window.setTimeout(() => setCelebrate(false), 3200);
    return () => window.clearTimeout(timer);
  }, [celebrate]);
  const changePosition = (position: number) => { setMoved(true); update((current) => ({ ...current, position })); };
  const finish = () => {
    const result = completeLesson(state);
    update(() => result.state);
    setCelebrate(result.firstCompletion);
    setMoved(true);
    setMode("celebration");
  };
  const done = state.completed.includes(LESSON_ID);
  if (!ready) return <LearnShell><p role="status" className="py-8 text-sm text-brea-sage-deep">Opening your lesson…</p></LearnShell>;
  return <LearnShell><header className="flex flex-wrap items-center justify-between gap-2"><LearnButton asChild className="border-0 px-0"><Link to="/brea/learn"><ArrowLeft /> Back to Learning</Link></LearnButton><span className="flex items-center gap-1 text-xs text-brea-sage-deep">{done ? <><Check className="h-4 w-4" /> Completed</> : "A little discovery, just for you"}</span></header><main className="mx-auto max-w-2xl">
    <div className="pb-7 pt-8 sm:pt-12"><p className="text-xs text-brea-sage-deep">Lesson 01</p><h1 ref={heading} tabIndex={-1} className="mt-3 scroll-mt-6 text-5xl leading-[1.05] outline-none sm:text-6xl">Meet Your <em className="brea-em">Breasts</em></h1><p className="mt-4 text-sm leading-relaxed text-brea-sage-deep sm:text-base">Your breasts are made up of different tissues and structures, each with its own role. Let’s explore what’s beneath the surface.</p><div className="mt-6 flex justify-between text-xs text-brea-sage-deep"><span>{mode === "lesson" ? SECTION_NAMES[state.position] : mode === "quiz" ? "Optional knowledge check" : "Lesson complete"}</span><span>{mode === "lesson" ? `${state.position + 1} of 3` : "3 of 3"}</span></div><ProgressBar percent={mode === "lesson" ? (state.position + 1) / 3 * 100 : 100} /></div>
    {storageNotice && <p role="status" className="mb-4 text-sm">Your browser cannot save progress right now. You can still keep learning.</p>}
    {mode === "lesson" && <><div key={state.position} className="brea-fade-in">
      {state.position === 0 && <><AnatomyExplorer explored={state.explored} onExplore={(id) => update((current) => addExplored(current, id))} /><p className="mt-4 text-sm leading-relaxed text-brea-sage-deep">A new word? Meet the <MedicalTerm term="Lobule" onSelect={setTerm}>lobule</MedicalTerm>, <MedicalTerm term="Milk duct" onSelect={setTerm}>milk duct</MedicalTerm> and <MedicalTerm term="Lymph node" onSelect={setTerm}>lymph node</MedicalTerm>.</p></>}
      {state.position === 1 && <section className="py-3"><Flower2 className="h-12 w-12 text-brea-blush" /><h2 className="mt-4 text-4xl">What Do Breasts Do?</h2><p className="mt-4 text-sm leading-relaxed">Breasts are part of the body’s natural story. They vary in size, shape and composition — and that variation is normal.</p><ul className="mt-6 space-y-5 text-sm leading-relaxed"><li className="border-l-2 border-brea-blush pl-4">Breasts contain <MedicalTerm term="Glandular tissue" onSelect={setTerm}>glandular tissue</MedicalTerm> that can produce milk.</li><li className="border-l-2 border-brea-sage pl-4">Hormones influence breast development and changes.</li><li className="border-l-2 border-brea-blush pl-4">Breast size and the balance of fat and glandular tissue vary naturally.</li><li className="border-l-2 border-brea-sage pl-4">Breast tissue can change through different stages of life.</li></ul><p className="mt-7 text-sm leading-relaxed text-brea-sage-deep">Everyone’s body is different. Breast tissue is present in people of all genders.</p></section>}
      {state.position === 2 && <section className="py-3"><h2 className="text-4xl">Why Understanding Your Anatomy Matters</h2><p className="mt-5 text-base leading-relaxed">Understanding what your breasts are made of can help you become more familiar with your body and feel more confident when discussing breast health with healthcare professionals.</p><p className="mt-4 text-sm leading-relaxed text-brea-sage-deep">Breast anatomy varies between individuals. Learning anatomy alone cannot detect or prevent cancer. A new or unusual breast change deserves assessment by a qualified healthcare professional.</p><div className="mt-7 border-y border-brea-sage/25 py-6"><p className="text-xs text-brea-sage-deep">A little recap</p><h3 className="mt-2 text-3xl">Different parts. Working together.</h3><ul className="mt-4 space-y-3 text-sm leading-relaxed"><li><MedicalTerm term="Lobule" onSelect={setTerm}>Lobules</MedicalTerm> contain glands that can make milk; ducts carry it toward the nipple.</li><li>Fat and <MedicalTerm term="Connective tissue" onSelect={setTerm}>connective tissue</MedicalTerm> contribute to shape and support.</li><li>Nearby lymph nodes, especially in the underarm, are part of the immune system.</li></ul></div><p className="mt-6 text-sm text-brea-sage-deep">Ready when you are. Your quiz is optional, and you don’t need to explore every part to finish.</p></section>}
    </div><nav aria-label="Lesson navigation" className="mt-8 flex justify-between gap-3 border-t border-brea-sage/20 pt-5"><LearnButton disabled={state.position === 0} onClick={() => changePosition(state.position - 1)}><ArrowLeft /> Back</LearnButton>{state.position < 2 ? <PrimaryButton onClick={() => changePosition(state.position + 1)}>Next <ArrowRight /></PrimaryButton> : <PrimaryButton onClick={finish}>Finish Lesson <Check /></PrimaryButton>}</nav><p className="mt-8 text-xs leading-relaxed text-brea-sage-deep">Educational reference: <a href="https://training.seer.cancer.gov/breast/anatomy.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">National Cancer Institute · Breast anatomy</a>. Simplified for introductory learning.</p></>}
    {mode === "celebration" && <section className="relative brea-fade-in py-5 text-center">{celebrate && <Confetti />}<div className={celebrate ? "brea-badge-bloom" : ""}><Flower2 className="mx-auto mb-4 h-8 w-8 text-brea-blush" /><div className="flex justify-center"><AnatomyBadge earned large /></div></div><h2 className="mt-8 break-words text-4xl sm:text-5xl">Beautifully done{name ? `, ${name}` : ""}!</h2><p className="mt-4 text-sm text-brea-sage-deep">You’ve completed your first lesson.</p><p className="mt-2 text-sm font-medium">You earned the Anatomy Explorer badge!</p><div className="mt-7 flex flex-wrap justify-center gap-3"><LearnButton onClick={() => { setMoved(true); setMode("quiz"); }}>Try a Quick Quiz</LearnButton><PrimaryButton asChild><Link to="/brea/learn">Back to Learning <ArrowRight /></Link></PrimaryButton></div></section>}
    {mode === "quiz" && <LessonQuiz onResult={(score) => update((current) => ({ ...current, quizResult: score }))} onClose={() => setMode("celebration")} />}
  </main><MedDecode requested={term} onRequestHandled={() => setTerm(undefined)} /></LearnShell>;
}
