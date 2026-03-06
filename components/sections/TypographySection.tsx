import SectionHeader from "@/components/SectionHeader";
import { fontFamilies, typeScale } from "@/tokens/tokens";
import type { FontChoice } from "@/components/PlaygroundProvider";
import { useState } from "react";

type TypographySectionProps = {
  typeSize: number;
  lineHeight: number;
  tracking: number;
  maxWidth: number;
  fontFamily: FontChoice;
  previewText: string;
  onTypeSizeChange: (value: number) => void;
  onLineHeightChange: (value: number) => void;
  onTrackingChange: (value: number) => void;
  onMaxWidthChange: (value: number) => void;
  onFontFamilyChange: (value: FontChoice) => void;
  onPreviewTextChange: (value: string) => void;
};

export default function TypographySection({
  typeSize,
  lineHeight,
  tracking,
  maxWidth,
  fontFamily,
  previewText,
  onTypeSizeChange,
  onLineHeightChange,
  onTrackingChange,
  onMaxWidthChange,
  onFontFamilyChange,
  onPreviewTextChange
}: TypographySectionProps) {
  const [pairing, setPairing] = useState(fontFamilies[2]?.id ?? "space");

  return (
    <section id="typography" className="space-y-6">
      <SectionHeader title="Typography" subtitle="12 styles" />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex flex-col gap-2">
                Base size
                <input
                  type="range"
                  min={14}
                  max={22}
                  value={typeSize}
                  onChange={(event) => onTypeSizeChange(Number(event.target.value))}
                />
              </label>
              <label className="flex flex-col gap-2">
                Line height
                <input
                  type="range"
                  min={1.2}
                  max={2}
                  step={0.05}
                  value={lineHeight}
                  onChange={(event) => onLineHeightChange(Number(event.target.value))}
                />
              </label>
              <label className="flex flex-col gap-2">
                Tracking
                <input
                  type="range"
                  min={-0.02}
                  max={0.08}
                  step={0.01}
                  value={tracking}
                  onChange={(event) => onTrackingChange(Number(event.target.value))}
                />
              </label>
              <label className="flex flex-col gap-2">
                Max width
                <input
                  type="range"
                  min={32}
                  max={64}
                  value={maxWidth}
                  onChange={(event) => onMaxWidthChange(Number(event.target.value))}
                />
              </label>
              <label className="flex flex-col gap-2">
                Font family
                <select
                  className="control-input"
                  value={fontFamily}
                  onChange={(event) => onFontFamilyChange(event.target.value as FontChoice)}
                >
                  {fontFamilies.map((font) => (
                    <option key={font.id} value={font.id}>
                      {font.label} · {font.category}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div
              className="rounded-lg border border-border bg-surface-2 p-4"
              style={{
                fontSize: `${typeSize}px`,
                lineHeight,
                letterSpacing: `${tracking}em`,
                maxWidth: `${maxWidth}ch`,
                fontFamily: fontFamilies.find((font) => font.id === fontFamily)?.variable ?? "var(--font-sans)"
              }}
            >
              <textarea
                className="min-h-[120px] w-full resize-none bg-transparent text-sm outline-none"
                value={previewText}
                onChange={(event) => onPreviewTextChange(event.target.value)}
              />
            </div>
          </div>
          <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Font gallery</h3>
              <span className="text-xs text-soft">UI / Display / Editorial / Mono</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {fontFamilies.map((font) => (
                <div
                  key={font.id}
                  className={`rounded-lg border border-border bg-surface-2 p-4 transition ${
                    font.id === fontFamily ? "ring-2 ring-primary/60" : ""
                  }`}
                >
                  <div className="text-xs text-soft">{font.category}</div>
                  <div className="text-lg font-semibold" style={{ fontFamily: font.variable }}>
                    {font.label}
                  </div>
                  <p className="mt-2 text-xs text-soft" style={{ fontFamily: font.variable }}>
                    The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="card card-hover card-holo card-refract space-y-3 p-6">
            {typeScale.map((type) => (
              <div key={type.name} className="flex items-center justify-between">
                <div className={type.className}>{type.name}</div>
                <span className="text-xs text-muted">{type.size}</span>
              </div>
            ))}
          </div>
          <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Font pairing</h3>
            <label className="flex flex-col gap-2 text-sm">
              Display font
              <select
                className="control-input"
                value={pairing}
                onChange={(event) => setPairing(event.target.value)}
              >
                {fontFamilies.map((font) => (
                  <option key={font.id} value={font.id}>
                    {font.label} · {font.category}
                  </option>
                ))}
              </select>
            </label>
            <div className="rounded-lg border border-border bg-surface-2 p-4">
              <div
                className="text-2xl font-semibold"
                style={{ fontFamily: fontFamilies.find((font) => font.id === pairing)?.variable }}
              >
                Elevate your design system
              </div>
              <p
                className="mt-2 text-xs text-muted"
                style={{ fontFamily: fontFamilies.find((font) => font.id === fontFamily)?.variable }}
              >
                Combine a distinctive display font with a clear UI family for product copy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
