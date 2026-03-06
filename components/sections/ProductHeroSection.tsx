"use client";

import Toggle from "@/components/Toggle";

type ProductHeroSectionProps = {
  theme: "light" | "dark";
  density: "comfortable" | "compact";
  brand: "studio" | "figma" | "linear" | "arc" | "framer";
  reducedMotion: boolean;
  baseline: boolean;
  onThemeToggle: () => void;
  onDensityToggle: () => void;
  onBrandChange: (value: "studio" | "figma" | "linear" | "arc" | "framer") => void;
  onReducedMotionToggle: (value: boolean) => void;
  onBaselineToggle: (value: boolean) => void;
};

export default function ProductHeroSection({
  theme,
  density,
  brand,
  reducedMotion,
  baseline,
  onThemeToggle,
  onDensityToggle,
  onBrandChange,
  onReducedMotionToggle,
  onBaselineToggle
}: ProductHeroSectionProps) {
  return (
    <section id="overview" className="space-y-6">
      <div className="hero-shell hero-shell-luxe card card-hero p-8">
        <div className="hero-glow" />
        <div className="hero-particles" />
        <div className="hero-grid-overlay" />
        <div className="hero-noise" />
        <div className="hero-grid">
          <div className="space-y-4">
            <div className="hero-pill">Design + Motion Studio</div>
            <h1 className="text-4xl font-semibold leading-tight">
              <span className="brand-gradient text-chroma">Animation Playground</span>
              <span className="block text-soft text-2xl font-normal">
                A product-grade UI and motion lookbook for modern teams.
              </span>
            </h1>
            <p className="text-soft text-sm max-w-xl">
              Prototype typography, transitions, data visualization, and interaction states in a
              single, reference-ready workspace. Built to scale into a real product.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-primary">Get started</button>
              <button className="btn btn-ghost">Request a demo</button>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Toggle label={theme === "light" ? "Light" : "Dark"} checked={theme === "dark"} onChange={onThemeToggle} />
              <Toggle label={density === "compact" ? "Compact" : "Comfort"} checked={density === "compact"} onChange={onDensityToggle} />
              <Toggle label="Reduced motion" checked={reducedMotion} onChange={onReducedMotionToggle} />
              <Toggle label="Baseline grid" checked={baseline} onChange={onBaselineToggle} />
              <label className="flex items-center gap-2 text-xs text-soft">
                Brand
                <select
                  className="control-input"
                  value={brand}
                  onChange={(event) => onBrandChange(event.target.value as ProductHeroSectionProps["brand"])}
                >
                  <option value="studio">Studio</option>
                  <option value="figma">Figma</option>
                  <option value="linear">Linear</option>
                  <option value="arc">Arc</option>
                  <option value="framer">Framer</option>
                </select>
              </label>
            </div>
          </div>

          <div className="hero-showcase">
            <div className="hero-card card-streak card-refract">
              <div className="hero-card-header">
                <span>Design System</span>
                <span className="hero-chip">v2.0</span>
              </div>
              <div className="hero-card-body">
                <div className="hero-sparkline" />
                <div className="hero-metrics">
                  <div>
                    <p className="text-soft text-xs">Tokens</p>
                    <p className="text-lg font-semibold">128</p>
                  </div>
                  <div>
                    <p className="text-soft text-xs">Components</p>
                    <p className="text-lg font-semibold">42</p>
                  </div>
                  <div>
                    <p className="text-soft text-xs">Patterns</p>
                    <p className="text-lg font-semibold">24</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-card hero-card-glass card-holo card-refract">
              <div className="hero-card-header">
                <span>Motion Studio</span>
                <span className="hero-chip">Live</span>
              </div>
              <div className="hero-card-body">
                <div className="hero-rings" />
                <p className="text-xs text-soft">Realtime transition tuning & presets</p>
              </div>
            </div>

            <div className="hero-card hero-card-accent card-prism-border card-refract">
              <div className="hero-card-header">
                <span>Data Viz Lab</span>
                <span className="hero-chip">Interactive</span>
              </div>
              <div className="hero-card-body">
                <div className="hero-bars">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <span key={index} style={{ height: `${35 + index * 8}%` }} />
                  ))}
                </div>
                <p className="text-xs text-soft">Scenario analysis & storytelling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
