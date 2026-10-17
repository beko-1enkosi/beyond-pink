import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Flag, Heart, ImagePlus, MessageCircle, MoreHorizontal, PenLine, Trash2, X } from "lucide-react";
import { BreaWordmark } from "@/components/brea/BreaLogo";
import { LearnButton, LearnShell, PrimaryButton } from "@/components/brea/learn/LearnPrimitives";
import { LearningProfile } from "@/components/brea/learn/LearnPanels";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useLearning } from "@/lib/brea/learning";
import { useChanges } from "@/lib/brea/changes";
import { useSupport } from "@/lib/brea/support";
import {
  addComment, deletePost, imagesSupported, makePost, removeImage, reportItem, saveImage, setReaction, useCommunity, useStoredImage, type CommunityState, type GardenPost,
} from "@/lib/brea/community";
import { COMMENT_LIMIT, COMMUNITY_GUIDELINES, HEART_REACTIONS, IMAGE_MAX_BYTES, IMAGE_TYPES, POST_LIMIT, REPORT_REASONS, SEED_POSTS, type HeartReactionId, type ReportReasonId, type SeedPost } from "@/lib/brea/community-data";
import { cn } from "@/lib/utils";

const card = "rounded-2xl border border-brea-blush/45 bg-brea-cream shadow-brea-lift";
const AVATAR_FILLS = ["var(--brea-blush)", "var(--brea-sage)", "var(--brea-gold)", "var(--brea-rose)", "var(--brea-sage-deep)", "var(--brea-anatomy)", "var(--brea-blush)"];

/** Small circular botanical avatar — a simple flower, varied by palette index. */
function GardenAvatar({ index, className }: { index: number; className?: string }) {
  const fill = AVATAR_FILLS[index % AVATAR_FILLS.length];
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("h-10 w-10 shrink-0 rounded-full border border-brea-sage/30 bg-brea-ivory", className)}>
      <g fill={fill} opacity=".85">{[0, 72, 144, 216, 288].map((d) => <ellipse key={d} cx="20" cy="13" rx="4" ry="7" transform={`rotate(${d} 20 20)`} />)}</g>
      <circle cx="20" cy="20" r="3.5" fill="var(--brea-gold)" />
      <path d="M20 27 Q19 33 16 36 M20 27 Q22 33 25 35" stroke="var(--brea-sage-deep)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Header illustration: several flowers growing together. */
function GardenIllustration() {
  const flower = (x: number, h: number, fill: string, r: number) => (
    <g key={x}>
      <path d={`M${x} 190 Q${x - 3} ${190 - h / 2} ${x} ${190 - h}`} stroke="var(--brea-sage-deep)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx={x - 9} cy={190 - h / 2} rx="5" ry="10" transform={`rotate(-35 ${x - 9} ${190 - h / 2})`} fill="var(--brea-sage)" opacity=".7" />
      <ellipse cx={x + 9} cy={190 - h / 2 - 8} rx="5" ry="10" transform={`rotate(35 ${x + 9} ${190 - h / 2 - 8})`} fill="var(--brea-sage)" opacity=".55" />
      <g fill={fill}>{[0, 72, 144, 216, 288].map((d) => <ellipse key={d} cx={x} cy={190 - h - 10} rx={r * 0.55} ry={r} transform={`rotate(${d} ${x} ${190 - h})`} />)}</g>
      <circle cx={x} cy={190 - h} r={r * 0.45} fill="var(--brea-gold)" />
    </g>
  );
  return (
    <svg viewBox="0 0 320 200" className="h-auto w-full max-w-xs" role="img" aria-label="Illustration of several different flowers growing together">
      <path d="M10 192 Q160 182 310 192" stroke="var(--brea-sage)" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".6" />
      {flower(70, 90, "var(--brea-blush)", 12)}
      {flower(130, 120, "var(--brea-rose)", 13)}
      {flower(195, 80, "var(--brea-blush)", 10)}
      {flower(250, 105, "var(--brea-sage)", 11)}
      <circle cx="35" cy="60" r="2.5" fill="var(--brea-gold)" /><circle cx="290" cy="45" r="2.5" fill="var(--brea-gold)" /><circle cx="165" cy="30" r="2" fill="var(--brea-gold)" />
    </svg>
  );
}

type FeedPost = {
  id: string; name: string; avatar: number; when: string; text: string;
  image?: string | undefined; imageId?: string | undefined; imageAlt?: string | undefined;
  counts: Record<HeartReactionId, number>; total: number; myReaction: HeartReactionId | null; own: boolean;
  comments: { id: string; name: string; text: string; when: string }[];
};

