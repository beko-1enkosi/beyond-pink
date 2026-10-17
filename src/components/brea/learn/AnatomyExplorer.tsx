import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { ANATOMY, type AnatomyId } from "@/lib/brea/learning-data";
import { cn } from "@/lib/utils";
import { LearnButton } from "./LearnPrimitives";
// Simplified lateral cross-section: chest wall posterior (left), nipple anterior
// (right); gland clusters feed converging ducts; nodes are in the upper axilla.
export function BreastIllustration({ inside = true, selected, onSelect }: { inside?: boolean; selected?: AnatomyId | undefined; onSelect?: (id: AnatomyId) => void }) {
  const colour = (id: AnatomyId, normal: string) => selected === id ? "var(--brea-sage-deep)" : normal;
  return <svg viewBox="0 0 440 390" className="mx-auto block w-full max-w-lg" role="img" aria-label={inside ? "Simplified side-view breast anatomy, with nearby underarm lymph nodes above the breast" : "External side view of a breast"}>
    <path d="M95 51 C111 104 109 170 107 230 L105 337" fill="none" stroke="var(--brea-sage)" strokeWidth="18" opacity=".22" />
    <path d="M119 110 C192 92 269 109 296 168 C316 200 321 221 340 234 L359 238 Q374 247 358 253 L339 256 C308 287 272 326 206 332 C159 337 124 324 115 311 Z" fill="var(--brea-anatomy)" stroke="var(--brea-sage)" strokeWidth="2" />
    {inside && <g className="brea-fade-in">
      <path d="M124 121 C176 104 265 119 294 174 L322 238 C302 284 257 319 199 322 L122 308 Z" fill={colour("fat", "var(--brea-anatomy)")} opacity=".6" />
      <path d="M125 138 Q225 155 304 217 M125 208 Q220 202 305 237 M122 274 Q202 267 300 253 M139 318 Q180 281 192 128" fill="none" stroke={colour("connective", "var(--brea-sage)")} strokeWidth="2" strokeDasharray="4 5" opacity=".65" />
      <path d="M190 164 Q225 191 334 245 M174 227 Q243 228 334 245 M190 284 Q250 272 334 245 M232 184 Q278 218 334 245" fill="none" stroke={colour("ducts", "var(--brea-blush)")} strokeWidth="5" strokeLinecap="round" />
      {([[180,160],[162,220],[179,283],[222,175]] as const).map(([x,y],i) => <g key={i} fill={colour("lobules", "var(--brea-blush)")} stroke="var(--brea-paper)" strokeWidth="1.5">{([[0,0],[-12,-11],[10,-12],[-14,9],[12,9],[0,18]] as const).map(([dx,dy],j) => <ellipse key={j} cx={x + dx} cy={y + dy} rx="10" ry="8" />)}</g>)}
      <path d="M123 108 Q132 93 140 79 Q144 64 134 49" fill="none" stroke="var(--brea-sage)" strokeWidth="2" />
      {[[130,58],[143,76],[127,91]].map(([x,y],i) => <ellipse key={i} cx={x} cy={y} rx="9" ry="6" transform={`rotate(-30 ${x} ${y})`} fill={colour("nodes", "var(--brea-sage)")} />)}
      <text x="161" y="64" fontSize="12" fill="var(--brea-sage-deep)">Underarm / axilla</text>
      <text x="52" y="354" fontSize="12" fill="var(--brea-sage-deep)">Chest wall</text>
      <path d="M92 343 L104 320" stroke="var(--brea-sage)" />
    </g>}
    <path d="M318 220 Q332 244 318 272" fill="none" stroke={colour("areola", "var(--brea-blush)")} strokeWidth="11" strokeLinecap="round" />
    <path d="M339 235 L356 238 Q369 246 354 251 L337 256" fill={colour("nipple", "var(--brea-blush)")} stroke="var(--brea-sage)" />
    {onSelect && ANATOMY.filter((part) => inside || part.id === "nipple" || part.id === "areola").map((part,index) => <g key={part.id} role="button" tabIndex={0} aria-label={`Explore ${part.name}`} aria-pressed={selected === part.id} className="brea-hotspot cursor-pointer" onClick={() => onSelect(part.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(part.id); } }}><title>{part.name}</title><circle cx={part.x} cy={part.y} r="22" fill="transparent" /><circle cx={part.x} cy={part.y} r="12" fill={selected === part.id ? "var(--brea-sage-deep)" : "var(--brea-paper)"} stroke="var(--brea-sage-deep)" strokeWidth="1.5" /><text x={part.x} y={part.y + 4} textAnchor="middle" fontSize="10" fill={selected === part.id ? "var(--brea-ivory)" : "var(--brea-sage-deep)"}>{index + 1}</text></g>)}
  </svg>;
}
export function AnatomyExplorer({ explored, onExplore }: { explored: AnatomyId[]; onExplore: (id: AnatomyId) => void }) {
  const [inside, setInside] = useState(false);
  const [selected, setSelected] = useState<AnatomyId>();
  const part = ANATOMY.find((item) => item.id === selected);
  const select = (id: AnatomyId) => { if (id !== "areola" && id !== "nipple") setInside(true); setSelected(id); onExplore(id); };
  return <section aria-label="Breast anatomy explorer">
    <div className="flex flex-wrap justify-center gap-2"><LearnButton aria-pressed={!inside} className={!inside ? "bg-brea-sage/20" : ""} onClick={() => { setInside(false); setSelected(undefined); }}>External View</LearnButton><LearnButton aria-pressed={inside} className={inside ? "bg-brea-sage/20" : ""} onClick={() => setInside(true)}>Inside the Breast</LearnButton></div>
    <div className="relative mt-4 rounded-3xl border border-brea-sage/20 bg-brea-paper px-1 py-4 sm:px-8">
      {part && <div role="status" className="brea-anatomy-tooltip brea-fade-in" style={{ left: `${Math.max(23, Math.min(76, part.x / 440 * 100))}%`, top: `${Math.max(7, part.y / 390 * 100 - 10)}%` }}>{part.name}</div>}
      <BreastIllustration inside={inside} selected={selected} onSelect={select} />
      {!inside && <LearnButton className="mx-auto flex max-w-full text-xs sm:text-sm" onClick={() => setInside(true)}>Tap to look beneath the surface <ArrowRight /></LearnButton>}
      <p className="mt-3 text-center text-xs text-brea-sage-deep">Simplified educational illustration · not medical imaging</p>
    </div>
    <div className="mt-5 flex items-center justify-between gap-2 text-xs text-brea-sage-deep"><span>Explore at your own pace</span><span aria-live="polite">You’ve explored {explored.length} of 8 parts.</span></div>
    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">{ANATOMY.map((item) => <LearnButton key={item.id} aria-pressed={selected === item.id} onClick={() => select(item.id)} className={cn("justify-start rounded-xl px-3 text-xs", selected === item.id && "border-brea-sage-deep bg-brea-sage/20")}><span>{item.name}</span>{explored.includes(item.id) && <Check className="ml-auto" />}</LearnButton>)}</div>
    <div className="mt-5 min-h-32 border-l-2 border-brea-blush bg-brea-sage/8 px-5 py-4" aria-live="polite">{part ? <div key={part.id} className="brea-fade-in"><h3 className="text-2xl">{part.name}</h3><p className="mt-2 text-sm leading-relaxed">{part.text}</p></div> : <><h3 className="text-2xl">A little curiosity goes a long way.</h3><p className="mt-2 text-sm leading-relaxed">Choose a numbered part or a label to explore its role.</p></>}</div>
  </section>;
}
