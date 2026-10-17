import { useEffect, useRef, type ReactNode } from "react";

/** Default-visible markup; animation is a one-shot progressive enhancement. */
export function Reveal({ children, className, delay = 0, contents = false }: {
  children: ReactNode; className?: string; delay?: number; contents?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const animations: Animation[] = [];
    const targets = contents ? [...element.querySelectorAll<HTMLElement>("h2, p, li")].filter((target) => !target.parentElement?.closest("li")) : [element];
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (motion.matches || !(entry.target instanceof HTMLElement) || !entry.target.animate) continue;
        const stagger = entry.target.tagName === "LI" ? [...(entry.target.parentElement?.children ?? [])].indexOf(entry.target) * 120 : 0;
        animations.push(entry.target.animate([
          { opacity: 0, translate: "0 20px" },
          { opacity: 1, translate: "0 0" },
        ], { duration: 700, delay: delay + stagger, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "backwards" }));
      }
    }, { threshold: 0, rootMargin: "-72px 0px -24px 0px" });
    const stop = () => { if (motion.matches) animations.forEach((animation) => animation.cancel()); };
    targets.forEach((target) => observer.observe(target));
    motion.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      motion.removeEventListener("change", stop);
    };
  }, [delay, contents]);
  return <div ref={ref} className={className} data-landing-reveal>{children}</div>;
}