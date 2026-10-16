export function sectionScrollTop(sectionTop: number, scrollY: number, navbarHeight: number) {
  return Math.max(0, sectionTop + scrollY - navbarHeight);
}

export function scrollEase(progress: number) {
  const t = Math.max(0, Math.min(1, progress));
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

let cancelScroll: (() => void) | undefined;

export function scrollToSection(hash: string, waitForMenu = false) {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return;
  cancelScroll?.();
  // Preserve the router's history state and existing same-page URL behaviour.
  history.replaceState(history.state, "", hash);
  let frame = 0;
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", onKey);
  };
  const onKey = (event: KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Escape"].includes(event.key)) cancel();
  };
  cancelScroll = cancel;
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", onKey);

  const start = () => {
    if (cancelled) return;
    // A closing mobile sheet temporarily locks body scrolling; wait for its release.
    if (waitForMenu && getComputedStyle(document.body).overflow === "hidden") {
      frame = requestAnimationFrame(start);
      return;
    }
    const navbarHeight = document.querySelector('header nav[aria-label="Main"]')?.getBoundingClientRect().height ?? 72;
    const from = window.scrollY;
    // Layout offsets ignore entrance-animation transforms on the section.
    let layoutTop = 0;
    let element: HTMLElement | null = target;
    while (element) {
      layoutTop += element.offsetTop;
      element = element.offsetParent instanceof HTMLElement ? element.offsetParent : null;
    }
    const to = Math.min(
      sectionScrollTop(layoutTop, 0, navbarHeight),
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
    );
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: to, behavior: "instant" });
      cancel();
      return;
    }
    const duration = Math.min(1200, Math.max(650, Math.abs(to - from) * 0.15));
    const began = performance.now();
    const animate = (now: number) => {
      if (cancelled) return;
      const progress = Math.min(1, (now - began) / duration);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: reduced ? to : from + (to - from) * scrollEase(progress), behavior: "instant" });
      if (progress < 1 && !reduced) frame = requestAnimationFrame(animate);
      else cancel();
    };
    frame = requestAnimationFrame(animate);
  };
  frame = requestAnimationFrame(start);
}

export function installSectionScrolling() {
  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
    if (!document.getElementById(decodeURIComponent(url.hash.slice(1)))) return;
    event.preventDefault();
    scrollToSection(url.hash, Boolean(anchor.closest('[role="dialog"]')));
  };
  document.addEventListener("click", onClick);
  return () => {
    document.removeEventListener("click", onClick);
    cancelScroll?.();
  };
}