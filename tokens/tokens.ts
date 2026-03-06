export const colorTokens = [
  { name: "--color-bg", label: "Background", value: "var(--color-bg)" },
  { name: "--color-surface-1", label: "Surface 1", value: "var(--color-surface-1)" },
  { name: "--color-surface-2", label: "Surface 2", value: "var(--color-surface-2)" },
  { name: "--color-surface-3", label: "Surface 3", value: "var(--color-surface-3)" },
  { name: "--color-text", label: "Text", value: "var(--color-text)" },
  { name: "--color-border", label: "Border", value: "var(--color-border)" },
  { name: "--color-primary", label: "Primary", value: "var(--color-primary)" },
  { name: "--color-secondary", label: "Secondary", value: "var(--color-secondary)" },
  { name: "--color-success", label: "Success", value: "var(--color-success)" },
  { name: "--color-warn", label: "Warning", value: "var(--color-warn)" },
  { name: "--color-danger", label: "Danger", value: "var(--color-danger)" }
];

export const shadowTokens = [
  { name: "--shadow-1", label: "Shadow 1", value: "var(--shadow-1)" },
  { name: "--shadow-2", label: "Shadow 2", value: "var(--shadow-2)" },
  { name: "--shadow-3", label: "Shadow 3", value: "var(--shadow-3)" }
];

export const radiusTokens = [
  { name: "--radius-sm", label: "Radius SM", value: "var(--radius-sm)" },
  { name: "--radius-md", label: "Radius MD", value: "var(--radius-md)" },
  { name: "--radius-lg", label: "Radius LG", value: "var(--radius-lg)" },
  { name: "--radius-xl", label: "Radius XL", value: "var(--radius-xl)" }
];

export const typeScale = [
  { name: "H1", className: "text-5xl font-semibold", size: "3rem" },
  { name: "H2", className: "text-4xl font-semibold", size: "2.25rem" },
  { name: "H3", className: "text-3xl font-semibold", size: "1.875rem" },
  { name: "H4", className: "text-2xl font-semibold", size: "1.5rem" },
  { name: "H5", className: "text-xl font-semibold", size: "1.25rem" },
  { name: "H6", className: "text-lg font-semibold", size: "1.125rem" },
  { name: "Subtitle", className: "text-base font-medium", size: "1rem" },
  { name: "Body", className: "text-base", size: "1rem" },
  { name: "Small", className: "text-sm", size: "0.875rem" },
  { name: "Overline", className: "text-xs uppercase tracking-widest", size: "0.75rem" },
  { name: "Mono", className: "text-sm font-mono", size: "0.875rem" },
  { name: "Caption", className: "text-xs", size: "0.75rem" }
];

export const demoText =
  "Design systems become easier to build when typography, motion, and components are visible in one place.";

export const fontFamilies = [
  { id: "inter", label: "Inter", variable: "var(--font-inter)", category: "UI" },
  { id: "manrope", label: "Manrope", variable: "var(--font-manrope)", category: "UI" },
  { id: "space", label: "Space Grotesk", variable: "var(--font-space)", category: "Display" },
  { id: "sora", label: "Sora", variable: "var(--font-sora)", category: "Display" },
  { id: "jakarta", label: "Plus Jakarta Sans", variable: "var(--font-jakarta)", category: "UI" },
  { id: "dm-sans", label: "DM Sans", variable: "var(--font-dm-sans)", category: "UI" },
  { id: "outfit", label: "Outfit", variable: "var(--font-outfit)", category: "Display" },
  { id: "plex", label: "IBM Plex Sans", variable: "var(--font-plex)", category: "UI" },
  { id: "playfair", label: "Playfair Display", variable: "var(--font-playfair)", category: "Editorial" },
  { id: "jetbrains", label: "JetBrains Mono", variable: "var(--font-jetbrains)", category: "Mono" }
];
