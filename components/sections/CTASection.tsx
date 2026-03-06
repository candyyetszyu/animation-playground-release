"use client";

import { useState } from "react";

export default function CTASection() {
  const [tone, setTone] = useState<"lux" | "minimal">("lux");

  return (
    <section id="cta" className="space-y-6">
      <div
        className={`card card-hover card-refract cta-panel p-8 ${
          tone === "lux" ? "cta-panel-lux card-prism-border" : "cta-panel-min card-glass-luxe"
        }`}
      >
        <div className="cta-glow" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <div className="pricing-badge">Launch Ready</div>
            <h2 className="text-3xl font-semibold">
              {tone === "lux"
                ? "Build a design system your company can ship."
                : "Ship a premium design system in weeks."}
            </h2>
            <p className="text-soft text-sm">
              {tone === "lux"
                ? "Turn this playground into a real product: branded, scalable, and ready for teams."
                : "Elevate your interface with a refined motion and data visualization system."}
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary">Start free trial</button>
              <button className="btn btn-ghost">Talk to sales</button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className={`btn ${tone === "lux" ? "btn-primary" : ""}`} onClick={() => setTone("lux")}>
                Lux tone
              </button>
              <button className={`btn ${tone === "minimal" ? "btn-primary" : ""}`} onClick={() => setTone("minimal")}>
                Minimal tone
              </button>
            </div>
          </div>
          <div className="cta-stats">
            <div>
              <p className="text-xs text-soft">Teams onboarded</p>
              <p className="text-2xl font-semibold">120+</p>
            </div>
            <div>
              <p className="text-xs text-soft">Components shipped</p>
              <p className="text-2xl font-semibold">1,800+</p>
            </div>
            <div>
              <p className="text-xs text-soft">Iterations saved</p>
              <p className="text-2xl font-semibold">35%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
