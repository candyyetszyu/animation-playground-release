export const sectionMeta: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    accent?: string;
    accentSecondary?: string;
  }
> = {
  overview: {
    title: "Product Overview",
    subtitle: "Launch-grade interface",
    description: "An executive snapshot of the system: hero visuals, brand controls, and product messaging.",
    tags: ["Branding", "Hero", "CTA"],
    accent: "var(--color-primary)",
    accentSecondary: "var(--color-secondary)"
  },
  "design-system": {
    title: "Design System Index",
    subtitle: "Foundation map",
    description: "Navigate the building blocks of the system with a curated overview of foundations and patterns.",
    tags: ["Tokens", "Navigation", "System map"],
    accent: "rgba(34, 211, 238, 0.9)",
    accentSecondary: "rgba(139, 92, 246, 0.9)"
  },
  pricing: {
    title: "Pricing",
    subtitle: "Revenue architecture",
    description: "Premium plan hierarchy with emphasis on flagship offers and enterprise readiness.",
    tags: ["Monetization", "Plan tiers", "Conversion"],
    accent: "rgba(236, 72, 153, 0.9)",
    accentSecondary: "rgba(14, 165, 233, 0.9)"
  },
  cta: {
    title: "Call to Action",
    subtitle: "Activation moment",
    description: "High-contrast CTA panel with KPI proof points and conversion-focused copy.",
    tags: ["CTA", "Social proof", "Pipeline"],
    accent: "rgba(59, 130, 246, 0.9)",
    accentSecondary: "rgba(34, 197, 94, 0.9)"
  },
  "text-effects": {
    title: "Text Effects",
    subtitle: "Typography motion",
    description: "Animated type treatments for hero headlines, product labels, and cinematic UI.",
    tags: ["Typewriter", "Scramble", "Gradient"],
    accent: "rgba(168, 85, 247, 0.9)",
    accentSecondary: "rgba(56, 189, 248, 0.9)"
  },
  "font-effects": {
    title: "Font Effects",
    subtitle: "Hero typography lab",
    description: "Cinematic headline treatments with glow, scanlines, split outlines, and kinetic gradients.",
    tags: ["Hero", "Display", "Cinematic"],
    accent: "rgba(56, 189, 248, 0.9)",
    accentSecondary: "rgba(244, 114, 182, 0.9)"
  },
  typography: {
    title: "Typography",
    subtitle: "Font systems",
    description: "Scale, editorial rhythm, and multi-font families for UI, display, and code.",
    tags: ["Font families", "Scale", "Typesetting"],
    accent: "rgba(244, 114, 182, 0.9)",
    accentSecondary: "rgba(94, 234, 212, 0.9)"
  },
  colors: {
    title: "Colors & Tokens",
    subtitle: "Palette operations",
    description: "Semantic palette, surface layers, and tokenized effects for consistent theming.",
    tags: ["Tokens", "Palette", "Surfaces"],
    accent: "rgba(34, 211, 238, 0.9)",
    accentSecondary: "rgba(99, 102, 241, 0.9)"
  },
  spacing: {
    title: "Spacing Scale",
    subtitle: "Spatial rhythm",
    description: "Grid logic, spacing pairs, and layout cadence for responsive systems.",
    tags: ["Grid", "Spacing", "Rhythm"],
    accent: "rgba(56, 189, 248, 0.9)",
    accentSecondary: "rgba(125, 211, 252, 0.9)"
  },
  icons: {
    title: "Icon Set",
    subtitle: "Symbol library",
    description: "Consistent iconography treatments and usage examples.",
    tags: ["Icons", "System", "Symbol"],
    accent: "rgba(94, 234, 212, 0.9)",
    accentSecondary: "rgba(34, 197, 94, 0.9)"
  },
  layout: {
    title: "Layout Grids",
    subtitle: "Responsive scaffolding",
    description: "Grids, containers, and breakpoints to align complex UI layouts.",
    tags: ["Grid", "Layout", "Responsive"],
    accent: "rgba(99, 102, 241, 0.9)",
    accentSecondary: "rgba(56, 189, 248, 0.9)"
  },
  effects: {
    title: "Background Effects",
    subtitle: "Atmosphere toolkit",
    description: "Glass, blur, gradients, and noise layers for premium surfaces.",
    tags: ["Glass", "Noise", "Gradient mesh"],
    accent: "rgba(244, 114, 182, 0.9)",
    accentSecondary: "rgba(59, 130, 246, 0.9)"
  },
  motion: {
    title: "Motion Library",
    subtitle: "Interaction system",
    description: "Tune transitions, spring settings, and micro-interactions with live controls.",
    tags: ["Framer", "Easing", "Springs"],
    accent: "rgba(34, 197, 94, 0.9)",
    accentSecondary: "rgba(14, 165, 233, 0.9)"
  },
  hovers: {
    title: "Hover & Effects",
    subtitle: "Micro interactions",
    description: "Hover states and depth cues that communicate affordance.",
    tags: ["Hover", "Micro", "Depth"],
    accent: "rgba(59, 130, 246, 0.9)",
    accentSecondary: "rgba(236, 72, 153, 0.9)"
  },
  components: {
    title: "Component States",
    subtitle: "UI foundations",
    description: "Button, card, and system components in multiple states.",
    tags: ["Components", "States", "System"],
    accent: "rgba(14, 165, 233, 0.9)",
    accentSecondary: "rgba(168, 85, 247, 0.9)"
  },
  forms: {
    title: "Form States",
    subtitle: "Input logic",
    description: "Inputs, selects, and validation behavior with high clarity.",
    tags: ["Forms", "Input", "Validation"],
    accent: "rgba(34, 211, 238, 0.9)",
    accentSecondary: "rgba(20, 184, 166, 0.9)"
  },
  accessibility: {
    title: "Accessibility",
    subtitle: "Inclusive design",
    description: "Contrast, focus, and a11y guards for inclusive interfaces.",
    tags: ["A11y", "Contrast", "Focus"],
    accent: "rgba(251, 191, 36, 0.9)",
    accentSecondary: "rgba(248, 113, 113, 0.9)"
  },
  charts: {
    title: "Charts & Counters",
    subtitle: "Realtime data",
    description: "Core chart components with animated states.",
    tags: ["Charts", "Counters", "Realtime"],
    accent: "rgba(16, 185, 129, 0.9)",
    accentSecondary: "rgba(56, 189, 248, 0.9)"
  },
  "dashboard-elements": {
    title: "Dashboard Elements",
    subtitle: "Operational UI kit",
    description: "A library of KPI cards, tables, funnels, alerts, and utility widgets for product dashboards.",
    tags: ["KPI", "Tables", "Widgets"],
    accent: "rgba(56, 189, 248, 0.9)",
    accentSecondary: "rgba(139, 92, 246, 0.9)"
  },
  visualization: {
    title: "Visualization Lab",
    subtitle: "Analytic storytelling",
    description: "Interactive data exploration with dynamic scenarios and rich chart types.",
    tags: ["Sankey", "Chord", "Maps"],
    accent: "rgba(14, 165, 233, 0.9)",
    accentSecondary: "rgba(139, 92, 246, 0.9)"
  },
  tokens: {
    title: "Token Export",
    subtitle: "Design ops",
    description: "Export the system as JSON and CSS variables to integrate with production.",
    tags: ["Tokens", "Export", "Dev handoff"],
    accent: "rgba(59, 130, 246, 0.9)",
    accentSecondary: "rgba(34, 197, 94, 0.9)"
  }
};

