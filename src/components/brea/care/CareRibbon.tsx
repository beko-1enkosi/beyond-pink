const RIBBON_BACK = "M21 18 L34 38 L27 42 L15 24 Z";
const RIBBON_FRONT = "M12 6 Q20 1 28 6 C34 14 25 23 12 42 L5 38 L20 17 C25 11 24 8 20 8 C15 8 14 12 18 17 L14 23 C6 15 7 10 12 6 Z";

export function CareRibbon() {
  return <svg viewBox="0 0 40 48" aria-hidden="true" className="brea-care-ribbon"><path d={RIBBON_BACK} className="brea-care-ribbon-back" /><path d={RIBBON_FRONT} /></svg>;
}

// The same geometry serves React's legend and Leaflet's DOM-only marker icons.
export const CARE_RIBBON_HTML = `<svg viewBox="0 0 40 48" aria-hidden="true" class="brea-care-ribbon"><path d="${RIBBON_BACK}" class="brea-care-ribbon-back"/><path d="${RIBBON_FRONT}"/></svg>`;