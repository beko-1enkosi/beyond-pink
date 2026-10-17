import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Pause, Play, RotateCcw } from "lucide-react";
import { CHECK_CAPTIONS, QUADRANTS, WHOLE_AREA, type QuadrantId, type WholeAreaId } from "@/lib/brea/changes-data";
import { cn } from "@/lib/utils";
import { LearnButton } from "@/components/brea/learn/LearnPrimitives";

type Side = "left" | "right";
// Front view: the person's left breast appears on the viewer's right. "Outer" always means toward that person's arm/underarm.
// Quadrant wedge order per side: [upper-outer, upper-inner, lower-outer, lower-inner].
const WEDGES: Record<Side, [string, string, string, string]> = {
  left: ["M100 20 A80 80 0 0 0 20 100 L100 100 Z", "M100 20 A80 80 0 0 1 180 100 L100 100 Z", "M20 100 A80 80 0 0 0 100 180 L100 100 Z", "M180 100 A80 80 0 0 1 100 180 L100 100 Z"],
  right: ["M100 20 A80 80 0 0 1 180 100 L100 100 Z", "M100 20 A80 80 0 0 0 20 100 L100 100 Z", "M180 100 A80 80 0 0 0 100 180 L100 100 Z", "M20 100 A80 80 0 0 1 100 180 L100 100 Z"],
};
const LABELS: Record<Side, Record<QuadrantId, [number, number]>> = {
  left: { "upper-outer": [46, 62], "upper-inner": [154, 62], "lower-outer": [46, 138], "lower-inner": [154, 138] },
  right: { "upper-outer": [154, 62], "upper-inner": [46, 62], "lower-outer": [154, 138], "lower-inner": [46, 138] },
};
// Checking-demo hand path anchor points per quadrant, per side.
const HAND_SPOTS: Record<Side, Record<QuadrantId, [number, number][]>> = {
  left: {
    "upper-outer": [[52, 52], [68, 44], [84, 52], [60, 68]],
    "upper-inner": [[148, 52], [132, 44], [116, 52], [140, 68]],
    "lower-outer": [[52, 148], [68, 156], [84, 148], [60, 132]],
    "lower-inner": [[148, 148], [132, 156], [116, 148], [140, 132]],
  },
  right: {
    "upper-outer": [[148, 52], [132, 44], [116, 52], [140, 68]],
    "upper-inner": [[52, 52], [68, 44], [84, 52], [60, 68]],
    "lower-outer": [[148, 148], [132, 156], [116, 148], [140, 132]],
    "lower-inner": [[52, 148], [68, 156], [84, 148], [60, 132]],
  },
};

function BreastFigure({ side, active, onSelect, labelledBy }: { side: Side; active: QuadrantId | null; onSelect?: (id: QuadrantId) => void; labelledBy: string }) {
  const wedges = WEDGES[side];
  return <svg viewBox="0 0 200 200" className="h-auto w-full" role="img" aria-labelledby={labelledBy}>
    <circle cx="100" cy="100" r="80" fill="var(--brea-skin-2)" opacity=".55" />
    {QUADRANTS.map((q, i) => <path key={q.id} d={wedges[i]} fill={active === q.id ? "var(--brea-blush)" : "var(--brea-blush)"} opacity={active === q.id ? 0.75 : 0.28} className={cn("transition-opacity duration-300 motion-reduce:transition-none", active === q.id && "brea-quadrant-glow")} />)}
    <circle cx="100" cy="100" r="80" fill="none" stroke="var(--brea-sage-deep)" strokeOpacity=".5" strokeWidth="2" />
    <path d="M20 100 H180 M100 20 V180" stroke="var(--brea-sage-deep)" strokeOpacity=".4" strokeWidth="1.5" strokeDasharray="5 5" />
    <circle cx="100" cy="100" r="12" fill="var(--brea-skin-3)" opacity=".8" /><circle cx="100" cy="100" r="4" fill="var(--brea-skin-4)" opacity=".9" />
    {QUADRANTS.map((q) => { const [x, y] = LABELS[side][q.id]; return <text key={q.id} x={x} y={y} textAnchor="middle" fontSize="10" fill="var(--brea-sage-deep)" className="pointer-events-none select-none">{q.name.replace(" Quadrant", "")}</text>; })}
    {onSelect && QUADRANTS.map((q, i) => <path key={`hit-${q.id}`} d={wedges[i]} fill="transparent" className="cursor-pointer" onClick={() => onSelect(q.id)}><title>{q.name}</title></path>)}
  </svg>;
}

