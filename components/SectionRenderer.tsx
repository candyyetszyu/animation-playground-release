"use client";

import dynamic from "next/dynamic";
import { usePlayground } from "@/components/PlaygroundProvider";
import { motionDemos } from "@/data/motionDemos";
import { useMemo } from "react";

const AccessibilitySection = dynamic(() => import("@/components/sections/AccessibilitySection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const ChartsSection = dynamic(() => import("@/components/sections/ChartsSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const ColorsSection = dynamic(() => import("@/components/sections/ColorsSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const ComponentsSection = dynamic(() => import("@/components/sections/ComponentsSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const DesignSystemOverviewSection = dynamic(() => import("@/components/sections/DesignSystemOverviewSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const DashboardSection = dynamic(() => import("@/components/sections/DashboardSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const EffectsSection = dynamic(() => import("@/components/sections/EffectsSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const FontEffectsSection = dynamic(() => import("@/components/sections/FontEffectsSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const FormsSection = dynamic(() => import("@/components/sections/FormsSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const HoversSection = dynamic(() => import("@/components/sections/HoversSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const IconsSection = dynamic(() => import("@/components/sections/IconsSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const LayoutSection = dynamic(() => import("@/components/sections/LayoutSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const MotionSection = dynamic(() => import("@/components/sections/MotionSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const PricingSection = dynamic(() => import("@/components/sections/PricingSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const ProductHeroSection = dynamic(() => import("@/components/sections/ProductHeroSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const SpacingSection = dynamic(() => import("@/components/sections/SpacingSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const TextEffectsSection = dynamic(() => import("@/components/sections/TextEffectsSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const TokensSection = dynamic(() => import("@/components/sections/TokensSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const TypographySection = dynamic(() => import("@/components/sections/TypographySection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});
const VisualizationSection = dynamic(() => import("@/components/sections/VisualizationSection"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading...</div>
});

const sectionRenderers: Record<string, (context: ReturnType<typeof usePlayground>) => JSX.Element> = {
  overview: (context) => (
    <ProductHeroSection
      theme={context.theme}
      density={context.density}
      brand={context.brand}
      reducedMotion={context.reducedMotion}
      baseline={context.baseline}
      onThemeToggle={() => context.setTheme(context.theme === "light" ? "dark" : "light")}
      onDensityToggle={() => context.setDensity(context.density === "compact" ? "comfortable" : "compact")}
      onBrandChange={context.setBrand}
      onReducedMotionToggle={context.setReducedMotion}
      onBaselineToggle={context.setBaseline}
    />
  ),
  "design-system": () => <DesignSystemOverviewSection />,
  "dashboard-elements": () => <DashboardSection />,
  pricing: () => <PricingSection />,
  cta: () => <CTASection />,
  "text-effects": () => <TextEffectsSection />,
  "font-effects": () => <FontEffectsSection />,
  typography: (context) => (
    <TypographySection
      typeSize={context.typeSize}
      lineHeight={context.lineHeight}
      tracking={context.tracking}
      maxWidth={context.maxWidth}
      fontFamily={context.fontFamily}
      previewText={context.previewText}
      onTypeSizeChange={context.setTypeSize}
      onLineHeightChange={context.setLineHeight}
      onTrackingChange={context.setTracking}
      onMaxWidthChange={context.setMaxWidth}
      onFontFamilyChange={context.setFontFamily}
      onPreviewTextChange={context.setPreviewText}
    />
  ),
  colors: () => <ColorsSection />,
  effects: () => <EffectsSection />,
  spacing: () => <SpacingSection />,
  icons: () => <IconsSection />,
  layout: () => <LayoutSection />,
  motion: (context) => {
    const filteredDemos = motionDemos.filter((demo) => {
      const term = context.search.trim().toLowerCase();
      if (!term) return true;
      return (
        demo.name.toLowerCase().includes(term) ||
        demo.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    });

    const motionSettings = {
      duration: context.duration,
      delay: context.delay,
      ease: context.ease,
      stiffness: context.stiffness,
      damping: context.damping,
      mass: context.mass,
      stagger: context.stagger,
      repeat: context.repeat,
      direction: context.direction,
      isPlaying: context.isPlaying,
      reducedMotion: context.reducedMotion,
      restartKey: context.restartKey
    };

    return (
      <MotionSection
        duration={context.duration}
        delay={context.delay}
        ease={context.ease}
        stiffness={context.stiffness}
        damping={context.damping}
        mass={context.mass}
        stagger={context.stagger}
        repeat={context.repeat}
        direction={context.direction}
        search={context.search}
        isPlaying={context.isPlaying}
        onDurationChange={context.setDuration}
        onDelayChange={context.setDelay}
        onEaseChange={context.setEase}
        onStiffnessChange={context.setStiffness}
        onDampingChange={context.setDamping}
        onMassChange={context.setMass}
        onStaggerChange={context.setStagger}
        onRepeatChange={context.setRepeat}
        onDirectionChange={context.setDirection}
        onSearchChange={context.setSearch}
        onTogglePlay={() => context.setIsPlaying(!context.isPlaying)}
        onRestart={context.restart}
        settings={motionSettings}
        filteredDemos={filteredDemos}
      />
    );
  },
  hovers: () => <HoversSection />,
  components: () => <ComponentsSection />,
  forms: () => <FormsSection />,
  accessibility: () => <AccessibilitySection />,
  charts: () => <ChartsSection />,
  visualization: () => <VisualizationSection />,
  tokens: (context) => <TokensSection tokensJson={context.tokensJson} />
};

export default function SectionRenderer({ sectionId }: { sectionId: string }) {
  const context = usePlayground();
  const renderer = useMemo(() => sectionRenderers[sectionId], [sectionId]);
  if (!renderer) {
    return (
      <div className="card p-6 text-sm text-soft">
        Unknown section. Please select a valid section from the sidebar.
      </div>
    );
  }
  return renderer(context);
}
