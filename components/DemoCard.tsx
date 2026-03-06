"use client";

import CopyButton from "./CopyButton";
import MotionDemo, { MotionSettings } from "./MotionDemo";

type DemoCardProps = {
  name: string;
  description: string;
  tags: string[];
  type: string;
  snippet: string;
  settings: MotionSettings;
};

export default function DemoCard({
  name,
  description,
  tags,
  type,
  snippet,
  settings
}: DemoCardProps) {
  return (
    <div className="card card-hover card-holo card-refract flex h-full flex-col gap-4 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{name}</h3>
          <p className="text-sm text-muted">{description}</p>
        </div>
        <CopyButton label="Copy snippet" value={snippet} />
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>
      <div id={`demo-${type}`} className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-border bg-surface-2 p-4 will-change-transform">
        <MotionDemo type={type} settings={settings} />
      </div>
    </div>
  );
}
