"use client";

import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";

export default function EffectsSection() {
  const [angle, setAngle] = useState(135);
  const [blur, setBlur] = useState(0.5);
  const [grain, setGrain] = useState(4);
  const [glass, setGlass] = useState(0.12);
  const [meshOpacity, setMeshOpacity] = useState(0.5);
  const [orbSpeed, setOrbSpeed] = useState(1);

  return (
    <section id="effects" className="space-y-6">
      <SectionHeader title="Gradients + Glass + Noise" subtitle="Surface effects" />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card card-hover card-glass-luxe card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Gradient</h3>
            <div
              className="h-32 rounded-lg"
              style={{
                background: `linear-gradient(${angle}deg, var(--color-primary), var(--color-secondary), var(--color-warn))`,
                filter: `blur(${blur}px)`
              }}
            />
            <p className="text-xs text-muted">Use for hero panels and badges.</p>
          </div>
          <div className="card card-hover card-prism-border card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Glass</h3>
            <div
              className="relative h-32 overflow-hidden rounded-lg border border-white/10 backdrop-blur"
              style={{ backgroundColor: `rgba(255,255,255,${glass})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
              <div className="relative h-full w-full p-4 text-xs text-soft">Frosted layer</div>
            </div>
            <p className="text-xs text-muted">Backdrop blur + low opacity.</p>
          </div>
          <div className="card card-hover card-holo card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Noise</h3>
            <div
              className="h-32 rounded-lg border border-border"
              style={{
                backgroundColor: "rgba(12,13,20,0.8)",
                backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: `${grain}px ${grain}px`
              }}
            />
            <p className="text-xs text-muted">Subtle texture overlay.</p>
          </div>
          <div className="card card-hover card-streak card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Aurora mesh</h3>
            <div className="relative h-32 overflow-hidden rounded-lg border border-border bg-surface-2">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.45),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.45),transparent_50%),radial-gradient(circle_at_50%_80%,rgba(34,197,94,0.4),transparent_50%)",
                  opacity: meshOpacity
                }}
              />
              <div className="absolute inset-0 opacity-20 backdrop-blur" />
            </div>
            <p className="text-xs text-muted">Layered mesh gradients.</p>
          </div>
          <div className="card card-hover card-volumetric card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Neon outline</h3>
            <div className="flex h-32 items-center justify-center rounded-lg border border-primary/40 bg-surface-2">
              <span className="text-outline text-3xl font-semibold tracking-wide">NEON</span>
            </div>
            <p className="text-xs text-muted">High-contrast outline glow.</p>
          </div>
          <div className="card card-hover card-aurora-border card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Glass stack</h3>
            <div className="relative h-32 rounded-lg border border-border bg-surface-2">
              <div className="absolute left-6 top-4 h-16 w-20 rounded-xl border border-white/20 bg-white/10 backdrop-blur" />
              <div className="absolute left-16 top-10 h-16 w-20 rounded-xl border border-white/20 bg-white/10 backdrop-blur" />
              <div className="absolute left-28 top-6 h-16 w-20 rounded-xl border border-white/20 bg-white/10 backdrop-blur" />
            </div>
            <p className="text-xs text-muted">Layered translucent cards.</p>
          </div>
          <div className="card card-hover card-aurora-border card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Animated mesh</h3>
            <div className="h-32 rounded-lg animated-mesh" />
            <p className="text-xs text-muted">Living gradient mesh for hero backgrounds.</p>
          </div>
          <div className="card card-hover card-prism-border card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Conic glow</h3>
            <div className="h-32 rounded-lg conic-glow" />
            <p className="text-xs text-muted">Rotational glow for product highlights.</p>
          </div>
          <div className="card card-hover card-streak card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Scanline film</h3>
            <div className="h-32 rounded-lg scanline-panel" />
            <p className="text-xs text-muted">Retro scanline + grain for atmosphere.</p>
          </div>
          <div className="card card-hover card-holo card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Light sweep</h3>
            <div className="relative h-32 rounded-lg border border-border bg-surface-2">
              <div className="absolute inset-0 sweep-panel" />
              <div className="absolute inset-0 flex items-center justify-center text-xs text-soft">
                sweeping highlight
              </div>
            </div>
            <p className="text-xs text-muted">Luxe sheen for hero backplates.</p>
          </div>
          <div className="card card-hover card-prism-border card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Chromatic aberration</h3>
            <div className="flex h-32 items-center justify-center rounded-lg border border-border bg-surface-2">
              <span className="chromatic-text" data-text="CHROMA">
                CHROMA
              </span>
            </div>
            <p className="text-xs text-muted">RGB split with subtle drift.</p>
          </div>
          <div className="card card-hover card-streak card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Shimmer mask</h3>
            <div className="h-32 rounded-lg shimmer-mask" />
            <p className="text-xs text-muted">Masked sheen for premium surfaces.</p>
          </div>
          <div className="card card-hover card-volumetric card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Refractive noise</h3>
            <div className="h-32 rounded-lg refract-noise" />
            <p className="text-xs text-muted">Glassy noise diffusion.</p>
          </div>
          <div className="card card-hover card-aurora-border card-refract space-y-3 p-6">
            <h3 className="text-base font-semibold">Floating orbs</h3>
            <div className="relative h-32 overflow-hidden rounded-lg border border-border bg-surface-2">
              <div className="absolute h-8 w-8 rounded-full bg-primary/40 blur-xl animate-orb-1" style={{ top: '20%', left: '20%' }} />
              <div className="absolute h-6 w-6 rounded-full bg-secondary/50 blur-lg animate-orb-2" style={{ top: '60%', left: '70%' }} />
              <div className="absolute h-10 w-10 rounded-full bg-warn/30 blur-2xl animate-orb-3" style={{ top: '40%', left: '45%' }} />
            </div>
            <p className="text-xs text-muted">Floating gradient orbs with blur.</p>
          </div>
          <div className="card card-hover card-glass-luxe card-refract space-y-3 p-6">
            <h3 className="text-base font-sem-semibold">Wave pattern</h3>
            <div className="h-32 rounded-lg wave-pattern" />
            <p className="text-xs text-muted">Animated sine wave lines.</p>
          </div>
        </div>

        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Effect controls</h3>
          <label className="flex flex-col gap-2 text-sm">
            Gradient angle ({angle}°)
            <input
              type="range"
              min={0}
              max={180}
              step={5}
              value={angle}
              onChange={(event) => setAngle(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Blur ({blur}px)
            <input
              type="range"
              min={0}
              max={3}
              step={0.2}
              value={blur}
              onChange={(event) => setBlur(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Grain size ({grain}px)
            <input
              type="range"
              min={2}
              max={8}
              step={1}
              value={grain}
              onChange={(event) => setGrain(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Glass opacity ({glass.toFixed(2)})
            <input
              type="range"
              min={0.04}
              max={0.3}
              step={0.02}
              value={glass}
              onChange={(event) => setGlass(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Mesh opacity ({meshOpacity.toFixed(2)})
            <input
              type="range"
              min={0.2}
              max={0.9}
              step={0.05}
              value={meshOpacity}
              onChange={(event) => setMeshOpacity(Number(event.target.value))}
            />
          </label>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            Tune visual depth for hero backdrops and surface treatments.
          </div>
        </div>
      </div>
    </section>
  );
}
