import type { ReactNode } from "react";

/** Anchor section shell. Content is supplied per-section in later steps. */
export function PageSection({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} aria-label={label} className="min-h-[50vh]">
      {children}
    </section>
  );
}
