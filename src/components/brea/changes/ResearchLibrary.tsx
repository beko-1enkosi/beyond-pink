import { useState } from "react";
import { ArrowRight, BookOpen, ExternalLink, FlaskConical, Microscope } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { LearnButton, PrimaryButton } from "@/components/brea/learn/LearnPrimitives";
import { MedDecode, MedicalTerm } from "@/components/brea/learn/LearnPanels";
import { BSE_CLARIFICATION, RESEARCH_CATEGORIES, RESEARCH_LITERACY, RESEARCH_STUDIES, type ResearchCategory, type ResearchStudy } from "@/lib/brea/research-data";
import { cn } from "@/lib/utils";

function ResearchMotif() {
  return <svg viewBox="0 0 160 120" className="h-24 w-32 shrink-0 sm:h-28 sm:w-36" role="img" aria-label="A small stack of research papers beside a magnifying glass and a blush flower."><g><rect x="18" y="66" width="64" height="40" rx="4" fill="var(--brea-paper)" stroke="var(--brea-sage)" strokeWidth="2" /><rect x="24" y="56" width="64" height="40" rx="4" fill="var(--brea-ivory)" stroke="var(--brea-sage)" strokeWidth="2" /><path d="M32 66 h48 M32 74 h48 M32 82 h34" stroke="var(--brea-sage)" strokeWidth="2" strokeLinecap="round" opacity=".7" /></g><circle cx="112" cy="40" r="18" fill="var(--brea-ivory)" fillOpacity=".6" stroke="var(--brea-rose)" strokeWidth="3" /><path d="M124 52 L138 66" stroke="var(--brea-rose)" strokeWidth="5" strokeLinecap="round" /><g fill="var(--brea-blush)">{[0, 72, 144, 216, 288].map((d) => <ellipse key={d} cx="112" cy="32" rx="4" ry="7" transform={`rotate(${d} 112 40)`} />)}</g><circle cx="112" cy="40" r="3.5" fill="var(--brea-gold)" /><path d="M40 106 Q44 96 40 88 M56 106 Q52 96 56 88" stroke="var(--brea-sage-deep)" strokeWidth="2" fill="none" strokeLinecap="round" /><ellipse cx="36" cy="94" rx="4" ry="8" transform="rotate(-30 36 94)" fill="var(--brea-sage)" opacity=".8" /><ellipse cx="60" cy="94" rx="4" ry="8" transform="rotate(30 60 94)" fill="var(--brea-sage)" opacity=".8" /></svg>;
}

