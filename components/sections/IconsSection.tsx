"use client";

import SectionHeader from "@/components/SectionHeader";
import { iconSet } from "@/data/visualizationData";
import { useMemo, useState } from "react";

export default function IconsSection() {
  const [size, setSize] = useState(28);
  const [stroke, setStroke] = useState(2);
  const [query, setQuery] = useState("");
  const [colorToken, setColorToken] = useState("--color-primary");

  const filteredIcons = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return iconSet;
    return iconSet.filter((icon) => icon.name.toLowerCase().includes(term));
  }, [query]);

  return (
    <section id="icons" className="space-y-6">
      <SectionHeader title="Icon Set" subtitle="Inline SVG" />
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Icon controls</h3>
          <label className="flex flex-col gap-2 text-sm">
            Search icons
            <input
              className="control-input"
              placeholder="Search icons..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Size ({size}px)
            <input
              type="range"
              min={16}
              max={48}
              step={1}
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Stroke ({stroke}px)
            <input
              type="range"
              min={1}
              max={3}
              step={0.5}
              value={stroke}
              onChange={(event) => setStroke(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Color token
            <select
              className="control-input"
              value={colorToken}
              onChange={(event) => setColorToken(event.target.value)}
            >
              <option value="--color-primary">Primary</option>
              <option value="--color-secondary">Secondary</option>
              <option value="--color-success">Success</option>
              <option value="--color-warn">Warning</option>
              <option value="--color-danger">Danger</option>
            </select>
          </label>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            Use 1.5–2px stroke for UI icons, 2.5–3px for display/hero icons.
          </div>
        </div>
        <div className="card card-hover card-prism-border card-refract grid gap-6 p-6 sm:grid-cols-3 lg:grid-cols-4">
          {filteredIcons.map((icon) => (
            <div key={icon.name} className="flex flex-col items-center gap-2 text-sm">
              <svg
                viewBox="0 0 24 24"
                style={{ width: size, height: size, color: `var(${colorToken})` }}
                fill="none"
                stroke="currentColor"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={icon.path} />
              </svg>
              {icon.name}
            </div>
          ))}
          {filteredIcons.length === 0 && (
            <div className="col-span-full rounded-lg border border-dashed border-border bg-surface-2 p-6 text-center text-xs text-muted">
              No icons match that search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
