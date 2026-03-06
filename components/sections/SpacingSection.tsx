"use client";

import SectionHeader from "@/components/SectionHeader";
import { spacingScale } from "@/data/visualizationData";
import { useMemo, useState } from "react";

export default function SpacingSection() {
  const [scale, setScale] = useState(1);
  const [unit, setUnit] = useState<"px" | "rem">("px");

  const scaledValues = useMemo(() => {
    return spacingScale.map((space) => Math.round(space * scale));
  }, [scale]);

  const renderLabel = (value: number) => {
    if (unit === "rem") {
      return `${(value / 16).toFixed(2)}rem`;
    }
    return `${value}px`;
  };

  return (
    <section id="spacing" className="space-y-6">
      <SectionHeader title="Spacing Scale" subtitle="Rhythm + density" />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="card card-hover card-glass-luxe card-refract grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {scaledValues.map((space, index) => (
            <div key={`${space}-${index}`} className="flex items-center gap-3">
              <div className="rounded-md bg-primary" style={{ width: space, height: 12 }} />
              <span className="text-xs text-muted">{renderLabel(space)}</span>
            </div>
          ))}
        </div>
        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Spacing controls</h3>
          <label className="flex flex-col gap-2 text-sm">
            Scale ({scale.toFixed(2)}x)
            <input
              type="range"
              min={0.6}
              max={1.6}
              step={0.05}
              value={scale}
              onChange={(event) => setScale(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Units
            <select
              className="control-input"
              value={unit}
              onChange={(event) => setUnit(event.target.value as "px" | "rem")}
            >
              <option value="px">Pixels</option>
              <option value="rem">Rem</option>
            </select>
          </label>
          <div className="rounded-lg border border-border bg-surface-2 p-4">
            <div className="text-xs text-muted">Stack preview</div>
            <div className="mt-3 flex flex-col" style={{ gap: `${scaledValues[3]}px` }}>
              {["Header", "Body", "CTA"].map((label) => (
                <div key={label} className="rounded-md bg-primary/20 px-3 py-2 text-xs">
                  {label} · gap {renderLabel(scaledValues[3])}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4">
            <div className="text-xs text-muted">Rhythm wave</div>
            <div className="mt-3 h-16 rounded-md rhythm-wave" />
          </div>
        </div>
      </div>
    </section>
  );
}
