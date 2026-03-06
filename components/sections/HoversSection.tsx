"use client";

import SectionHeader from "@/components/SectionHeader";
import { useState, type CSSProperties } from "react";

export default function HoversSection() {
  const [lift, setLift] = useState(8);
  const [glow, setGlow] = useState(32);
  const [scale, setScale] = useState(1.05);
  const [isHovering, setIsHovering] = useState(false);
  const [spot, setSpot] = useState({ x: 140, y: 60 });
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });

  return (
    <section id="hovers" className="space-y-6">
      <SectionHeader title="Hover + Effects" subtitle="Cards + images" />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card card-hover card-glass-luxe card-refract group space-y-3 p-6">
            <h3 className="text-base font-semibold">Lift on hover</h3>
            <p className="text-xs text-muted">Subtle elevation shift.</p>
            <div className="h-20 rounded-md bg-surface-2 transition group-hover:bg-surface-3" />
          </div>
          <div className="card card-hover card-prism-border card-refract group space-y-3 p-6">
            <h3 className="text-base font-semibold">Image zoom</h3>
            <div className="overflow-hidden rounded-md">
              <div className="h-24 bg-gradient-to-br from-primary to-secondary transition duration-300 group-hover:scale-105" />
            </div>
            <p className="text-xs text-muted">Great for thumbnails.</p>
          </div>
          <div className="card card-hover card-volumetric card-refract group space-y-3 p-6">
            <h3 className="text-base font-semibold">Glow</h3>
            <div className="h-20 rounded-md bg-primary/30 transition duration-300 group-hover:shadow-[0_0_24px_rgba(59,130,246,0.5)]" />
            <p className="text-xs text-muted">Use sparingly.</p>
          </div>
          <div
            className="card card-hover card-holo card-refract spotlight-card space-y-3 p-6"
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setSpot({ x: event.clientX - rect.left, y: event.clientY - rect.top });
            }}
            onMouseLeave={() => setSpot({ x: 140, y: 60 })}
            style={
              { "--spot-x": `${spot.x}px`, "--spot-y": `${spot.y}px` } as CSSProperties
            }
          >
            <h3 className="text-base font-semibold">Spotlight</h3>
            <div className="h-20 rounded-md bg-surface-2" />
            <p className="text-xs text-muted">Pointer-reactive glow for premium cards.</p>
          </div>
          <div
            className="card card-hover card-streak card-refract space-y-3 p-6"
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const dx = event.clientX - (rect.left + rect.width / 2);
              const dy = event.clientY - (rect.top + rect.height / 2);
              setMagnet({ x: dx * 0.12, y: dy * 0.12 });
            }}
            onMouseLeave={() => setMagnet({ x: 0, y: 0 })}
          >
            <h3 className="text-base font-semibold">Magnetic CTA</h3>
            <div className="flex h-20 items-center justify-center">
              <button
                className="btn btn-primary"
                style={{ transform: `translate(${magnet.x}px, ${magnet.y}px)` }}
              >
                Attract
              </button>
            </div>
            <p className="text-xs text-muted">Subtle magnetic attraction on hover.</p>
          </div>
        </div>

        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Hover lab</h3>
          <div
            className="flex h-28 items-center justify-center rounded-lg border border-border bg-surface-2 transition"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              transform: isHovering ? `translateY(${-lift}px) scale(${scale})` : "translateY(0px)",
              boxShadow: isHovering
                ? `0 0 ${glow}px rgba(59,130,246,0.45)`
                : "none"
            }}
          >
            <span className="text-sm text-muted">Hover me</span>
          </div>
          <label className="flex flex-col gap-2 text-sm">
            Lift ({lift}px)
            <input
              type="range"
              min={2}
              max={16}
              step={1}
              value={lift}
              onChange={(event) => setLift(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Glow ({glow}px)
            <input
              type="range"
              min={8}
              max={60}
              step={2}
              value={glow}
              onChange={(event) => setGlow(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Scale ({scale.toFixed(2)}x)
            <input
              type="range"
              min={1}
              max={1.12}
              step={0.01}
              value={scale}
              onChange={(event) => setScale(Number(event.target.value))}
            />
          </label>
        </div>
      </div>
    </section>
  );
}
