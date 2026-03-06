"use client";

import SectionHeader from "@/components/SectionHeader";
import { fontFamilies } from "@/tokens/tokens";
import { useMemo, useState } from "react";

const effectOptions = [
  {
    id: "aurora",
    label: "Aurora Gradient",
    description: "Kinetic multi-stop gradient for cinematic hero titles.",
    className: "font-effect-aurora"
  },
  {
    id: "glow",
    label: "Neon Glow",
    description: "Soft glow pulse with layered text shadows.",
    className: "font-effect-glow"
  },
  {
    id: "scan",
    label: "Scanner Beam",
    description: "Glass scanline highlight sliding across the text.",
    className: "font-effect-scan"
  },
  {
    id: "outline",
    label: "Outline Fill",
    description: "Stroke-first headline with subtle fill reveal.",
    className: "font-effect-outline"
  },
  {
    id: "split",
    label: "Split Shift",
    description: "Offset echo layers for a premium editorial look.",
    className: "font-effect-split"
  },
  {
    id: "chroma",
    label: "Chroma Shift",
    description: "Chromatic offsets for futuristic brand headlines.",
    className: "font-effect-chroma"
  },
  {
    id: "engrave",
    label: "Engraved",
    description: "Subtle inset shadow for luxury brand marks.",
    className: "font-effect-engrave"
  },
  {
    id: "wave",
    label: "Wave Letters",
    description: "Per-letter wave motion for kinetic headlines.",
    className: "font-effect-wave",
    perLetter: true
  },
  {
    id: "perspective",
    label: "3D Perspective",
    description: "Depthy extrusion with subtle 3D skew.",
    className: "font-effect-3d"
  }
];

const backgroundOptions = [
  { id: "mesh", label: "Aurora Mesh", className: "font-hero-bg-mesh" },
  { id: "grid", label: "Grid + Noise", className: "font-hero-bg-grid" },
  { id: "glass", label: "Glass Chamber", className: "font-hero-bg-glass" },
  { id: "nebula", label: "Nebula Drift", className: "font-hero-bg-nebula" }
];