export function QuadrantExplorer({ explored, onExplore }: { explored: readonly QuadrantId[]; onExplore: (id: QuadrantId) => void }) {
  const [side, setSide] = useState<Side>("left");
  const [active, setActive] = useState<QuadrantId | null>(null);
  const current = QUADRANTS.find((q) => q.id === active);
  const select = (id: QuadrantId) => { setActive(id); onExplore(id); };
  return <div className="mt-6">
    <div role="group" aria-label="Choose which breast to view" className="flex justify-center gap-2">
      {(["left", "right"] as const).map((s) => <LearnButton key={s} aria-pressed={side === s} onClick={() => setSide(s)} className={cn("min-h-11 px-5 text-sm", side === s && "border-brea-sage-deep bg-brea-sage/20")}>{s === "left" ? "Left Breast" : "Right Breast"}</LearnButton>)}
    </div>
    <figure className="relative mx-auto mt-4 max-w-sm rounded-3xl border border-brea-sage/20 bg-brea-paper p-4 shadow-brea-soft">
      <BreastFigure side={side} active={active} onSelect={select} labelledBy="quadrant-art" />
      <span id="quadrant-art" className="sr-only">A simplified educational front-view diagram of the {side} breast divided into four quadrants by gentle guides through the nipple. Outer means toward the arm; inner means toward the centre of the chest. This is not a diagnostic image.</span>
      {current && (() => { const [lx, ly] = LABELS[side][current.id] ?? [50, 50]; return <span role="tooltip" className="brea-anatomy-tooltip" style={{ left: `${lx / 2}%`, top: `calc(${ly / 2}% - 30px)` }}>{current.name}</span>; })()}
    </figure>
    <p className="mt-3 text-center text-xs text-brea-sage-deep">A simplified educational diagram — not a diagnostic image. “Outer” is toward the arm; “inner” is toward the centre of the chest.</p>
    <p className="mt-3 text-center text-xs text-brea-sage-deep" aria-live="polite">You’ve explored {explored.length} of {QUADRANTS.length} quadrants.</p>
    <div role="group" aria-label="Breast quadrants" className="mt-4 grid gap-2 sm:grid-cols-2">{QUADRANTS.map((q) => <LearnButton key={q.id} aria-pressed={active === q.id} onClick={() => select(q.id)} className={cn("justify-start rounded-2xl px-4 text-left text-sm", active === q.id && "border-brea-rose/60 bg-brea-blush/20")}>{q.name}{explored.includes(q.id) && <Check className="ml-auto" aria-label="Explored" />}</LearnButton>)}</div>
    {current ? <div key={current.id} className="brea-fade-in mt-5 rounded-2xl border-l-2 border-brea-rose bg-brea-paper/70 p-5" aria-live="polite"><h3 className="text-3xl">{current.name}</h3><p className="mt-3 text-sm leading-relaxed">{current.text}</p><p className="mt-3 text-sm leading-relaxed text-brea-sage-deep">A quadrant describes a location only — it cannot tell you whether something is harmless or serious.</p></div> : <p className="mt-5 text-sm text-brea-sage-deep">Tap any quadrant, in any order. You don’t need to explore them all to continue.</p>}
  </div>;
}