/** Deterministically spreads a seed post's fictional support total across the five hearts. */
const BASE_WEIGHTS = [5, 4, 2, 3, 4];
function seedCounts(total: number, seedIndex: number): Record<HeartReactionId, number> {
  const weights = BASE_WEIGHTS.map((_, i) => BASE_WEIGHTS[(i + seedIndex) % BASE_WEIGHTS.length]!);
  const sum = weights.reduce((a, b) => a + b, 0);
  const counts = {} as Record<HeartReactionId, number>;
  let assigned = 0;
  HEART_REACTIONS.forEach((r, i) => {
    const n = i === HEART_REACTIONS.length - 1 ? total - assigned : Math.round((total * weights[i]!) / sum);
    counts[r.id] = n;
    assigned += n;
  });
  return counts;
}

function toFeed(state: CommunityState): FeedPost[] {
  const seeds: FeedPost[] = SEED_POSTS.map((s: SeedPost, i) => {
    const counts = seedCounts(s.support, i);
    const mine = state.reactions[s.id] ?? null;
    if (mine) counts[mine] += 1;
    return {
      id: s.id, name: s.name, avatar: s.avatar, when: s.when, text: s.text, image: s.image, imageAlt: s.imageAlt,
      counts, total: s.support + (mine ? 1 : 0), myReaction: mine, own: false,
      comments: [...s.comments, ...(state.comments[s.id] ?? [])],
    };
  });
  const own: FeedPost[] = state.posts.map((p: GardenPost) => {
    const counts = Object.fromEntries(HEART_REACTIONS.map((r) => [r.id, 0])) as Record<HeartReactionId, number>;
    const mine = state.reactions[p.id] ?? null;
    if (mine) counts[mine] = 1;
    return {
      id: p.id, name: p.name, avatar: p.avatar, when: p.when, text: p.text, imageId: p.imageId, imageAlt: p.imageAlt,
      counts, total: mine ? 1 : 0, myReaction: mine, own: true, comments: state.comments[p.id] ?? [],
    };
  });
  return [...own, ...seeds].filter((p) => !state.hidden.includes(p.id));
}

function PostImage({ post }: { post: FeedPost }) {
  const stored = useStoredImage(post.imageId);
  const src = post.image ?? stored;
  if (!src) return null;
  return <img src={src} alt={post.imageAlt ?? ""} loading="lazy" className="mt-4 w-full rounded-xl border border-brea-sage/20 object-cover" />;
}

