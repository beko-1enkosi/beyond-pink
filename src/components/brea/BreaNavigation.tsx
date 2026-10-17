import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, House, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { restartBreaDemo } from "@/lib/brea/onboarding";
import { cn } from "@/lib/utils";

export function BreaHomeButton({ className }: { className?: string }) {
  return <Button asChild variant="ghost" className={cn("brea-nav-capsule", className)}><Link to="/brea/home"><House aria-hidden /> Brea Home</Link></Button>;
}

export function BeyondPinkButton() {
  return <Button asChild variant="ghost" className="brea-nav-capsule brea-nav-filled"><Link to="/"><ArrowLeft aria-hidden /> Back to BeyondPink <ArrowRight aria-hidden /></Link></Button>;
}

export function RestartDemoButton() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const restart = async () => {
    if (busy) return;
    setBusy(true); setError("");
    try {
      if (await restartBreaDemo(true)) window.location.assign("/brea");
    } catch {
      setError("We couldn’t clear all saved Brea data. Close other Brea tabs, then try again.");
      setBusy(false);
    }
  };
  return <AlertDialog open={open} onOpenChange={(value) => { if (!busy) { setOpen(value); setError(""); } }}>
    <AlertDialogTrigger asChild><Button variant="ghost" className="brea-nav-capsule"><RotateCcw aria-hidden /> Restart Demo</Button></AlertDialogTrigger>
    <AlertDialogContent lang="en" className="brea-learning max-h-[85dvh] w-[calc(100%-40px)] overflow-y-auto rounded-2xl border-brea-blush/50 bg-brea-ivory p-6 text-brea-charcoal shadow-brea-lift">
      <AlertDialogTitle className="font-[family-name:var(--font-brea-display)] text-3xl font-medium text-brea-rose-deep">Start a fresh Brea demo?</AlertDialogTitle>
      <AlertDialogDescription className="text-sm leading-relaxed text-brea-charcoal">This will remove your saved demo name, learning progress, badges, support achievements and community interactions from this browser.</AlertDialogDescription>
      {error && <p role="alert" className="text-sm text-brea-rose-deep">{error}</p>}
      <div className="flex flex-wrap justify-end gap-3">
        <AlertDialogCancel asChild><Button variant="ghost" disabled={busy} className="brea-nav-capsule mt-0">Cancel</Button></AlertDialogCancel>
        <Button variant="ghost" disabled={busy} className="brea-nav-capsule brea-nav-filled" onClick={() => void restart()}><RotateCcw aria-hidden />{busy ? "Restarting…" : "Restart Demo"}</Button>
      </div>
    </AlertDialogContent>
  </AlertDialog>;
}