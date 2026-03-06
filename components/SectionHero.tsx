"use client";

import CopyButton from "@/components/CopyButton";

type SectionHeroProps = {
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  accent?: string;
  accentSecondary?: string;
  token?: string;
};

export default function SectionHero({
  title,
  subtitle,
  description,
  tags = [],
  accent = "var(--color-primary)",
  accentSecondary = "var(--color-secondary)",
  token
}: SectionHeroProps) {
  return (
    <div
      className="section-hero"
      style={
        {
          "--hero-accent": accent,
          "--hero-accent-2": accentSecondary
        } as React.CSSProperties
      }
    >
      <div className="section-hero-grid" />
      <div className="section-hero-noise" />
      <div className="section-hero-orb" />
      <div className="section-hero-content">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="section-hero-pill">{subtitle}</div>
          {token && <CopyButton label="Copy token" value={token} />}
        </div>
        <h2 className="text-3xl font-semibold font-display">{title}</h2>
        <p className="text-sm text-soft max-w-2xl">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-soft">
            {tags.map((tag) => (
              <span key={tag} className="section-hero-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