const SPOT_DURATION = 1400;
export function CheckingDemo({ onTerm }: { onTerm: (term: string) => void }) {
  const [side, setSide] = useState<Side>("left");
  const [quadrant, setQuadrant] = useState<QuadrantId>("upper-outer");
  const [spot, setSpot] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(() => { setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    timer.current = window.setInterval(() => setSpot((s) => (s + 1) % 4), SPOT_DURATION);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [playing, reduced, quadrant, side]);
  const spots = HAND_SPOTS[side][quadrant];
  const qi = QUADRANTS.findIndex((q) => q.id === quadrant);
  const step = (delta: number) => { const next = QUADRANTS[(qi + delta + QUADRANTS.length) % QUADRANTS.length]; setQuadrant(next.id); setSpot(0); };
  return <div className="mt-6">
    <div className="flex flex-wrap justify-center gap-2">
      {(["left", "right"] as const).map((s) => <LearnButton key={s} aria-pressed={side === s} onClick={() => { setSide(s); setSpot(0); }} className={cn("min-h-11 px-4 text-xs", side === s && "border-brea-sage-deep bg-brea-sage/20")}>{s === "left" ? "Left Breast" : "Right Breast"}</LearnButton>)}
    </div>
    <figure className="relative mx-auto mt-4 max-w-sm rounded-3xl border border-brea-sage/20 bg-brea-paper p-4 shadow-brea-soft">
      <svg viewBox="0 0 200 200" className="h-auto w-full" role="img" aria-label={`Gentle checking demonstration on the ${QUADRANTS[qi].name.toLowerCase()} of the ${side} breast. An illustrated hand uses the pads of the middle three fingers in small circular movements.`}>
        <BreastFigure side={side} active={quadrant} labelledBy="demo-art" />
        <span id="demo-art" className="sr-only">Educational demonstration diagram, not a diagnostic image.</span>
        {reduced ? spots.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="11" fill="var(--brea-ivory)" stroke="var(--brea-sage-deep)" strokeWidth="1.5" /><text x={x} y={y + 3.5} textAnchor="middle" fontSize="10" fill="var(--brea-sage-deep)">{i + 1}</text></g>) : <g className={playing ? "brea-hand-drift" : undefined} style={playing ? { animationDuration: `${SPOT_DURATION * 4}ms` } : undefined}>
          <circle cx={spots[spot][0]} cy={spots[spot][1]} r="14" fill="var(--brea-blush)" opacity=".5" className="brea-fade-in" key={`${quadrant}-${spot}`} />
          <g transform={`translate(${spots[spot][0] - 12} ${spots[spot][1] - 12})`}><ellipse cx="12" cy="14" rx="9" ry="7" fill="var(--brea-skin-3)" /><rect x="5" y="2" width="4.5" height="10" rx="2.2" fill="var(--brea-skin-3)" /><rect x="10" y="0" width="4.5" height="12" rx="2.2" fill="var(--brea-skin-3)" /><rect x="15" y="2" width="4.5" height="10" rx="2.2" fill="var(--brea-skin-3)" /></g>
        </g>}
      </svg>
    </figure>
    <p className="mt-3 text-center text-sm" aria-live="polite">{reduced ? `Step ${spot + 1} of 4: ${CHECK_CAPTIONS[Math.min(spot, 2)]}` : CHECK_CAPTIONS[Math.min(spot, CHECK_CAPTIONS.length - 1)]}</p>
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {reduced ? <><LearnButton onClick={() => setSpot((s) => Math.max(0, s - 1))} disabled={spot === 0} className="min-h-11 px-4 text-xs"><ArrowLeft /> Previous Step</LearnButton><LearnButton onClick={() => setSpot((s) => Math.min(3, s + 1))} disabled={spot === 3} className="min-h-11 px-4 text-xs">Next Step <ArrowRight /></LearnButton></> : <>
        <LearnButton onClick={() => setPlaying((p) => !p)} className="min-h-11 px-4 text-xs">{playing ? <><Pause /> Pause</> : <><Play /> Play</>}</LearnButton>
        <LearnButton onClick={() => { setSpot(0); setPlaying(true); }} className="min-h-11 px-4 text-xs"><RotateCcw /> Replay</LearnButton>
      </>}
      <LearnButton onClick={() => step(-1)} className="min-h-11 px-4 text-xs"><ArrowLeft /> Previous Quadrant</LearnButton>
      <LearnButton onClick={() => step(1)} className="min-h-11 px-4 text-xs">Next Quadrant <ArrowRight /></LearnButton>
    </div>
    <ol className="mt-5 space-y-2">{CHECK_CAPTIONS.map((c, i) => <li key={c} className="flex gap-3 rounded-xl border border-brea-sage/20 bg-brea-paper/70 px-4 py-3 text-sm"><span className="font-[family-name:var(--font-brea-display)] italic text-brea-rose-deep">{i + 1}.</span>{c}</li>)}</ol>
    <aside className="mt-5 rounded-2xl border border-brea-rose/35 bg-brea-blush/15 p-5 text-sm leading-relaxed"><p>Feeling your breasts or chest can help you become familiar with your usual tissue, but it cannot reliably determine whether cancer is present.</p><p className="mt-2">Some cancers cannot be felt. <button type="button" onClick={() => onTerm("Breast awareness")} className="underline underline-offset-4 decoration-dotted">Breast awareness</button> does not replace recommended screening or assessment by healthcare professionals, and no self-examination pattern has been shown to reduce breast cancer deaths.</p></aside>
  </div>;
}

