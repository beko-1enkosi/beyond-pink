import { useState } from "react";
import { BookOpenText, Check } from "lucide-react";
import { CHANGES, NORMAL_CARDS, type ChangeId, type NormalCardId } from "@/lib/brea/changes-data";
import { cn } from "@/lib/utils";
import { LearnButton } from "@/components/brea/learn/LearnPrimitives";

const TONES: [string, string, string, string] = ["var(--brea-skin-1)", "var(--brea-skin-2)", "var(--brea-skin-3)", "var(--brea-skin-4)"];

/** Small inclusive chest figure; `flat` draws a flatter chest. */
function MiniChest({ tone, flat, asym }: { tone: string; flat?: boolean; asym?: boolean }) {
  return <svg viewBox="0 0 120 90" className="h-20 w-full" aria-hidden><path d="M10 88 Q14 30 40 18 Q60 12 80 18 Q106 30 110 88 Z" fill={tone} />{flat ? <><path d="M30 52 Q44 60 56 52 M64 52 Q76 60 90 52" stroke="var(--brea-charcoal)" strokeOpacity=".35" fill="none" strokeWidth="1.5" /><circle cx="43" cy="50" r="2.4" fill="var(--brea-charcoal)" fillOpacity=".45" /><circle cx="77" cy="50" r="2.4" fill="var(--brea-charcoal)" fillOpacity=".45" /></> : <><path d={`M24 46 Q30 ${asym ? 74 : 70} 44 ${asym ? 72 : 68} Q56 66 58 50`} stroke="var(--brea-charcoal)" strokeOpacity=".35" fill="none" strokeWidth="1.5" /><path d="M62 50 Q64 64 76 66 Q90 66 96 46" stroke="var(--brea-charcoal)" strokeOpacity=".35" fill="none" strokeWidth="1.5" /><circle cx="43" cy={asym ? 62 : 58} r="3" fill="var(--brea-charcoal)" fillOpacity=".45" /><circle cx="78" cy="57" r="3" fill="var(--brea-charcoal)" fillOpacity=".45" /></>}</svg>;
}

function NormalArt({ id }: { id: NormalCardId }) {
  if (id === "shape") return <div className="grid grid-cols-4 gap-2" role="img" aria-label="Four chest illustrations in different skin tones: rounder breasts, slightly uneven breasts, smaller breasts and a flatter chest."><MiniChest tone={TONES[0]} /><MiniChest tone={TONES[2]} asym /><MiniChest tone={TONES[1]} /><MiniChest tone={TONES[3]} flat /></div>;
  if (id === "feel") return <svg viewBox="0 0 320 90" className="h-24 w-full" role="img" aria-label="Three textured circles showing that breast tissue can feel soft, firm or uneven."><title>Different textures</title>{[{ x: 55, l: "Soft", d: 3 }, { x: 160, l: "Firm", d: 6 }, { x: 265, l: "Uneven", d: 10 }].map((t, i) => <g key={t.l}><circle cx={t.x} cy="40" r="32" fill={TONES[i + 1]} opacity=".85" />{Array.from({ length: t.d }, (_, j) => <circle key={j} cx={t.x - 16 + ((j * 13) % 32)} cy={26 + ((j * 7) % 28)} r={2 + (j % 3)} fill="var(--brea-ivory)" opacity=".45" />)}<text x={t.x} y="86" textAnchor="middle" fontSize="12" fill="var(--brea-sage-deep)">{t.l}</text></g>)}</svg>;
  return <svg viewBox="0 0 320 90" className="h-24 w-full" role="img" aria-label="A gentle vine with five leaves for puberty, monthly cycle, pregnancy, breastfeeding and menopause."><title>Changes through life</title><path d="M10 60 Q90 20 160 50 T310 40" stroke="var(--brea-sage-deep)" fill="none" strokeWidth="2" />{["Puberty", "Cycle", "Pregnancy", "Feeding", "Menopause"].map((l, i) => <g key={l}><ellipse cx={30 + i * 64} cy={i % 2 ? 36 : 50} rx="9" ry="15" fill={i % 2 ? "var(--brea-blush)" : "var(--brea-sage)"} transform={`rotate(${i % 2 ? 30 : -30} ${30 + i * 64} ${i % 2 ? 36 : 50})`} /><text x={30 + i * 64} y="84" textAnchor="middle" fontSize="11" fill="var(--brea-sage-deep)">{l}</text></g>)}</svg>;
}