export default function FontEffectsSection() {
  const [headline, setHeadline] = useState("Design intelligence in motion");
  const [subhead, setSubhead] = useState(
    "Hero typography built for premium product launches and cinematic interfaces."
  );
  const [effectId, setEffectId] = useState(effectOptions[0].id);
  const [backgroundId, setBackgroundId] = useState(backgroundOptions[0].id);
  const [fontFamily, setFontFamily] = useState(fontFamilies[0].id);
  const [speed, setSpeed] = useState(6);
  const [glow, setGlow] = useState(0.8);
  const [stroke, setStroke] = useState(2);
  const [tracking, setTracking] = useState(0.04);
  const [uppercase, setUppercase] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeEffect = effectOptions.find((effect) => effect.id === effectId) ?? effectOptions[0];
  const activeBackground =
    backgroundOptions.find((option) => option.id === backgroundId) ?? backgroundOptions[0];
  const activeFont =
    fontFamilies.find((font) => font.id === fontFamily)?.variable ?? "var(--font-sans)";

  const headlineLetters = useMemo(
    () =>
      (uppercase ? headline.toUpperCase() : headline).split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="font-wave-letter"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      )),
    [headline, uppercase]
  );

  const heroStyle = {
    fontFamily: activeFont,
    letterSpacing: `${tracking}em`,
    ["--effect-speed" as const]: `${speed}s`,
    ["--glow-size" as const]: `${Math.round(glow * 36)}px`,
    ["--stroke-width" as const]: `${stroke}px`
  };

  const copyStyle = async () => {
    const snippet = `font-family: ${activeFont};\nletter-spacing: ${tracking}em;\n--effect-speed: ${speed}s;\n--glow-size: ${Math.round(
      glow * 36
    )}px;\n--stroke-width: ${stroke}px;`;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const renderHeadline = (text: string, effect = activeEffect) => {
    const displayText = uppercase ? text.toUpperCase() : text;
    if (effect.perLetter) {
      return <span className={effect.className}>{headlineLetters}</span>;
    }
    return (
      <span className={effect.className} data-text={displayText}>
        {displayText}
      </span>
    );
  };

  return (
    <section id="font-effects" className="space-y-6">
      <SectionHeader title="Font Effects" subtitle="Hero typography lab" />
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <div className={`card card-hover card-aurora-border card-refract font-hero-stage ${activeBackground.className}`}>
            <div className="font-hero-overlay" />
            <div className="font-hero-noise" />
            <div className="font-hero-content">
              <div className="font-hero-pill">Hero typography</div>
              <h3 className="font-hero-title" style={heroStyle as React.CSSProperties}>
                {renderHeadline(headline)}
              </h3>
              <p className="font-hero-subtitle">{subhead}</p>
              <div className="flex flex-wrap gap-3">
                <button className="btn btn-primary">Launch demo</button>
                <button className="btn" onClick={copyStyle}>
                  {copied ? "Copied!" : "Copy style"}
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {effectOptions.map((effect) => (
              <button
                key={effect.id}
                type="button"
                className={`card card-hover card-refract text-left p-4 transition ${
                  effect.id === effectId ? "ring-2 ring-primary/60" : ""
                }`}
                onClick={() => setEffectId(effect.id)}
              >
                <div className="text-xs text-soft">{effect.label}</div>
                <div
                  className="mt-2 text-2xl font-semibold"
                  style={{ fontFamily: activeFont } as React.CSSProperties}
                >
                  {effect.perLetter ? (
                    <span className={effect.className}>
                      {"AURORA".split("").map((char, index) => (
                        <span
                          key={`${effect.id}-${index}`}
                          className="font-wave-letter"
                          style={{ animationDelay: `${index * 0.08}s` }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className={effect.className} data-text="AURORA">
                      AURORA
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-muted">{effect.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Live controls</h3>
            <label className="flex flex-col gap-2 text-sm">
              Headline text
              <input
                className="control-input"
                value={headline}
                onChange={(event) => setHeadline(event.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Subhead
              <input
                className="control-input"
                value={subhead}
                onChange={(event) => setSubhead(event.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Font family
              <select
                className="control-input"
                value={fontFamily}
                onChange={(event) => setFontFamily(event.target.value)}
              >
                {fontFamilies.map((font) => (
                  <option key={font.id} value={font.id}>
                    {font.label} · {font.category}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Effect style
              <select
                className="control-input"
                value={effectId}
                onChange={(event) => setEffectId(event.target.value)}
              >
                {effectOptions.map((effect) => (
                  <option key={effect.id} value={effect.id}>
                    {effect.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Background scene
              <select
                className="control-input"
                value={backgroundId}
                onChange={(event) => setBackgroundId(event.target.value)}
              >
                {backgroundOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Animation speed ({speed.toFixed(1)}s)
              <input
                type="range"
                min={2}
                max={12}
                step={0.5}
                value={speed}
                onChange={(event) => setSpeed(Number(event.target.value))}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Glow intensity ({glow.toFixed(2)})
              <input
                type="range"
                min={0}
                max={1.2}
                step={0.05}
                value={glow}
                onChange={(event) => setGlow(Number(event.target.value))}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Stroke width ({stroke}px)
              <input
                type="range"
                min={0}
                max={6}
                step={0.5}
                value={stroke}
                onChange={(event) => setStroke(Number(event.target.value))}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Tracking ({tracking.toFixed(2)}em)
              <input
                type="range"
                min={-0.02}
                max={0.18}
                step={0.01}
                value={tracking}
                onChange={(event) => setTracking(Number(event.target.value))}
              />
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(event) => setUppercase(event.target.checked)}
              />
              Uppercase headline
            </label>
          </div>

          <div className="card card-hover card-prism-border card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Hero-ready combinations</h3>
            <div className="space-y-3 text-xs text-muted">
              <div className="rounded-md border border-border bg-surface-2 p-3">
                Pair cinematic glow with glass UI chrome for premium product launches.
              </div>
              <div className="rounded-md border border-border bg-surface-2 p-3">
                Outline + split effects work well for editorial, fashion, and creative studios.
              </div>
              <div className="rounded-md border border-border bg-surface-2 p-3">
                Wave + aurora gradients add playful motion for AI and data storytelling pages.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
