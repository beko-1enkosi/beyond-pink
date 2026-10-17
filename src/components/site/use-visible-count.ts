import { useEffect, useRef, useState } from "react";

const COUNT_DURATION = 3000;

/**
 * Count up once per page load, only while the actual number is at least half
 * visible; the final value then stays on screen until a full page reload.
 */
export function useVisibleCount(value: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let played = false;
    let frame = 0;
    let disposed = false;

    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };
    const showFinal = () => {
      played = true;
      setCount(value);
    };
    const animate = () => {
      if (disposed) return;
      played = true;
      if (motion.matches) {
        showFinal();
        return;
      }
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
    };

    // Discount the sticky navigation area so covered numbers don't start early.
    const observer = new IntersectionObserver(([entry]) => {
      const next = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.5);
      if (next === visible) return;
      visible = next;
      if (next && !played) animate();
      else if (!next && frame) {
        // Leaving mid-count: settle on the final value instead of a partial number.
        stop();
        showFinal();
      }
    }, { threshold: [0, 0.5], rootMargin: "-72px 0px 0px 0px" });

    const sync = () => {
      if (motion.matches) {
        stop();
        showFinal();
      } else if (!document.hidden && visible && !played) {
        animate();
      }
    };

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
