"use client";

import SectionHeader from "@/components/SectionHeader";
import { useMemo, useState, type CSSProperties } from "react";

export default function AccessibilitySection() {
  const [ringSize, setRingSize] = useState(2);
  const [contrastMode, setContrastMode] = useState<"standard" | "high">("standard");
  const [textScale, setTextScale] = useState(1);

  const contrastStyles = useMemo(() => {
    if (contrastMode === "high") {
      return {
        background: "var(--color-text)",
        color: "var(--color-bg)"
      };
    }
    return {
      background: "var(--color-surface-2)",
      color: "var(--color-text)"
    };
  }, [contrastMode]);

  return (
    <section id="accessibility" className="space-y-6">
      <SectionHeader title="Accessibility States" subtitle="Focus + contrast" />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Focus Rings</h3>
            <div className="flex flex-wrap gap-3">
              <button
                className="btn focus-ring"
                style={{ "--ring-size": `${ringSize}px` } as CSSProperties}
              >
                Focus me
              </button>
              <button
                className="btn btn-primary focus-ring"
                style={
                  { "--ring-size": `${ringSize}px`, "--ring-color": "#fff" } as CSSProperties
                }
              >
                Primary focus
              </button>
            </div>
            <p className="text-xs text-muted">Use `:focus-visible` for keyboard users.</p>
          </div>
          <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Disabled States</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn" disabled>
                Disabled button
              </button>
              <input className="control-input" disabled placeholder="Disabled input" />
            </div>
            <p className="text-xs text-muted">Ensure contrast and cursor feedback.</p>
          </div>
          <div className="card card-hover card-holo card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Contrast preview</h3>
            <div
              className="rounded-lg border border-border p-4"
              style={{ ...contrastStyles, fontSize: `${textScale}rem` }}
            >
              <p className="text-sm font-semibold">Readable headline</p>
              <p className="text-xs opacity-80">
                Evaluate contrast for light and dark themes.
              </p>
            </div>
            <p className="text-xs text-muted">Try high contrast for accessibility mode.</p>
          </div>
          <div className="card card-hover card-streak card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Keyboard path</h3>
            <ol className="space-y-2 text-xs text-muted">
              <li>1. Use Tab to reach primary CTAs.</li>
              <li>2. Ensure focus order matches visual hierarchy.</li>
              <li>3. Provide visible focus rings above motion.</li>
            </ol>
          </div>
        </div>
        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">A11y controls</h3>
          <label className="flex flex-col gap-2 text-sm">
            Focus ring size ({ringSize}px)
            <input
              type="range"
              min={1}
              max={6}
              step={1}
              value={ringSize}
              onChange={(event) => setRingSize(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Contrast mode
            <select
              className="control-input"
              value={contrastMode}
              onChange={(event) => setContrastMode(event.target.value as "standard" | "high")}
            >
              <option value="standard">Standard</option>
              <option value="high">High contrast</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Text scale ({textScale.toFixed(1)}x)
            <input
              type="range"
              min={0.8}
              max={1.4}
              step={0.1}
              value={textScale}
              onChange={(event) => setTextScale(Number(event.target.value))}
            />
          </label>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            Preview focus and contrast settings for inclusive components.
          </div>
        </div>
      </div>
    </section>
  );
}
