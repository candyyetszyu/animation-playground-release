"use client";

import SectionHeader from "@/components/SectionHeader";
import { chartData } from "@/data/visualizationData";
import { useEffect, useMemo, useState } from "react";

const buildData = (count: number, maxValue: number) =>
  Array.from({ length: count }).map(() => Math.round(12 + Math.random() * (maxValue - 12)));

export default function ChartsSection() {
  const [count, setCount] = useState(chartData.length);
  const [maxValue, setMaxValue] = useState(72);
  const [data, setData] = useState(chartData);
  const [highlight, setHighlight] = useState<number | null>(null);

  useEffect(() => {
    setData(buildData(count, maxValue));
  }, [count, maxValue]);

  const average = useMemo(
    () => Math.round(data.reduce((sum, value) => sum + value, 0) / data.length),
    [data]
  );

  const { linePath, areaPath } = useMemo(() => {
    const width = 320;
    const height = 120;
    const padding = 16;
    const max = Math.max(...data, 1);
    const step = (width - padding * 2) / (data.length - 1 || 1);
    const points = data.map((value, index) => {
      const x = padding + index * step;
      const y = height - padding - (value / max) * (height - padding * 2);
      return { x, y };
    });
    const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
    const area = `${line} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;
    return { linePath: line, areaPath: area };
  }, [data]);

  return (
    <section id="charts" className="space-y-6">
      <SectionHeader title="Charts" subtitle="Bars + sparkline" />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Bar chart</h3>
              <span className="text-xs text-soft">Avg {average}</span>
            </div>
            <div className="flex items-end gap-3">
              {data.map((value, index) => (
                <div
                  key={index}
                  className={`w-6 rounded-md ${highlight === index ? "bg-secondary" : "bg-primary/70"}`}
                  style={{ height: `${value}px` }}
                  onMouseEnter={() => setHighlight(index)}
                  onMouseLeave={() => setHighlight(null)}
                />
              ))}
            </div>
            <p className="text-xs text-muted">Hover a bar to inspect values.</p>
          </div>
          <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Sparkline</h3>
            <div className="relative h-24 w-full overflow-hidden rounded-md bg-surface-2">
              <div className="absolute inset-0 flex items-end gap-2 px-4 pb-4">
                {data.map((value, index) => (
                  <div
                    key={index}
                    className="w-2 rounded-full bg-secondary/70"
                    style={{ height: `${value / 2}px` }}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted">Use for compact KPI trends.</p>
          </div>
          <div className="card card-hover card-volumetric card-refract space-y-4 p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Area trend</h3>
              <span className="text-xs text-soft">Auto scaled</span>
            </div>
            <div className="rounded-md border border-border bg-surface-2 p-3">
              <svg viewBox="0 0 320 120" className="h-28 w-full">
                <path d={areaPath} fill="rgba(56, 189, 248, 0.25)" />
                <path d={linePath} stroke="var(--color-primary)" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <p className="text-xs text-muted">Great for hero metrics and analytics dashboards.</p>
          </div>
        </div>
        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Data controls</h3>
          <label className="flex flex-col gap-2 text-sm">
            Data points ({count})
            <input
              type="range"
              min={4}
              max={12}
              step={1}
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Max value ({maxValue})
            <input
              type="range"
              min={40}
              max={120}
              step={4}
              value={maxValue}
              onChange={(event) => setMaxValue(Number(event.target.value))}
            />
          </label>
          <button
            type="button"
            className="btn"
            onClick={() => setData(buildData(count, maxValue))}
          >
            Randomize
          </button>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            Adjust the dataset to preview chart behavior under different ranges.
          </div>
        </div>
      </div>
    </section>
  );
}
