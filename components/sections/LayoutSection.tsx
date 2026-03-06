"use client";

import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";

export default function LayoutSection() {
  const [columns, setColumns] = useState(12);
  const [gutter, setGutter] = useState(12);
  const [container, setContainer] = useState(960);

  const mainSpan = Math.max(4, Math.round(columns * 0.65));
  const sideSpan = Math.max(2, columns - mainSpan);

  return (
    <section id="layout" className="space-y-6">
      <SectionHeader title="Layout Grids" subtitle="Responsive scaffolding" />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gap: `${gutter}px`,
              maxWidth: container,
              margin: "0 auto"
            }}
          >
            {Array.from({ length: columns }).map((_, index) => (
              <div
                key={index}
                className="h-14 rounded-md bg-surface-2 text-center text-xs leading-[3.5rem] text-muted"
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gap: `${gutter}px`,
              maxWidth: container,
              margin: "0 auto"
            }}
          >
            <div
              className="rounded-md bg-primary/20 p-3 text-xs"
              style={{ gridColumn: `span ${mainSpan}` }}
            >
              Main content
            </div>
            <div
              className="rounded-md bg-secondary/20 p-3 text-xs"
              style={{ gridColumn: `span ${sideSpan}` }}
            >
              Sidebar
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4">
            <div className="text-xs text-muted">Masonry preview</div>
            <div
              className="mt-3"
              style={{ columnCount: 3, columnGap: `${gutter}px` }}
            >
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="mb-3 break-inside-avoid rounded-md bg-primary/20 p-2 text-[10px] text-muted"
                  style={{ height: 24 + (index % 4) * 12 }}
                >
                  Block {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Layout controls</h3>
          <label className="flex flex-col gap-2 text-sm">
            Columns ({columns})
            <input
              type="range"
              min={4}
              max={16}
              step={1}
              value={columns}
              onChange={(event) => setColumns(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Gutter ({gutter}px)
            <input
              type="range"
              min={6}
              max={32}
              step={2}
              value={gutter}
              onChange={(event) => setGutter(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Container width ({container}px)
            <input
              type="range"
              min={720}
              max={1280}
              step={40}
              value={container}
              onChange={(event) => setContainer(Number(event.target.value))}
            />
          </label>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            Adjust columns and gutters to preview responsive layout rhythm.
          </div>
        </div>
      </div>
    </section>
  );
}
