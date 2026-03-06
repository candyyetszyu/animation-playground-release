"use client";

import SectionHeader from "@/components/SectionHeader";
import TokenSwatch from "@/components/TokenSwatch";
import { colorTokens, radiusTokens, shadowTokens } from "@/tokens/tokens";
import { useMemo, useState } from "react";

const accentChoices = ["--color-primary", "--color-secondary", "--color-success", "--color-warn", "--color-danger"];

export default function ColorsSection() {
  const [accent, setAccent] = useState("--color-primary");
  const [mix, setMix] = useState(42);
  const [shadowIndex, setShadowIndex] = useState(1);
  const [radiusIndex, setRadiusIndex] = useState(2);

  const accentToken = useMemo(
    () => colorTokens.find((token) => token.name === accent) ?? colorTokens[6],
    [accent]
  );
  const mixedColor = useMemo(
    () => `color-mix(in srgb, ${accentToken.value} ${mix}%, var(--color-bg))`,
    [accentToken.value, mix]
  );
  const surfaceMix = useMemo(
    () => `color-mix(in srgb, ${accentToken.value} ${Math.max(18, mix - 12)}%, var(--color-surface-2))`,
    [accentToken.value, mix]
  );

  return (
    <section id="colors" className="space-y-6">
      <SectionHeader title="Colors & Effects" subtitle="Tokens + surfaces" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Color palette</h3>
            <div className="space-y-3">
              {colorTokens.map((token) => (
                <TokenSwatch key={token.name} name={token.name} label={token.label} />
              ))}
            </div>
          </div>

          <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Radius selection</h3>
            <div className="flex flex-wrap gap-2">
              {radiusTokens.map((token, index) => (
                <button
                  key={token.name}
                  type="button"
                  className={`badge ${index === radiusIndex ? "ring-2 ring-primary/60" : ""}`}
                  onClick={() => setRadiusIndex(index)}
                >
                  {token.label}
                </button>
              ))}
            </div>
            <div className="rounded-lg border border-border bg-surface-2 p-4">
              <div
                className="h-20 w-full bg-primary/20"
                style={{ borderRadius: `var(${radiusTokens[radiusIndex].name})` }}
              />
              <p className="mt-3 text-xs text-muted">
                Preview with {radiusTokens[radiusIndex].label}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Palette lab</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm">
                Accent token
                <select
                  className="control-input"
                  value={accent}
                  onChange={(event) => setAccent(event.target.value)}
                >
                  {accentChoices.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice.replace("--color-", "")}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm">
                Blend with background ({mix}%)
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={mix}
                  onChange={(event) => setMix(Number(event.target.value))}
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div
                className="rounded-lg border border-border p-4"
                style={{ background: `linear-gradient(135deg, ${accentToken.value}, ${mixedColor})` }}
              >
                <div className="text-xs uppercase tracking-[0.2em] text-white/80">Hero</div>
                <div className="mt-2 text-lg font-semibold text-white">Accent gradient</div>
              </div>
              <div
                className="rounded-lg border border-border p-4"
                style={{ background: surfaceMix }}
              >
                <div className="text-xs text-muted">Surface tint</div>
                <button className="btn btn-primary mt-3">Primary CTA</button>
              </div>
            </div>
          </div>

          <div className="card card-hover card-holo card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Holographic swatch</h3>
            <div className="h-28 rounded-lg holo-swatch" />
            <p className="text-xs text-muted">Iridescent accents for futuristic brand palettes.</p>
          </div>

          <div className="card card-hover card-volumetric card-refract space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Shadow depth</h3>
              <span className="text-xs text-soft">{shadowTokens[shadowIndex].label}</span>
            </div>
            <input
              type="range"
              min={0}
              max={shadowTokens.length - 1}
              step={1}
              value={shadowIndex}
              onChange={(event) => setShadowIndex(Number(event.target.value))}
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {shadowTokens.map((token) => (
                <div key={token.name} className="rounded-lg border border-border bg-surface-2 p-4">
                  <div
                    className="h-14 rounded-md bg-white"
                    style={{ boxShadow: `var(${token.name})` }}
                  />
                  <p className="mt-2 text-xs text-muted">{token.label}</p>
                </div>
              ))}
            </div>
            <div
              className="rounded-lg border border-border bg-surface-1 p-4"
              style={{ boxShadow: `var(${shadowTokens[shadowIndex].name})` }}
            >
              <p className="text-sm font-medium">Shadow preview card</p>
              <p className="text-xs text-muted">Use for modals, popovers, and overlays.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