export function NormalCards({ seen, onSee }: { seen: readonly NormalCardId[]; onSee: (id: NormalCardId) => void }) {
  const [open, setOpen] = useState<NormalCardId | null>(null);
  const current = NORMAL_CARDS.find((c) => c.id === open);
  return <div className="mt-6"><div role="group" aria-label="What's normal for you" className="grid gap-3 sm:grid-cols-3">{NORMAL_CARDS.map((card, i) => <button key={card.id} type="button" aria-pressed={open === card.id} onClick={() => { setOpen(card.id); onSee(card.id); }} className={cn("min-h-11 rounded-2xl border bg-brea-paper p-5 text-left shadow-brea-soft transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep motion-reduce:transition-none motion-reduce:hover:translate-y-0", open === card.id ? "border-brea-rose/60 bg-brea-blush/15" : "border-brea-sage/25")}><span className="flex items-center justify-between font-[family-name:var(--font-brea-display)] text-sm italic text-brea-rose-deep">0{i + 1}{seen.includes(card.id) && <Check className="h-4 w-4 text-brea-sage-deep" aria-label="Explored" />}</span><span className="mt-2 block font-[family-name:var(--font-brea-display)] text-2xl">{card.title}</span><span className="mt-2 block text-sm leading-relaxed text-brea-sage-deep">{card.summary}</span></button>)}</div>{current && <div key={current.id} className="brea-fade-in mt-4 rounded-2xl border border-brea-sage/20 bg-brea-paper/70 p-5" aria-live="polite"><NormalArt id={current.id} /><p className="mt-3 text-sm leading-relaxed">{current.detail}</p></div>}</div>;
}

/** Skin swatches showing that colour and texture changes can look different on different skin tones. */
function SkinExamples() {
  return <figure className="mt-4"><svg viewBox="0 0 320 96" className="h-24 w-full" role="img" aria-label="Four skin-tone swatches. On lighter skin a change may look pink or red; on darker skin it may look purple, darker brown or be harder to see. Each shows small dimples like orange peel."><title>Skin changes on different skin tones</title>{TONES.map((t, i) => <g key={t}><circle cx={40 + i * 80} cy="42" r="32" fill={t} /><circle cx={48 + i * 80} cy="38" r="15" style={{ fill: `color-mix(in oklab, var(--brea-rose) ${[85, 65, 40, 25][i]}%, var(--brea-charcoal))` }} opacity={[0.55, 0.5, 0.5, 0.45][i]} />{Array.from({ length: 8 }, (_, j) => <circle key={j} cx={30 + i * 80 + (j % 4) * 7} cy={30 + Math.floor(j / 4) * 9} r="1.4" fill="var(--brea-charcoal)" opacity=".35" />)}</g>)}</svg><figcaption className="text-xs leading-relaxed text-brea-sage-deep">Simplified examples only. Redness may look pink or red on lighter skin, but purple, darker brown or less visible on darker skin.</figcaption></figure>;
}