export const sectionOrder = [
  "overview",
  "design-system",
  "pricing",
  "cta",
  "text-effects",
  "font-effects",
  "typography",
  "colors",
  "spacing",
  "icons",
  "layout",
  "effects",
  "motion",
  "hovers",
  "components",
  "forms",
  "accessibility",
  "charts",
  "dashboard-elements",
  "visualization",
  "tokens"
];

export const sectionGroups = [
  {
    label: "Product",
    items: [
      { id: "overview", label: "Overview", href: "/" },
      { id: "design-system", label: "Design System Index", href: "/sections/design-system" },
      { id: "pricing", label: "Pricing", href: "/sections/pricing" },
      { id: "cta", label: "Call to Action", href: "/sections/cta" }
    ]
  },
  {
    label: "Text Effects",
    items: [
      { id: "text-effects", label: "All Text Effects", href: "/sections/text-effects" },
      { id: "font-effects", label: "Font Effects", href: "/sections/font-effects" }
    ]
  },
  {
    label: "Design System",
    items: [
      { id: "typography", label: "Typography", href: "/sections/typography" },
      { id: "colors", label: "Colors & Tokens", href: "/sections/colors" },
      { id: "spacing", label: "Spacing Scale", href: "/sections/spacing" },
      { id: "icons", label: "Icon Set", href: "/sections/icons" },
      { id: "layout", label: "Layout Grids", href: "/sections/layout" }
    ]
  },
  {
    label: "Backgrounds",
    items: [{ id: "effects", label: "Background Effects", href: "/sections/effects" }]
  },
  {
    label: "Motion",
    items: [
      { id: "motion", label: "Motion Library", href: "/sections/motion" },
      { id: "hovers", label: "Hover + Effects", href: "/sections/hovers" }
    ]
  },
  {
    label: "Components",
    items: [
      { id: "components", label: "Component States", href: "/sections/components" },
      { id: "forms", label: "Form States", href: "/sections/forms" },
      { id: "accessibility", label: "Accessibility", href: "/sections/accessibility" }
    ]
  },
  {
    label: "Data Viz",
    items: [
      { id: "charts", label: "Charts & Counters", href: "/sections/charts" },
      { id: "dashboard-elements", label: "Dashboard Elements", href: "/sections/dashboard-elements" },
      { id: "visualization", label: "Visualization Lab", href: "/sections/visualization" }
    ]
  },
  {
    label: "Export",
    items: [{ id: "tokens", label: "Token Export", href: "/sections/tokens" }]
  }
];