function ReportDialog({ target, onDone, onClose }: { target: { id: string; kind: "post" | "comment" } | null; onDone: (reason: ReportReasonId, hide: boolean) => void; onClose: () => void }) {
  const [reason, setReason] = useState<ReportReasonId>("unkind");
  const [hide, setHide] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => { if (target) { setReason("unkind"); setHide(true); setConfirmed(false); } }, [target]);
  return (
    <Dialog open={target !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent lang="en" closeLabel="Close report panel" className="brea-learning brea-sheet max-h-[85dvh] overflow-y-auto rounded-t-3xl border-brea-sage/20 bg-brea-ivory p-6 text-brea-charcoal sm:max-w-md sm:rounded-3xl">
        <DialogTitle className="font-[family-name:var(--font-brea-display)] text-3xl font-medium">Report This {target?.kind === "comment" ? "Comment" : "Post"}</DialogTitle>
        {confirmed ? (
          <div className="brea-fade-in mt-4" aria-live="polite">
            <p className="text-sm leading-relaxed">Thank you. This {target?.kind} has been flagged locally on this device{hide ? " and hidden from your view" : ""}.</p>
            <p className="mt-2 text-xs leading-relaxed text-brea-sage-deep">This is a simulated demo action — no real moderators review reports, and nothing leaves your browser.</p>
            <PrimaryButton className="mt-5" onClick={onClose}>Done</PrimaryButton>
          </div>
        ) : (
          <>
            <DialogDescription className="mt-1 text-brea-sage-deep">Reporting is simulated in this demo — it flags the item only on your device.</DialogDescription>
            <div role="radiogroup" aria-label="Reason for reporting" className="mt-4 space-y-2">
              {REPORT_REASONS.map((r) => (
                <button key={r.id} role="radio" aria-checked={reason === r.id} onClick={() => setReason(r.id)} className={cn("flex min-h-11 w-full items-center rounded-xl border px-4 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep motion-reduce:transition-none", reason === r.id ? "border-brea-rose/50 bg-brea-blush/25" : "border-brea-sage/25 bg-brea-paper hover:bg-brea-sage/10")}>{r.label}</button>
              ))}
            </div>
            <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-3 text-sm">
              <input type="checkbox" checked={hide} onChange={(e) => setHide(e.target.checked)} className="h-4 w-4 accent-[var(--brea-rose)]" />
              Hide this {target?.kind} from my view
            </label>
            <div className="mt-5 flex flex-wrap gap-3">
              <LearnButton onClick={onClose}>Cancel</LearnButton>
              <PrimaryButton onClick={() => { onDone(reason, hide); setConfirmed(true); }}><Flag aria-hidden className="h-4 w-4" /> Flag Locally</PrimaryButton>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PostCard({ post, state, onReact, onComment, onReport, onDelete }: {
  post: FeedPost; state: CommunityState;
  onReact: (reaction: HeartReactionId | null) => void; onComment: (text: string) => void; onReport: (id: string, kind: "post" | "comment") => void; onDelete?: (() => void) | undefined;
}) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [pinned, setPinned] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [burst, setBurst] = useState<HeartReactionId | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pickerOpen = pinned || hoverOpen;
  const mine = post.myReaction ? HEART_REACTIONS.find((r) => r.id === post.myReaction) : null;
  const hiddenComments = post.comments.filter((c) => !state.hidden.includes(c.id));
  const shown = (expanded ? hiddenComments : hiddenComments.slice(0, 2));

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  useEffect(() => {
    if (!pinned) return;
    const close = (e: MouseEvent) => { if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setPinned(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [pinned]);

  const choose = (id: HeartReactionId) => {
    const removing = post.myReaction === id;
    onReact(removing ? null : id);
    if (!removing) {
      setBurst(id);
      window.setTimeout(() => setBurst(null), 850);
    }
    setPinned(false); setHoverOpen(false);
  };

  const submit = () => {
    const text = draft.trim();
    if (!text) { setError("Please write a few kind words first."); return; }
    onComment(text);
    setDraft(""); setError(""); setExpanded(true);
  };

  return (
    <article className={cn(card, "brea-fade-in p-5 sm:p-6")} aria-label={`Post by ${post.name}`}>
      <div className="flex items-start gap-3">
        <GardenAvatar index={post.avatar} />
        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-brea-display)] text-lg leading-tight">{post.name}</p>
          <p className="text-xs text-brea-sage-deep">{post.when}</p>
        </div>
        <div className="relative" ref={menuRef}>
          <button type="button" aria-label={`Options for post by ${post.name}`} aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)} className="flex h-11 w-11 items-center justify-center rounded-full text-brea-sage-deep hover:bg-brea-sage/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep">
            <MoreHorizontal aria-hidden className="h-5 w-5" />
          </button>
          {menuOpen && (
            <div role="menu" className="absolute right-0 top-12 z-20 w-52 rounded-xl border border-brea-sage/25 bg-brea-paper p-1.5 shadow-brea-soft">
              <button role="menuitem" type="button" onClick={() => { setMenuOpen(false); onReport(post.id, "post"); }} className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-left text-sm hover:bg-brea-sage/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep"><Flag aria-hidden className="h-4 w-4" /> Report post</button>
              {post.own && onDelete && (
                <button role="menuitem" type="button" onClick={() => { setMenuOpen(false); onDelete(); }} className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-left text-sm text-brea-rose-deep hover:bg-brea-blush/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-rose-deep"><Trash2 aria-hidden className="h-4 w-4" /> Delete my post</button>
              )}
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed">{post.text}</p>
      <PostImage post={post} />
      <div className="mt-4 flex items-center gap-2 border-t border-brea-sage/15 pt-3">
        <button
          type="button"
          aria-pressed={supported}
          aria-label={supported ? `Remove your support from this post (${post.support} supporters)` : `Send support to this post (${post.support} supporters)`}
          onClick={onSupport}
          className={cn("flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-rose-deep motion-reduce:transition-none", supported ? "border-brea-rose/60 bg-brea-blush/30 text-brea-rose-deep" : "border-brea-sage/30 text-brea-sage-deep hover:bg-brea-blush/15")}
        >
          <HeartHandshake aria-hidden className="h-5 w-5" />
          <span>{supported ? "Supported" : "Support"} · {post.support}</span>
        </button>
        <span className="flex min-h-11 items-center gap-2 px-2 text-sm text-brea-sage-deep"><MessageCircle aria-hidden className="h-5 w-5" />{hiddenComments.length} {hiddenComments.length === 1 ? "comment" : "comments"}</span>
      </div>
      {shown.length > 0 && (
        <ul className="mt-3 space-y-2.5">
          {shown.map((c) => (
            <li key={c.id} className="flex items-start gap-2.5 rounded-xl bg-brea-sage/8 px-3.5 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-brea-sage-deep">{c.name} <span className="font-normal">· {c.when}</span></p>
                <p className="mt-0.5 text-sm leading-relaxed">{c.text}</p>
              </div>
              <button type="button" aria-label={`Report comment by ${c.name}`} onClick={() => onReport(c.id, "comment")} className="flex h-11 w-8 shrink-0 items-center justify-center rounded-full text-brea-sage-deep/70 hover:bg-brea-sage/10 hover:text-brea-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep"><Flag aria-hidden className="h-3.5 w-3.5" /></button>
            </li>
          ))}
        </ul>
      )}
      {hiddenComments.length > 2 && (
        <button type="button" onClick={() => setExpanded((e) => !e)} className="mt-2.5 min-h-11 rounded-full px-2 text-xs font-medium text-brea-rose-deep underline decoration-brea-rose/50 underline-offset-4 hover:decoration-brea-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-rose-deep">
          {expanded ? "Show Fewer Comments" : `View All Comments (${hiddenComments.length})`}
        </button>
      )}
      <div className="mt-3 border-t border-brea-sage/15 pt-3">
        <p className="text-xs italic text-brea-sage-deep">Be kind. Respect privacy. Everyone’s experience is different.</p>
        <div className="mt-2 flex items-start gap-2">
          <label className="sr-only" htmlFor={`comment-${post.id}`}>Add a supportive comment as {state.visitorName}</label>
          <textarea
            id={`comment-${post.id}`}
            value={draft}
            maxLength={COMMENT_LIMIT}
            rows={1}
            placeholder={`Comment as ${state.visitorName}…`}
            onChange={(e) => { setDraft(e.target.value); setError(""); }}
            className="min-h-11 flex-1 resize-none rounded-xl border border-brea-sage/30 bg-brea-paper px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep"
          />
          <LearnButton className="shrink-0 px-4 py-2 text-xs" onClick={submit}>Send</LearnButton>
        </div>
        <div className="mt-1 flex justify-between text-xs text-brea-sage-deep">
          <span role="alert">{error}</span>
          <span>{draft.length}/{COMMENT_LIMIT}</span>
        </div>
      </div>
    </article>
  );
}

function Composer({ open, onClose, state, onPublish }: { open: boolean; onClose: () => void; state: CommunityState; onPublish: (text: string, imageId?: string, imageAlt?: string, blob?: Blob) => void }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [imageNotice, setImageNotice] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) { setText(""); setFile(null); setError(""); setImageNotice(false); }
  }, [open]);
  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const chooseFile = (f: File | undefined) => {
    setError("");
    if (!f) return;
    if (!IMAGE_TYPES.includes(f.type)) { setError("Please choose a JPEG, PNG or WebP image."); return; }
    if (f.size > IMAGE_MAX_BYTES) { setError("Please choose an image smaller than 5 MB."); return; }
    setFile(f);
    if (!imagesSupported()) setImageNotice(true);
  };

  const publish = async () => {
    const message = text.trim();
    if (!message) { setError(file ? "Please add a caption or message for your image." : "Please write something before sharing."); return; }
    let imageId: string | undefined;
    if (file) {
      imageId = `img-${Date.now().toString(36)}`;
      const saved = await saveImage(imageId, file);
      if (!saved) { setImageNotice(true); imageId = undefined; }
    }
    onPublish(message, imageId, message.slice(0, 120));
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent lang="en" closeLabel="Close composer" className="brea-learning brea-sheet max-h-[88dvh] overflow-y-auto rounded-t-3xl border-brea-rose/25 bg-brea-ivory p-6 text-brea-charcoal sm:max-w-lg sm:rounded-3xl">
        <DialogTitle className="font-[family-name:var(--font-brea-display)] text-3xl font-medium">Share Your <em className="brea-em">Story.</em></DialogTitle>
        <DialogDescription className="mt-1 text-brea-sage-deep">Your words might help someone feel less alone.</DialogDescription>
        <p className="mt-3 rounded-xl border border-brea-rose/30 bg-brea-blush/20 px-3.5 py-2.5 text-xs leading-relaxed">You’ll appear as <strong>{state.visitorName}</strong> — never your personal name. Publishing adds your post to this demo feed on your device only; it is not shared with other visitors.</p>
        <label className="mt-4 block text-sm font-medium" htmlFor="garden-message">Your message</label>
        <textarea
          id="garden-message"
          value={text}
          maxLength={POST_LIMIT}
          rows={4}
          placeholder="Share something with the Garden..."
          onChange={(e) => { setText(e.target.value); setError(""); }}
          className="mt-1.5 w-full resize-y rounded-xl border border-brea-sage/30 bg-brea-paper px-3.5 py-3 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep"
        />
        <div className="mt-1 flex justify-between text-xs text-brea-sage-deep"><span role="alert">{error}</span><span>{text.length}/{POST_LIMIT}</span></div>

        {preview ? (
          <div className="brea-fade-in mt-3">
            <p className="text-xs font-medium text-brea-sage-deep">Preview</p>
            <div className={cn(card, "mt-1.5 p-4")}>
              <div className="flex items-center gap-2.5"><GardenAvatar index={state.visitorAvatar} className="h-8 w-8" /><p className="font-[family-name:var(--font-brea-display)] text-base">{state.visitorName}</p></div>
              <p className="mt-2.5 text-sm leading-relaxed">{text.trim() || "Your caption…"}</p>
              <img src={preview} alt="Preview of your uploaded image" className="mt-3 max-h-56 w-full rounded-xl border border-brea-sage/20 object-cover" />
            </div>
            <div className="mt-2 flex gap-2">
              <LearnButton className="text-xs" onClick={() => fileInput.current?.click()}>Change Image</LearnButton>
              <LearnButton className="text-xs" onClick={() => { setFile(null); setImageNotice(false); }}><X aria-hidden className="h-3.5 w-3.5" /> Remove Image</LearnButton>
            </div>
          </div>
        ) : (
          <LearnButton className="mt-3 text-xs" onClick={() => fileInput.current?.click()}><ImagePlus aria-hidden className="h-4 w-4" /> Add an Image (optional)</LearnButton>
        )}
        <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" aria-label="Upload an image" onChange={(e) => chooseFile(e.target.files?.[0])} />
        <p className="mt-3 text-xs leading-relaxed text-brea-sage-deep">Photos can reveal your identity or other people’s identities. Only share images you have permission to use, and avoid including private medical information.</p>
        {imageNotice && <p role="status" className="mt-2 rounded-lg bg-brea-blush/20 px-3 py-2 text-xs leading-relaxed">Persistent image storage isn’t available in this browser, so your image may not survive a reload. Your message will still be saved.</p>}
        <div className="mt-5 flex flex-wrap gap-3">
          <LearnButton onClick={onClose}>Cancel</LearnButton>
          <PrimaryButton onClick={() => void publish()}><PenLine aria-hidden className="h-4 w-4" /> Publish to the Garden</PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CommunityGarden() {
  const { state: learning, name } = useLearning();
  const { state: changes } = useChanges();
  const { state: support } = useSupport();
  const { state, update, storageNotice } = useCommunity();
  const [composerOpen, setComposerOpen] = useState(false);
  const [guidelinesOpen, setGuidelinesOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ id: string; kind: "post" | "comment" } | null>(null);
  const feed = toFeed(state);

  const publish = (text: string, imageId?: string, imageAlt?: string) => {
    update((s) => makePost(s, text, imageId, imageAlt));
    window.scrollTo({ top: 0 });
  };

  return (
    <LearnShell>
      <header className="flex items-center justify-between gap-3"><BreaWordmark symbolClassName="h-8 w-8" textClassName="text-2xl" /><LearningProfile state={learning} name={name} changes={changes} support={support} /></header>
      <main className="mx-auto max-w-2xl">
        <nav aria-label="Support navigation" className="mt-6 flex flex-wrap gap-x-5">
          <LearnButton asChild className="border-0 px-0 text-xs"><Link to="/brea/support"><ArrowLeft /> Back to Find Support</Link></LearnButton>
          <LearnButton asChild className="border-0 px-0 text-xs"><Link to="/brea/home">Brea Home</Link></LearnButton>
        </nav>

        <section className="grid items-center gap-6 pb-4 pt-8 sm:grid-cols-[1.3fr_1fr]">
          <div className="min-w-0">
            <p className="text-xs tracking-wide text-brea-sage-deep">BREA · THE BREA GARDEN</p>
            <h1 className="mt-3 break-words text-5xl leading-tight sm:text-6xl">Stories That <em className="brea-em">Connect</em> Us.</h1>
            <p className="mt-4 text-base leading-relaxed text-brea-sage-deep">Every story matters. Share your experience, offer kindness and find connection.</p>
          </div>
          <div className="flex justify-center"><GardenIllustration /></div>
        </section>
        <p role="note" className="rounded-xl border border-brea-gold/40 bg-brea-paper px-4 py-2.5 text-xs leading-relaxed text-brea-sage-deep">Community Demo — Example stories are fictional. Posts and interactions are visible only in your browser.</p>

        {/* Composer trigger */}
        <button
          type="button"
          onClick={() => setComposerOpen(true)}
          className="mt-6 flex min-h-14 w-full items-center gap-3 rounded-2xl border border-brea-rose/35 bg-brea-blush/30 px-5 text-left shadow-brea-soft transition-colors hover:bg-brea-blush/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-rose-deep motion-reduce:transition-none"
        >
          <GardenAvatar index={state.visitorAvatar} className="h-9 w-9" />
          <span className="flex-1 text-sm text-brea-sage-deep">Share something with the Garden...</span>
          <PenLine aria-hidden className="h-5 w-5 text-brea-rose-deep" />
        </button>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
          <button type="button" onClick={() => setGuidelinesOpen(true)} className="min-h-11 rounded-full px-2 font-medium text-brea-sage-deep underline decoration-brea-rose/50 underline-offset-4 hover:decoration-brea-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brea-sage-deep">Community Guidelines</button>
          <p className="max-w-md leading-relaxed text-brea-sage-deep">The Brea Garden is a space for connection and encouragement, not medical diagnosis or emergency assistance. <Link to="/brea/support" className="underline decoration-brea-rose/50 underline-offset-4">Find Support resources</Link></p>
        </div>

        {/* Feed */}
        <div className="mt-6 space-y-5" role="feed" aria-label="Community stories">
          {feed.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              state={state}
              onSupport={() => update((s) => toggleSupport(s, post.id))}
              onComment={(text) => update((s) => addComment(s, post.id, text))}
              onReport={(id, kind) => setReportTarget({ id, kind })}
              onDelete={post.own ? () => { if (post.imageId) void removeImage(post.imageId); update((s) => deletePost(s, post.id)); } : undefined}
            />
          ))}
          {feed.length === 0 && <p className="py-10 text-center text-sm text-brea-sage-deep">The Garden feels quiet. Everything you hid stays only on this device.</p>}
        </div>
        {storageNotice && <p role="status" className="mt-4 text-center text-xs text-brea-sage-deep">Your community activity couldn’t be saved on this device.</p>}
      </main>

      <Composer open={composerOpen} onClose={() => setComposerOpen(false)} state={state} onPublish={publish} />
      <ReportDialog target={reportTarget} onClose={() => setReportTarget(null)} onDone={(reason, hide) => { if (reportTarget) update((s) => reportItem(s, reportTarget.id, reason, hide)); }} />

      <Dialog open={guidelinesOpen} onOpenChange={setGuidelinesOpen}>
        <DialogContent lang="en" closeLabel="Close community guidelines" className="brea-learning brea-sheet max-h-[85dvh] overflow-y-auto rounded-t-3xl border-brea-sage/20 bg-brea-ivory p-6 text-brea-charcoal sm:max-w-md sm:rounded-3xl">
          <DialogTitle className="font-[family-name:var(--font-brea-display)] text-3xl font-medium">Community <em className="brea-em">Guidelines.</em></DialogTitle>
          <DialogDescription className="mt-1 text-brea-sage-deep">How we keep the Garden gentle.</DialogDescription>
          <ul className="mt-4 space-y-3">
            {COMMUNITY_GUIDELINES.map((g) => (
              <li key={g.title} className="rounded-xl border border-brea-sage/20 bg-brea-paper px-4 py-3">
                <p className="font-[family-name:var(--font-brea-display)] text-xl">{g.title}</p>
                <p className="mt-1 text-sm leading-relaxed">{g.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-brea-sage-deep">In this demo, moderation is simulated: reporting flags content only on your own device. No real moderators or clinical reviewers are involved.</p>
        </DialogContent>
      </Dialog>
    </LearnShell>
  );
}
