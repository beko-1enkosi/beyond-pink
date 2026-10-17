import { useEffect, useRef, useState } from "react";

const COUNT_DURATION = 3000;

/** SSR finals stay readable; enhanced counters start once their own card enters view. */
export function useVisibleCount(value: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    let frame = 0;
    let disposed = false;
    let played = false;
    const stop = () => { window.cancelAnimationFrame(frame); frame = 0; };
    const showFinal = () => { stop(); played = true; setCount(value); };
    const target = element.closest("figure") ?? element;
    const observer = new IntersectionObserver((entries) => {
      if (played || !entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.2)) return;
      played = true;
      observer.disconnect();
      if (motion.matches) { showFinal(); return; }
      setCount(0);
      const started = performance.now();
      const tick = (now: number) => {
        if (disposed) return;
        const progress = Math.min(1, Math.max(0, (now - started) / COUNT_DURATION));
        setCount(value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
        else frame = 0;
      };
      frame = window.requestAnimationFrame(tick);
    }, { threshold: [0, 0.2], rootMargin: "-72px 0px -24px 0px" });
    // Only prepare zero after successful observer setup; unsupported browsers keep finals.
    observer.observe(target);
    setCount(0);
    const sync = () => { if (motion.matches) showFinal(); };
    motion.addEventListener("change", sync);
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      motion.removeEventListener("change", sync);
    };
  }, [value]);

  return { ref, count };
}
