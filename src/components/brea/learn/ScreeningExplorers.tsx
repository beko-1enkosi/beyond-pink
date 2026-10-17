import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMAGING_COMPARISON, MAMMOGRAM_FINDINGS, MAMMOGRAM_STEPS, ULTRASOUND_FINDINGS, ULTRASOUND_STEPS, type MammogramFindingId } from "@/lib/brea/screening-data";
import { LearnButton } from "./LearnPrimitives";

/* Shared step control row with Back / Next / Replay. */
function StepNav({ index, total, onChange }: { index: number; total: number; onChange: (i: number) => void }) {
  return <div className="mt-5 flex flex-wrap items-center gap-3">
    <LearnButton disabled={index === 0} onClick={() => onChange(index - 1)} className="px-4 py-2 text-xs"><ArrowLeft /> Back</LearnButton>
    <LearnButton disabled={index === total - 1} onClick={() => onChange(index + 1)} className="px-4 py-2 text-xs">Next <ArrowRight /></LearnButton>
    <LearnButton onClick={() => onChange(0)} className="px-4 py-2 text-xs"><RotateCcw /> Replay</LearnButton>
  </div>;
}

/* Intro illustration: mammography machine beside an ultrasound probe, botanical style. */
export function ScreeningIntro() {
  return <div role="img" aria-label="Simplified botanical-style illustration of a mammography machine and an ultrasound probe" className="mx-auto my-6 max-w-sm rounded-3xl border border-brea-sage/20 bg-brea-anatomy/25 p-5">
    <svg viewBox="0 0 320 200" className="w-full" aria-hidden>
      {/* mammography machine */}
      <rect x="60" y="30" width="60" height="120" rx="10" fill="var(--brea-sage)" opacity=".55" />
      <rect x="70" y="20" width="40" height="18" rx="6" fill="var(--brea-sage-deep)" />
      <rect x="66" y="78" width="48" height="8" rx="3" fill="var(--brea-sage-deep)" />
      <rect x="66" y="102" width="48" height="8" rx="3" fill="var(--brea-sage-deep)" />
      <ellipse cx="90" cy="94" rx="16" ry="9" fill="var(--brea-blush)" />
      <rect x="52" y="150" width="76" height="10" rx="5" fill="var(--brea-sage-deep)" />
      {/* ultrasound probe + display */}
      <rect x="200" y="40" width="70" height="48" rx="8" fill="var(--brea-ivory)" stroke="var(--brea-sage-deep)" strokeWidth="2.5" />
      <path d="M208 74 Q222 52 236 66 T262 60" stroke="var(--brea-rose, #B65F7B)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M236 130 L252 108 L262 116 L246 138 Z" fill="var(--brea-sage-deep)" />
      <path d="M246 138 q-4 10 -14 12" stroke="var(--brea-sage)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {[0, 1, 2].map((i) => <path key={i} d={`M${238 - i * 12} ${150 + i * 6} q-8 4 -14 0`} stroke="var(--brea-blush)" strokeWidth="2" fill="none" strokeLinecap="round" />)}
      {/* botanical accents */}
      <path d="M30 170 Q36 150 30 136 M30 152 q-10 -4 -14 -14 M30 152 q10 -4 14 -14" stroke="var(--brea-sage)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="132" r="4" fill="var(--brea-blush)" />
      <path d="M292 176 Q286 156 292 142 M292 158 q10 -4 14 -14" stroke="var(--brea-sage)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="292" cy="138" r="4" fill="var(--brea-rose, #B65F7B)" opacity=".7" />
    </svg>
  </div>;
}

/* Four-step mammogram appointment walkthrough. */
export function MammogramWalkthrough() {
  const [step, setStep] = useState(0);
  const current = MAMMOGRAM_STEPS[step];
  return <div className="mt-7 rounded-2xl border border-brea-sage/25 bg-brea-paper p-5 sm:p-6">
    <p className="text-xs uppercase text-brea-sage-deep">Interactive · Inside a mammogram appointment</p>
    <div role="tablist" aria-label="Mammogram appointment steps" className="mt-4 flex flex-wrap gap-2">
      {MAMMOGRAM_STEPS.map((s, i) => <LearnButton key={s.id} role="tab" aria-selected={step === i} onClick={() => setStep(i)} className={cn("px-4 py-2 text-xs", step === i && "border-brea-rose bg-brea-blush/25 text-brea-rose")}>{i + 1}. {s.title}</LearnButton>)}
    </div>
    <div role="img" aria-label={`Simplified educational illustration: ${current.title}`} className="mx-auto mt-5 max-w-xs">
      <svg viewBox="0 0 240 190" className="w-full brea-fade-in" key={current.id} aria-hidden>
        {/* machine column and base */}
        <rect x="150" y="20" width="46" height="130" rx="8" fill="var(--brea-sage)" opacity=".5" />
        <rect x="142" y="150" width="62" height="10" rx="5" fill="var(--brea-sage-deep)" />
        <rect x="156" y="12" width="34" height="14" rx="5" fill="var(--brea-sage-deep)" />
        {/* support plate */}
        <rect x="96" y="104" width="60" height="8" rx="3" fill="var(--brea-sage-deep)" />
        {/* compression plate — moves down on step 3 */}
        <rect x="96" y={step === 2 ? 86 : 66} width="60" height="8" rx="3" fill="var(--brea-sage)" stroke="var(--brea-sage-deep)" strokeWidth="1.5" style={{ transition: "y .5s ease" }} />
        {/* person */}
        <circle cx="52" cy="34" r="13" fill="var(--brea-blush)" />
        <path d="M52 47 q-16 8 -14 34 l6 44 q2 8 10 8 h6 q8 0 10 -8 l6 -44 q2 -26 -24 -34 Z" fill="var(--brea-sage)" opacity=".65" />
        {/* breast on plate for steps 2+ */}
        {step >= 1 && <ellipse cx="108" cy={step === 2 ? 99 : 96} rx={step === 2 ? 15 : 11} ry={step === 2 ? 6 : 9} fill="var(--brea-blush)" stroke="var(--brea-rose, #B65F7B)" strokeWidth="1.5" style={{ transition: "all .5s ease" }} />}
        {step === 1 && <path d="M64 84 Q86 88 100 94" stroke="var(--brea-blush)" strokeWidth="7" fill="none" strokeLinecap="round" />}
        {/* X-ray capture marks on step 4 */}
        {step === 3 && <g stroke="var(--brea-gold)" strokeWidth="2" strokeLinecap="round"><path d="M120 40 l4 8 M132 36 l2 9 M144 40 l0 9" /><circle cx="126" cy="58" r="4" fill="var(--brea-gold)" stroke="none" opacity=".8" /></g>}
        {step === 0 && <g><path d="M30 168 q40 10 80 0" stroke="var(--brea-sage)" strokeWidth="2" fill="none" strokeLinecap="round" /><circle cx="120" cy="166" r="4" fill="var(--brea-blush)" /></g>}
      </svg>
    </div>
    <h3 className="mt-4 text-2xl text-brea-sage-deep">{current.title}</h3>
    <p className="mt-2 text-sm leading-relaxed">{current.text}</p>
    {"tip" in current && current.tip && <p className="mt-3 border-l-2 border-brea-blush pl-4 text-sm leading-relaxed text-brea-sage-deep">{current.tip}</p>}
    {"note" in current && current.note && <p className="mt-3 border-l-2 border-brea-rose pl-4 text-sm leading-relaxed">{current.note}</p>}
    {"done" in current && current.done && <p role="status" className="mt-3 text-sm font-medium italic text-brea-rose">{current.done}</p>}
    <StepNav index={step} total={MAMMOGRAM_STEPS.length} onChange={setStep} />
    <p className="mt-4 text-xs leading-relaxed text-brea-sage-deep">A simplified educational illustration, not a recording of a real medical procedure.</p>
  </div>;
}

/* Grayscale mammogram-view explorer with three selectable findings. */
export function MammogramFindings() {
  const [selected, setSelected] = useState<MammogramFindingId>("mass");
  const finding = MAMMOGRAM_FINDINGS.find((f) => f.id === selected)!;
  return <div className="mt-8 rounded-2xl border border-brea-sage/25 bg-brea-paper p-5 sm:p-6">
    <h3 className="text-3xl text-brea-sage-deep">What Can a Mammogram Show?</h3>
    <div role="tablist" aria-label="Mammogram findings" className="mt-4 flex flex-wrap gap-2">
      {MAMMOGRAM_FINDINGS.map((f) => <LearnButton key={f.id} role="tab" aria-selected={selected === f.id} onClick={() => setSelected(f.id)} className={cn("px-4 py-2 text-xs", selected === f.id && "border-brea-rose bg-brea-blush/25 text-brea-rose")}>{f.title}</LearnButton>)}
    </div>
    <div role="img" aria-label={`Educational grayscale mammogram-style diagram highlighting ${finding.title}`} className="mx-auto mt-5 max-w-xs">
      <svg viewBox="0 0 220 170" className="w-full brea-fade-in" key={selected} aria-hidden>
        <rect x="10" y="8" width="200" height="154" rx="12" fill="#2e2e2e" />
        <path d="M30 150 Q40 60 110 40 Q180 60 190 150 Z" fill="#8a8a8a" opacity=".8" />
        <path d="M55 150 Q62 85 110 68 Q158 85 165 150 Z" fill="#b5b5b5" opacity=".7" />
        {selected === "mass" && <g><circle cx="128" cy="96" r="14" fill="#e8e8e8" /><circle cx="128" cy="96" r="20" fill="none" stroke="var(--brea-rose, #B65F7B)" strokeWidth="2.5" strokeDasharray="5 4" /></g>}
        {selected === "calcifications" && <g>{[[86, 92], [94, 86], [90, 102], [100, 96], [82, 110], [97, 112]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" fill="#f2f2f2" />)}<circle cx="92" cy="99" r="22" fill="none" stroke="var(--brea-rose, #B65F7B)" strokeWidth="2.5" strokeDasharray="5 4" /></g>}
        {selected === "density" && <g>{[[70, 120], [90, 130], [120, 126], [145, 118], [105, 108], [135, 140], [75, 100]].map(([x, y]) => <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="12" ry="8" fill="#d8d8d8" opacity=".85" />)}</g>}
      </svg>
    </div>
    <p className="mt-4 text-sm leading-relaxed">{finding.text}</p>
    <ul className="mt-5 space-y-2 border-t border-brea-sage/20 pt-4 text-sm leading-relaxed">
      <li>A suspicious mammogram does not automatically mean cancer.</li>
      <li>A normal mammogram does not detect every cancer.</li>
      <li>Further images, ultrasound or a biopsy may sometimes be needed.</li>
      <li>Only a qualified healthcare professional can interpret real imaging results.</li>
    </ul>
    <p className="mt-4 text-xs leading-relaxed text-brea-sage-deep">An educational diagram, not an actual patient scan. This illustration is not classified as benign or malignant.</p>
  </div>;
}

/* Three-step ultrasound walkthrough. */
export function UltrasoundWalkthrough() {
  const [step, setStep] = useState(0);
  const current = ULTRASOUND_STEPS[step];
  return <div className="mt-7 rounded-2xl border border-brea-sage/25 bg-brea-paper p-5 sm:p-6">
    <p className="text-xs uppercase text-brea-sage-deep">Interactive · How ultrasound works</p>
    <div role="tablist" aria-label="Ultrasound steps" className="mt-4 flex flex-wrap gap-2">
      {ULTRASOUND_STEPS.map((s, i) => <LearnButton key={s.id} role="tab" aria-selected={step === i} onClick={() => setStep(i)} className={cn("px-4 py-2 text-xs", step === i && "border-brea-rose bg-brea-blush/25 text-brea-rose")}>{i + 1}. {s.title}</LearnButton>)}
    </div>
    <div role="img" aria-label={`Simplified educational illustration: ${current.title}`} className="mx-auto mt-5 max-w-xs">
      <svg viewBox="0 0 240 180" className="w-full brea-fade-in" key={current.id} aria-hidden>
        {/* chest cross-section */}
        <path d="M20 150 Q30 70 120 62 Q210 70 220 150 Z" fill="var(--brea-anatomy)" />
        <path d="M55 150 Q62 96 120 88 Q178 96 185 150 Z" fill="var(--brea-blush)" opacity=".55" />
        <ellipse cx="120" cy="128" rx="16" ry="10" fill="var(--brea-sage)" opacity=".6" />
        {/* gel on step 1+ */}
        {step >= 0 && <ellipse cx="120" cy="66" rx="26" ry="6" fill="var(--brea-mist, #CFE3EF)" opacity=".9" />}
        {/* probe */}
        <g transform={`translate(${step === 1 ? 96 : 104} 30) rotate(-8)`}>
          <rect x="0" y="0" width="32" height="30" rx="7" fill="var(--brea-sage-deep)" />
          <rect x="6" y="28" width="20" height="8" rx="3" fill="var(--brea-sage)" />
        </g>
        {/* sound waves on scanning step */}
        {step === 1 && <g stroke="var(--brea-rose, #B65F7B)" strokeWidth="2" fill="none" strokeLinecap="round" className="brea-waves"><path d="M112 78 q8 6 0 12" /><path d="M120 76 q10 8 0 16" /><path d="M128 74 q12 10 0 20" /></g>}
        {/* display on viewing step */}
        {step === 2 && <g><rect x="160" y="20" width="64" height="44" rx="7" fill="var(--brea-ivory)" stroke="var(--brea-sage-deep)" strokeWidth="2.5" /><path d="M168 52 Q180 32 192 44 T216 40" stroke="var(--brea-rose, #B65F7B)" strokeWidth="2.5" fill="none" strokeLinecap="round" /></g>}
      </svg>
    </div>
    <h3 className="mt-4 text-2xl text-brea-sage-deep">{current.title}</h3>
    <p className="mt-2 text-sm leading-relaxed">{current.text}</p>
    <StepNav index={step} total={ULTRASOUND_STEPS.length} onChange={setStep} />
    <p className="mt-4 text-xs leading-relaxed text-brea-sage-deep">Ultrasound uses sound waves — it does not use ionizing radiation.</p>
  </div>;
}

/* Fluid-filled vs solid ultrasound comparison. */
export function UltrasoundFindings() {
  const [selected, setSelected] = useState<string>("cyst");
  const finding = ULTRASOUND_FINDINGS.find((f) => f.id === selected)!;
  return <div className="mt-8 rounded-2xl border border-brea-sage/25 bg-brea-paper p-5 sm:p-6">
    <h3 className="text-3xl text-brea-sage-deep">Solid or Fluid-Filled?</h3>
    <div role="tablist" aria-label="Ultrasound findings" className="mt-4 flex flex-wrap gap-2">
      {ULTRASOUND_FINDINGS.map((f) => <LearnButton key={f.id} role="tab" aria-selected={selected === f.id} onClick={() => setSelected(f.id)} className={cn("px-4 py-2 text-xs", selected === f.id && "border-brea-rose bg-brea-blush/25 text-brea-rose")}>{f.title}</LearnButton>)}
    </div>
    <div role="img" aria-label={`Conceptual ultrasound-style diagram: ${finding.title}`} className="mx-auto mt-5 max-w-xs">
      <svg viewBox="0 0 220 150" className="w-full brea-fade-in" key={selected} aria-hidden>
        <path d="M20 12 H200 L184 138 H36 Z" fill="#2e2e2e" />
        <path d="M34 26 H186 L176 126 H44 Z" fill="#4a4a4a" opacity=".7" />
        {selected === "cyst" ? <g><ellipse cx="110" cy="78" rx="30" ry="22" fill="#161616" stroke="#c8c8c8" strokeWidth="2" /><path d="M84 108 q26 10 52 0" stroke="#9a9a9a" strokeWidth="2" fill="none" opacity=".7" /></g>
          : <g><path d="M86 78 q10 -20 28 -14 q22 -6 26 12 q8 16 -10 24 q-20 10 -36 -2 q-14 -8 -8 -20 Z" fill="#b8b8b8" /><path d="M86 78 q10 -20 28 -14 q22 -6 26 12 q8 16 -10 24 q-20 10 -36 -2 q-14 -8 -8 -20 Z" fill="none" stroke="#e0e0e0" strokeWidth="1.5" strokeDasharray="4 3" /></g>}
      </svg>
    </div>
    <p className="mt-4 text-sm leading-relaxed">{finding.text}</p>
    <p className="mt-3 text-sm leading-relaxed text-brea-sage-deep">Some findings may require further imaging or a biopsy. Not every fluid-filled area is harmless, and not every solid area is cancer.</p>
    <p className="mt-3 text-xs leading-relaxed text-brea-sage-deep">Conceptual examples, not real patient scans.</p>
  </div>;
}

/* Mammogram vs ultrasound segmented comparison. */
export function ImagingComparison() {
  const [mode, setMode] = useState<"mammogram" | "ultrasound" | "both">("both");
  const card = (kind: "mammogram" | "ultrasound") => {
    const data = IMAGING_COMPARISON[kind];
    return <article className="flex-1 rounded-2xl border border-brea-sage/25 bg-brea-paper p-5">
      <div role="img" aria-label={kind === "mammogram" ? "Stylized mammography equipment icon" : "Ultrasound probe icon"} className="flex justify-center">
        {kind === "mammogram"
          ? <svg viewBox="0 0 60 60" className="h-14 w-14" aria-hidden><rect x="18" y="8" width="24" height="36" rx="6" fill="var(--brea-sage)" opacity=".6" /><rect x="14" y="24" width="32" height="5" rx="2" fill="var(--brea-sage-deep)" /><rect x="14" y="34" width="32" height="5" rx="2" fill="var(--brea-sage-deep)" /><ellipse cx="30" cy="31" rx="8" ry="4" fill="var(--brea-blush)" /><rect x="12" y="44" width="36" height="6" rx="3" fill="var(--brea-sage-deep)" /></svg>
          : <svg viewBox="0 0 60 60" className="h-14 w-14" aria-hidden><path d="M22 10 L38 10 L34 34 L26 34 Z" fill="var(--brea-sage-deep)" /><rect x="24" y="34" width="12" height="7" rx="3" fill="var(--brea-sage)" /><path d="M18 48 q6 -5 12 0 M30 52 q6 -5 12 0" stroke="var(--brea-rose, #B65F7B)" strokeWidth="2.5" fill="none" strokeLinecap="round" /></svg>}
      </div>
      <h3 className="mt-3 text-center text-2xl text-brea-sage-deep">{kind === "mammogram" ? "Mammogram" : "Ultrasound"}</h3>
      <p className="mt-1 text-center text-xs font-medium uppercase text-brea-rose">{data.label}</p>
      <p className="mt-3 text-sm leading-relaxed">{data.description}</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">{data.uses.map((use) => <li key={use}>{use}</li>)}</ul>
    </article>;
  };
  return <div className="mt-7">
    <div role="tablist" aria-label="Compare imaging tools" className="flex flex-wrap gap-2">
      {([["mammogram", "Mammogram"], ["ultrasound", "Ultrasound"], ["both", "Compare Both"]] as const).map(([id, label]) => <LearnButton key={id} role="tab" aria-selected={mode === id} onClick={() => setMode(id)} className={cn("px-4 py-2 text-xs", mode === id && "border-brea-rose bg-brea-blush/25 text-brea-rose")}>{label}</LearnButton>)}
    </div>
    <div className="mt-5 flex flex-col gap-4 sm:flex-row">
      {(mode === "mammogram" || mode === "both") && card("mammogram")}
      {(mode === "ultrasound" || mode === "both") && card("ultrasound")}
    </div>
    <aside className="mt-6 rounded-2xl bg-brea-sage/12 p-5">
      <p className="text-xs font-medium uppercase text-brea-sage-deep">Did you know?</p>
      <p className="mt-2 text-sm leading-relaxed">Mammograms can show tiny calcifications that may not be visible on ultrasound. Ultrasound can provide additional information about particular areas of tissue.</p>
      <p className="mt-3 text-sm font-medium leading-relaxed">Ultrasound does not simply replace mammography. Sometimes healthcare professionals use both tests because they provide different kinds of information.</p>
    </aside>
  </div>;
}
