"use client";

import SectionHero from "@/components/SectionHero";
import SectionRenderer from "@/components/SectionRenderer";
import { sectionMeta, sectionOrder } from "@/data/sections";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Link from "next/link";

type SectionPageProps = {
  sectionId: string;
};

export default function SectionPage({ sectionId }: SectionPageProps) {
  const meta = sectionMeta[sectionId];
  const currentIndex = sectionOrder.indexOf(sectionId);
  const prevId = currentIndex > 0 ? sectionOrder[currentIndex - 1] : null;
  const nextId = currentIndex < sectionOrder.length - 1 ? sectionOrder[currentIndex + 1] : null;
  const toHref = (id: string) => (id === "overview" ? "/" : `/sections/${id}`);
  const token = meta ? JSON.stringify({ section: sectionId, title: meta.title }) : `section:${sectionId}`;

  if (!meta) {
    return (
      <div className="card p-6 text-sm text-soft">
        This section does not exist yet. Use the sidebar to navigate to an available section.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionHero
        title={meta.title}
        subtitle={meta.subtitle}
        description={meta.description}
        tags={meta.tags}
        accent={meta.accent}
        accentSecondary={meta.accentSecondary}
        token={token}
      />
      <div className="section-stage">
        <div className="section-stage-glow" />
        <div className="section-stage-content">
          <ErrorBoundary>
            <SectionRenderer sectionId={sectionId} />
          </ErrorBoundary>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        {prevId ? (
          <Link className="btn" href={toHref(prevId)}>
            ← {sectionMeta[prevId]?.title}
          </Link>
        ) : (
          <span />
        )}
        {nextId ? (
          <Link className="btn btn-primary" href={toHref(nextId)}>
            {sectionMeta[nextId]?.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
