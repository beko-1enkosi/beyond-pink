import { useEffect, useRef, useState, type ReactNode } from "react";

export function TourReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const node = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!node || motion.matches || !("IntersectionObserver" in window)) return;
    if (node.getBoundingClientRect().top > window.innerHeight) setVisible(false);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.08 });
    const show = () => { if (motion.matches) { setVisible(true); observer.disconnect(); } };
    motion.addEventListener("change", show);
    observer.observe(node);
    return () => { observer.disconnect(); motion.removeEventListener("change", show); };
  }, []);
  return <div ref={ref} data-visible={visible} className={`tour-reveal ${className}`}>{children}</div>;
}

export function BotanicalSketch({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 180 210" fill="none" aria-hidden="true" className={`tour-botanical ${className}`}>
    <path d="M48 200 C100 161 73 118 101 59 C107 44 116 33 133 20 M89 107 C111 102 128 82 137 62 M70 152 C46 136 33 122 24 104" stroke="var(--sage)" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M84 120 C59 116 52 99 48 83 C68 84 83 103 84 120Z M99 76 C117 73 125 58 126 42 C107 49 103 61 99 76Z M70 153 C93 155 108 147 117 132 C97 129 81 139 70 153Z M115 89 C143 97 156 85 161 71 C140 70 122 78 115 89Z" fill="var(--sage)" fillOpacity=".24" stroke="var(--olive)" strokeWidth=".8" />
    <g stroke="var(--brea-rose)" strokeWidth="1.2" transform="translate(132 24)">
      <path d="M0 0 C-14 -1 -17 -16 -8 -16 C-3 -17 0 -8 0 0 C2 -15 14 -19 17 -11 C20 -4 7 0 0 0 C16 3 19 13 11 16 C4 19 0 7 0 0 C-1 15 -12 19 -16 12 C-21 4 -7 0 0 0Z" fill="var(--blush)" />
      <circle r="2.5" fill="var(--brea-gold)" />
    </g>
    <path d="M23 100 C16 87 7 99 23 104 C36 91 22 82 23 100Z M145 154 l3 -10 3 10 10 3 -10 3 -3 10 -3 -10 -10 -3Z" stroke="var(--brea-rose)" strokeWidth="1.2" />
    <path d="M107 181 Q151 174 150 151 Q151 141 143 146 Q137 157 159 168" stroke="var(--sage)" strokeWidth="1.2" strokeDasharray="2 6" strokeLinecap="round" />
  </svg>;
}

export function SketchConnector({ reverse = false, short = false }: { reverse?: boolean; short?: boolean }) {
  return <TourReveal className={`tour-connector ${reverse ? "tour-connector-reverse" : ""} ${short ? "tour-connector-short" : ""}`}>
    <svg className="tour-arrow-desktop" viewBox="0 0 840 180" fill="none" aria-hidden="true">
      <path className="tour-drawn" pathLength="1" d="M90 14 C98 65 230 69 331 62 C437 57 463 100 438 114 C413 128 398 103 427 86 C475 58 655 106 741 162" />
      <path className="tour-drawn tour-arrowhead" pathLength="1" d="M715 153 Q735 158 741 162 Q739 145 732 134" />
      <path d="M93 19 C97 68 233 73 322 65" className="tour-pencil" />
      <path d="M310 113 Q331 137 363 124" className="tour-dots" />
      <path d="M575 59 C564 38 550 64 575 70 C600 49 576 35 575 59Z M235 110 l3 -8 3 8 8 3 -8 3 -3 8 -3 -8 -8 -3Z" className="tour-doodle" />
    </svg>
    <svg className="tour-arrow-mobile" viewBox="0 0 140 160" fill="none" aria-hidden="true">
      <path className="tour-drawn" pathLength="1" d="M66 5 C112 35 105 66 74 70 C39 75 28 47 47 39 C75 26 88 114 65 146" />
      <path className="tour-drawn tour-arrowhead" pathLength="1" d="M50 130 Q59 144 65 146 Q75 138 80 129" />
      <path d="M112 91 C120 83 127 94 115 100 C102 94 104 85 112 91Z" className="tour-doodle" />
      <path d="M31 98 Q25 117 42 125" className="tour-dots" />
    </svg>
  </TourReveal>;
}