import { useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import type { CareFacility } from "@/lib/brea/care-data";
import { CARE_TYPES } from "@/lib/brea/care-data";
import type { CareLocation } from "@/lib/brea/care";
import { LearnButton } from "../learn/LearnPrimitives";
import { Maximize, RefreshCw } from "lucide-react";

type Props = { facilities: CareFacility[]; selected: string | null; location: CareLocation | null; onSelect: (id: string, scroll: boolean) => void };
export function CareMap({ facilities, selected, location, onSelect }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef(new Map<string, LeafletMarker>());
  const popupRoots = useRef<Root[]>([]);
  const callbacks = useRef(onSelect);
  callbacks.current = onSelect;
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [tileFailed, setTileFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    let observer: ResizeObserver | undefined;
    let instance: LeafletMap | null = null;
    setStatus("loading");
    setTileFailed(false);
    void import("leaflet").then((module) => {
      if (cancelled || !container.current) return;
      const L = module.default;
      instance = L.map(container.current, { scrollWheelZoom: false, zoomAnimation: !window.matchMedia("(prefers-reduced-motion: reduce)").matches }).setView([-28.5, 25], 5);
      map.current = instance;
      const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors' });
      tiles.on("tileerror", () => { if (!cancelled) setTileFailed(true); });
      tiles.addTo(instance);
      observer = new ResizeObserver(() => instance?.invalidateSize());
      observer.observe(container.current);
      setStatus("ready");
    }).catch(() => { if (!cancelled) setStatus("failed"); });
    return () => { cancelled = true; observer?.disconnect(); instance?.remove(); map.current = null; markers.current.clear(); popupRoots.current.forEach((root) => root.unmount()); popupRoots.current = []; };
  }, [attempt]);

  useEffect(() => {
    if (status !== "ready" || !map.current) return;
    let cancelled = false;
    const instance = map.current;
    void import("leaflet").then((module) => {
      if (cancelled) return;
      const L = module.default;
      markers.current.forEach((marker) => marker.remove());
      markers.current.clear();
      popupRoots.current.forEach((root) => root.unmount());
      popupRoots.current = [];
      facilities.forEach((facility) => {
        if (!facility.coordinates) return;
        const icon = L.divIcon({ className: `brea-care-pin brea-care-pin-${facility.type}`, html: '<span aria-hidden="true"></span>', iconSize: [30, 36], iconAnchor: [15, 36], popupAnchor: [0, -36] });
        const marker = L.marker([facility.coordinates[0], facility.coordinates[1]], { icon, title: facility.name, alt: facility.name, keyboard: true });
        const content = document.createElement("div");
        content.className = "brea-care-popup";
        const root = createRoot(content);
        popupRoots.current.push(root);
        root.render(<><strong>{facility.name}</strong><p>{CARE_TYPES[facility.type]} · {facility.city}</p><p>{facility.description}</p><LearnButton onClick={() => callbacks.current(facility.id, true)} className="bg-brea-sage-deep px-3 py-2 text-xs text-brea-ivory hover:bg-brea-sage-deeper hover:text-brea-ivory">View Details</LearnButton></>);
        marker.bindPopup(content, { maxWidth: 270, autoPan: true }).addTo(instance);
        marker.on("click", () => callbacks.current(facility.id, false));
        markers.current.set(facility.id, marker);
        marker.getElement()?.classList.toggle("brea-care-pin-selected", facility.id === selected);
      });
      if (location) instance.setView([location.latitude, location.longitude], 7, { animate: false });
      else if (facilities.length === 14) instance.setView([-28.5, 25], 5, { animate: false });
      else {
        const points = facilities.flatMap((facility) => facility.coordinates ? [[facility.coordinates[0], facility.coordinates[1]] as [number, number]] : []);
        if (points.length) instance.fitBounds(points, { padding: [45, 45], maxZoom: 11, animate: false });
        else instance.setView([-28.5, 25], 5, { animate: false });
      }
    });
    return () => { cancelled = true; };
  }, [facilities, location, status]);

  useEffect(() => {
    markers.current.forEach((marker, id) => marker.getElement()?.classList.toggle("brea-care-pin-selected", id === selected));
    if (!selected) return;
    const marker = markers.current.get(selected);
    if (marker && map.current) { map.current.panTo(marker.getLatLng(), { animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches }); marker.openPopup(); }
  }, [selected, facilities]);

  return <section aria-label="Map of South African care facilities" className="min-w-0">
    <div className="relative isolate overflow-hidden rounded-2xl border border-brea-sage/30 bg-brea-sage/10 shadow-brea-soft">
      <div ref={container} className="brea-care-map h-[340px] w-full sm:h-[430px]" aria-label="Interactive care map. Use arrow keys to pan and plus or minus to zoom." />
      {status !== "ready" && <div role="status" className="absolute inset-0 z-[1000] flex flex-col items-center justify-center gap-3 bg-brea-ivory p-6 text-center text-sm"><p>{status === "loading" ? "Loading South Africa’s care map…" : "The map couldn’t load. All directory listings are still available below."}</p>{status === "failed" && <LearnButton onClick={() => setAttempt((value) => value + 1)}><RefreshCw /> Retry Map</LearnButton>}</div>}
    </div>
    {tileFailed && <p role="status" className="mt-3 text-sm text-brea-rose-deep">Some map tiles couldn’t load. You can still search the listings below. <LearnButton className="min-h-0 px-2 py-1 text-xs" onClick={() => setAttempt((value) => value + 1)}>Retry Map</LearnButton></p>}
    <div className="mt-3 flex flex-wrap items-center justify-between gap-3"><div aria-label="Map legend" className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-brea-sage-deep">{Object.entries(CARE_TYPES).map(([type, label]) => <span key={type} className="flex items-center gap-2"><span className={`brea-care-legend brea-care-pin-${type}`} />{label}</span>)}</div><LearnButton className="px-3 py-2 text-xs" onClick={() => map.current?.setView([-28.5, 25], 5, { animate: false })}><Maximize className="h-4 w-4" /> South Africa View</LearnButton></div>
  </section>;
}