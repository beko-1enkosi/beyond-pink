import { useEffect, useRef, useState } from "react";

const COUNT_DURATION = 1800;
const FINAL_VALUE_PAUSE = 2000;

/** Observe each actual number, not the tall statistics group on narrow screens. */
export function useVisibleCount(value: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let pause = 0;
    let disposed = false;

    const stop = () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(pause);
      frame = 0;
      pause = 0;
    };
    const animate = () => {
      if (disposed || !visible || document.hidden || motion.matches) return;
      setCount(0);
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, Math.max(0, (now - started) / COUNT_DURATION));
        setCount(value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
        else pause = window.setTimeout(animate, FINAL_VALUE_PAUSE);
      };
      frame = window.requestAnimationFrame(tick);
    };
    const sync = () => {
      stop();
      setCount(value);
      animate();
    };

    // Discount the sticky navigation area so covered numbers don't start early.
    const observer = new IntersectionObserver(([entry]) => {
      const next = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.5);
      if (next === visible) return;
      visible = next;
      sync();
    }, { threshold: [0, 0.5], rootMargin: "-72px 0px 0px 0px" });
    observer.observe(element);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [value]);

  return { ref, count };
}