function StudyExplains({ study, onClose }: { study: ResearchStudy; onClose: () => void }) {
  const [detailed, setDetailed] = useState(false);
  const [term, setTerm] = useState<string | undefined>(undefined);
  const T = (label: string, lookup?: string) => <MedicalTerm term={lookup ?? label} onSelect={setTerm}>{label}</MedicalTerm>;
  return <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-brea-rose-deep">{study.publicationType} · {study.journal} · {study.year}</p>
    <div className="mt-3 flex gap-2" role="group" aria-label="Explanation detail level">
      {(["Simple", "Detailed"] as const).map((mode) => {
        const active = (mode === "Detailed") === detailed;
        return <LearnButton key={mode} aria-pressed={active} onClick={() => setDetailed(mode === "Detailed")} className={cn("px-4 py-2 text-xs", active && "border-brea-sage-deep bg-brea-sage-deep text-brea-ivory hover:bg-brea-sage-deeper hover:text-brea-ivory")}>{mode}</LearnButton>;
      })}
    </div>
    <section className="mt-5"><h3 className="font-[family-name:var(--font-brea-display)] text-2xl">What Did Researchers Investigate?</h3><p className="mt-2 text-sm leading-relaxed">{detailed ? study.investigated.detailed : study.investigated.simple}</p></section>
    <section className="mt-5"><h3 className="font-[family-name:var(--font-brea-display)] text-2xl">What Did They Find?</h3><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed">{study.findings.map((finding) => <li key={finding}>{finding}</li>)}</ul></section>
    <section className="mt-5"><h3 className="font-[family-name:var(--font-brea-display)] text-2xl">Why Does It Matter?</h3><p className="mt-2 text-sm leading-relaxed">{study.whyItMatters}</p></section>
    <section className="mt-5 rounded-2xl border border-brea-gold/50 bg-brea-gold/10 p-4"><h3 className="font-[family-name:var(--font-brea-display)] text-2xl">What Are the Limitations?</h3><p className="mt-2 text-sm leading-relaxed">{study.limitations}</p><p className="mt-2 text-xs leading-relaxed text-brea-sage-deep">Every study has {T("study limitations", "Study limitations")}. One publication rarely answers every scientific question.</p></section>
    <section className="mt-5"><h3 className="font-[family-name:var(--font-brea-display)] text-2xl">Explore the Original Research</h3><p className="mt-2 text-xs leading-relaxed text-brea-sage-deep">Brea's explanation is educational; the original publication is the scientific source. Some journals may require institutional access for the full text.</p><PrimaryButton asChild className="mt-3"><a href={study.link} target="_blank" rel="noopener noreferrer" aria-label={`Read the original study “${study.title}” (opens in a new tab)`}>Read Original Study <ExternalLink /></a></PrimaryButton></section>
    <LearnButton className="mt-5 text-xs" onClick={onClose}>Back to the library</LearnButton>
    <MedDecode requested={term} onRequestHandled={() => setTerm(undefined)} />
  </div>;
}