export function ChangesExplorer({ explored, onExplore, onTerm }: { explored: readonly ChangeId[]; onExplore: (id: ChangeId) => void; onTerm: (term: string) => void }) {
  const [active, setActive] = useState<ChangeId | null>(null);
  const current = CHANGES.find((c) => c.id === active);
  const select = (id: ChangeId) => { setActive(id); onExplore(id); };
  return <div className="mt-6">
    <figure className="relative mx-auto max-w-md overflow-visible rounded-3xl border border-brea-sage/20 bg-brea-paper p-3 shadow-brea-soft">
      <svg viewBox="0 0 400 320" className="h-auto w-full" role="img" aria-labelledby="changes-art-title changes-art-desc"><title id="changes-art-title">Breast and underarm awareness illustration</title><desc id="changes-art-desc">A simplified, softly drawn chest with one breast, nipple, areola, the underarm and collarbone. Lettered markers A to G show areas where changes worth noticing may appear. This illustration is educational and cannot diagnose anything.</desc>
        <path d="M60 320 Q50 160 110 70 Q150 30 230 34 Q330 40 360 120 L380 320 Z" fill="var(--brea-skin-2)" opacity=".55" />
        <path d="M120 44 Q200 58 300 46" stroke="var(--brea-sage-deep)" strokeOpacity=".45" strokeWidth="2" fill="none" />
        <path d="M70 120 Q90 70 140 64" stroke="var(--brea-sage-deep)" strokeOpacity=".4" strokeWidth="2" fill="none" strokeDasharray="4 5" />
        <path d="M120 150 Q130 290 240 290 Q340 286 335 150" fill="var(--brea-skin-2)" opacity=".7" />
        <circle cx="250" cy="222" r="22" fill="var(--brea-skin-3)" opacity=".7" /><circle cx="250" cy="222" r="7" fill="var(--brea-skin-4)" opacity=".8" />
        {[0, 1, 2].map((i) => <ellipse key={i} cx={92 + i * 9} cy={96 + i * 10} rx="6" ry="4" fill="var(--brea-sage)" opacity=".55" />)}
        <g opacity=".35" fill="var(--brea-sage)"><ellipse cx="360" cy="40" rx="8" ry="18" transform="rotate(30 360 40)" /><ellipse cx="34" cy="300" rx="8" ry="18" transform="rotate(-30 34 300)" /></g>
        {current && <circle cx={current.x} cy={current.y} r="30" fill="var(--brea-blush)" opacity=".55" className="brea-fade-in" />}
      </svg>
      {CHANGES.map((c) => <button key={c.id} type="button" onClick={() => select(c.id)} aria-pressed={active === c.id} aria-label={`${c.letter}: ${c.name}`} style={{ left: `${(c.x / 400) * 100}%`, top: `${(c.y / 320) * 100}%` }} className={cn("absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-sm font-semibold shadow-brea-soft transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep focus-visible:ring-offset-2 motion-reduce:transition-none", active === c.id ? "border-brea-rose-deep bg-brea-rose-deep text-brea-ivory" : explored.includes(c.id) ? "border-brea-sage-deep bg-brea-sage/80 text-brea-charcoal" : "border-brea-sage-deep bg-brea-ivory text-brea-sage-deep")}>{c.letter}</button>)}
      {current && <span role="tooltip" className="brea-anatomy-tooltip" style={{ left: `${(current.x / 400) * 100}%`, top: `calc(${(current.y / 320) * 100}% - 26px)` }}>{current.name}</span>}
      <figcaption className="sr-only">Select a lettered marker or a card below to learn about each change.</figcaption>
    </figure>
    <p className="mt-4 text-center text-xs text-brea-sage-deep" aria-live="polite">You’ve explored {explored.length} of {CHANGES.length} changes.</p>
    <div role="group" aria-label="Changes worth noticing" className="mt-4 grid gap-2 sm:grid-cols-2">{CHANGES.map((c) => <LearnButton key={c.id} aria-pressed={active === c.id} onClick={() => select(c.id)} className={cn("justify-start rounded-2xl px-4 text-left text-sm", active === c.id && "border-brea-rose/60 bg-brea-blush/20")}><span className="font-[family-name:var(--font-brea-display)] italic text-brea-rose-deep">{c.letter}</span>{c.name}{explored.includes(c.id) && <Check className="ml-auto" aria-label="Explored" />}</LearnButton>)}</div>
    {current ? <div key={current.id} className="brea-fade-in mt-5 rounded-2xl border-l-2 border-brea-rose bg-brea-paper/70 p-5" aria-live="polite"><h3 className="text-3xl">{current.name}</h3><p className="mt-3 text-sm leading-relaxed">{current.text}</p><p className="mt-3 text-sm leading-relaxed text-brea-sage-deep">{current.more}</p>{current.id === "skin" && <SkinExamples />}<div className="mt-4 flex flex-wrap gap-2">{current.terms.map((t) => <LearnButton key={t} onClick={() => onTerm(t)} className="min-h-9 border-brea-rose/40 px-3 py-1.5 text-xs text-brea-rose-deep hover:bg-brea-blush/25"><BookOpenText className="h-3.5 w-3.5" /> Decode “{t}”</LearnButton>)}</div></div> : <p className="mt-5 text-sm text-brea-sage-deep">Tap any marker or card, in any order. You don’t need to explore every one to continue.</p>}
  </div>;
}
