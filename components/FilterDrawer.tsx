"use client";

import { useState } from "react";
import FilterSidebarContent, { type FilterSidebarProps } from "./FilterSidebarContent";

export default function FilterDrawer(props: FilterSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile trigger — floating pill at bottom */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 h-12 font-mono uppercase"
        style={{ background: "#0a0a0a", color: "#fafafa", fontSize: 12, letterSpacing: "0.1em" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="16" y2="12" />
          <line x1="4" y1="18" x2="12" y2="18" />
        </svg>
        Filter{props.activeFilters.length > 0 ? ` · ${props.activeFilters.length}` : ""}
      </button>

      {/* Mobile full-screen overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col" style={{ background: "#fafafa" }}>
          {/* Header */}
          <div
            className="flex items-center justify-between px-6 shrink-0"
            style={{ height: 64, borderBottom: "1px solid #e7e4df" }}
          >
            <span style={{ fontWeight: 600, fontSize: 15 }}>Filter</span>
            <button onClick={() => setOpen(false)} style={{ fontSize: 24, color: "#373939", lineHeight: 1 }}>
              ×
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 pb-32">
            <FilterSidebarContent {...props} />
          </div>

          {/* Footer CTA */}
          <div className="shrink-0 px-6 py-4" style={{ borderTop: "1px solid #e7e4df" }}>
            <button
              onClick={() => setOpen(false)}
              className="w-full h-12 flex items-center justify-center font-mono uppercase"
              style={{ background: "#0a0a0a", color: "#fafafa", fontSize: 12, letterSpacing: "0.1em" }}
            >
              Ergebnisse anzeigen
            </button>
          </div>
        </div>
      )}
    </>
  );
}