export function ResearchLibrary() {
  const [category, setCategory] = useState<ResearchCategory>("All Research");
  const [openId, setOpenId] = useState<string | null>(null);
  const [literacyOpen, setLiteracyOpen] = useState(false);
  const [term, setTerm] = useState<string | undefined>(undefined);
  const studies = category === "All Research" ? RESEARCH_STUDIES : RESEARCH_STUDIES.filter((study) => study.category === category);
  const openStudy = RESEARCH_STUDIES.find((study) => study.id === openId);
  const T = (label: string, lookup?: string) => <MedicalTerm term={lookup ?? label} onSelect={setTerm}>{label}</MedicalTerm>;
  return <section aria-labelledby="research-heading" className="mt-10">
    <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brea-sage-deep">Real research. Made understandable.</p>
        <h2 id="research-heading" className="mt-2 text-4xl leading-tight sm:text-5xl">The Science Behind <em className="brea-em">Awareness</em></h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-brea-sage-deep">Curious about what researchers are discovering? Explore real studies, understand the findings in simple language and read the original research.</p>
      </div>
      <ResearchMotif />
    </div>

    <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label="Filter research by category">
      {RESEARCH_CATEGORIES.map((option) => {
        const active = option === category;
        return <LearnButton key={option} aria-pressed={active} onClick={() => setCategory(option)} className={cn("px-4 py-2 text-xs", active && "border-brea-rose-deep bg-brea-rose-deep text-brea-ivory hover:bg-brea-rose hover:text-brea-ivory focus-visible:ring-brea-rose-deep")}>{option}</LearnButton>;
      })}
      <p role="status" className="w-full text-xs text-brea-sage-deep sm:ml-2 sm:w-auto">Showing {studies.length} {studies.length === 1 ? "study" : "studies"}</p>
    </div>

    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {studies.map((study) => <article key={study.id} className="flex flex-col rounded-3xl border border-brea-sage/25 bg-brea-paper p-5 shadow-brea-soft transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-brea-lift sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brea-rose/15 px-3 py-1 text-xs font-semibold text-brea-rose-deep">{study.category}</span>
          <span className="rounded-full border border-brea-sage/30 px-3 py-1 text-xs text-brea-sage-deep">{study.publicationType}</span>
        </div>
        <h3 className="mt-3 font-[family-name:var(--font-brea-display)] text-xl leading-snug">{study.title}</h3>
        <p className="mt-2 text-xs text-brea-sage-deep">{study.authors} · {study.journal}, {study.year}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed">{study.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <PrimaryButton className="bg-brea-rose-deep text-xs hover:bg-brea-rose focus-visible:ring-brea-rose-deep" onClick={() => setOpenId(study.id)} aria-haspopup="dialog"><Microscope /> Brea Explains</PrimaryButton>
          <LearnButton asChild className="text-xs"><a href={study.link} target="_blank" rel="noopener noreferrer" aria-label={`Read the original study “${study.title}” (opens in a new tab)`}>Read Original Study <ExternalLink /></a></LearnButton>
        </div>
      </article>)}
    </div>

    <div className="mt-5 rounded-3xl border border-brea-sage/25 bg-brea-paper p-5 shadow-brea-soft sm:p-6">
      <LearnButton className="w-full justify-between border-0 px-0 text-left" aria-expanded={literacyOpen} onClick={() => setLiteracyOpen((open) => !open)}>
        <span className="flex items-center gap-2 font-[family-name:var(--font-brea-display)] text-2xl"><BookOpen className="h-5 w-5 text-brea-rose-deep" aria-hidden /> How Do We Understand Scientific Research?</span>
        <ArrowRight className={cn("h-4 w-4 shrink-0 transition-transform", literacyOpen && "rotate-90")} aria-hidden />
      </LearnButton>
      {literacyOpen && <div className="brea-fade-in mt-4 grid gap-3 sm:grid-cols-2">
        {RESEARCH_LITERACY.map((entry) => <div key={entry.term} className="rounded-2xl border border-brea-blush/60 bg-brea-ivory p-4"><p className="font-[family-name:var(--font-brea-display)] text-lg">{T(entry.term)}</p><p className="mt-1 text-sm leading-relaxed text-brea-sage-deep">{entry.definition}</p></div>)}
        <p className="text-sm leading-relaxed text-brea-sage-deep sm:col-span-2">Studies have different strengths and {T("limitations", "Study limitations")}, and one publication rarely answers every scientific question. Terms like {T("peer-reviewed research", "Peer-reviewed research")} and {T("clinical evidence", "Clinical evidence")} are in MedDecode.</p>
      </div>}
    </div>

    <div className="mt-5 rounded-3xl border border-brea-gold/50 bg-brea-gold/10 p-5 sm:p-6">
      <p className="flex items-center gap-2 font-[family-name:var(--font-brea-display)] text-xl"><FlaskConical className="h-5 w-5 text-brea-rose-deep" aria-hidden /> {BSE_CLARIFICATION.heading}</p>
      <p className="mt-2 text-sm leading-relaxed">{BSE_CLARIFICATION.body}</p>
    </div>

    <p className="mt-4 text-xs leading-relaxed text-brea-sage-deep">Research summaries are general educational information, not personal screening or diagnosis guidance.</p>

    <Dialog open={openStudy !== undefined} onOpenChange={(open) => { if (!open) setOpenId(null); }}>
      <DialogContent lang="en" className="brea-learning brea-sheet max-h-[85dvh] gap-3 overflow-y-auto rounded-t-3xl border-brea-sage/30 bg-brea-ivory p-6 text-brea-charcoal sm:max-w-xl sm:rounded-3xl">
        {openStudy && <>
          <DialogTitle className="font-[family-name:var(--font-brea-display)] text-3xl font-medium leading-snug">Brea Explains</DialogTitle>
          <DialogDescription className="text-brea-sage-deep">{openStudy.title}</DialogDescription>
          <StudyExplains study={openStudy} onClose={() => setOpenId(null)} />
        </>}
      </DialogContent>
    </Dialog>
    <MedDecode requested={term} onRequestHandled={() => setTerm(undefined)} />
  </section>;
}