const REGION_ART: Record<WholeAreaId, { x: number; y: number; r: number }> = {
  "nipple-areola": { x: 200, y: 150, r: 18 },
  around: { x: 200, y: 150, r: 58 },
  "upper-chest": { x: 200, y: 74, r: 26 },
  underarm: { x: 92, y: 92, r: 24 },
  whole: { x: 200, y: 150, r: 82 },
};
export function WholeAreaExplorer({ explored, onExplore }: { explored: readonly WholeAreaId[]; onExplore: (id: WholeAreaId) => void }) {
  const [active, setActive] = useState<WholeAreaId | null>(null);
  const current = WHOLE_AREA.find((r) => r.id === active);
  const select = (id: WholeAreaId) => { setActive(id); onExplore(id); };
  return <div className="mt-6">
    <figure className="relative mx-auto max-w-sm rounded-3xl border border-brea-sage/20 bg-brea-paper p-4 shadow-brea-soft">
      <svg viewBox="0 0 400 300" className="h-auto w-full" role="img" aria-label="A simplified upper-body outline showing the whole awareness area: nipple and areola, tissue around the breast, upper chest toward the collarbone, underarm and the whole breast or chest.">
        <path d="M60 300 Q50 160 110 70 Q150 30 230 34 Q330 40 360 120 L380 300 Z" fill="var(--brea-skin-2)" opacity=".5" />
        <path d="M120 44 Q200 58 300 46" stroke="var(--brea-sage-deep)" strokeOpacity=".45" strokeWidth="2" fill="none" />
        <circle cx="200" cy="150" r="62" fill="var(--brea-skin-2)" opacity=".7" />
        <circle cx="200" cy="150" r="14" fill="var(--brea-skin-3)" opacity=".8" /><circle cx="200" cy="150" r="5" fill="var(--brea-skin-4)" opacity=".9" />
        {[0, 1, 2].map((i) => <ellipse key={i} cx={86 + i * 8} cy={86 + i * 9} rx="5" ry="3.5" fill="var(--brea-sage)" opacity=".6" />)}
        {WHOLE_AREA.map((r) => { const a = REGION_ART[r.id]; const on = active === r.id; return <circle key={r.id} cx={a.x} cy={a.y} r={a.r} fill="var(--brea-blush)" opacity={on ? 0.6 : explored.includes(r.id) ? 0.3 : 0.14} stroke="var(--brea-rose)" strokeWidth={on ? 2.5 : 1.5} strokeDasharray={r.id === "whole" ? "6 5" : undefined} className="cursor-pointer transition-opacity duration-300 motion-reduce:transition-none" onClick={() => select(r.id)}><title>{r.name}</title></circle>; })}
      </svg>
    </figure>
    <div role="group" aria-label="Areas beyond the four quadrants" className="mt-4 grid gap-2 sm:grid-cols-2">{WHOLE_AREA.map((r) => <LearnButton key={r.id} aria-pressed={active === r.id} onClick={() => select(r.id)} className={cn("justify-start rounded-2xl px-4 text-left text-sm", active === r.id && "border-brea-rose/60 bg-brea-blush/20")}>{r.name}{explored.includes(r.id) && <Check className="ml-auto" aria-label="Explored" />}</LearnButton>)}</div>
    {current ? <div key={current.id} className="brea-fade-in mt-5 rounded-2xl border-l-2 border-brea-rose bg-brea-paper/70 p-5" aria-live="polite"><h3 className="text-3xl">{current.name}</h3><p className="mt-3 text-sm leading-relaxed">{current.text}</p></div> : <p className="mt-5 text-sm text-brea-sage-deep">Tap any highlighted area to learn why it’s included.</p>}
  </div>;
}
