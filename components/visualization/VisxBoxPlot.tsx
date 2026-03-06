"use client";

import { ParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { quantileSorted } from "d3";
import { useMemo } from "react";

type VisxBoxPlotProps = {
  values: number[];
  width?: number;
  height?: number;
  accent?: string;
};

export default function VisxBoxPlot({ values, width = 220, height = 160, accent = "var(--color-primary)" }: VisxBoxPlotProps) {
  const stats = useMemo(() => {
    const sorted = [...values].sort((a, b) => a - b);
    const min = sorted[0] ?? 0;
    const max = sorted[sorted.length - 1] ?? 0;
    const q1 = quantileSorted(sorted, 0.25) ?? min;
    const median = quantileSorted(sorted, 0.5) ?? min;
    const q3 = quantileSorted(sorted, 0.75) ?? max;
    const iqr = q3 - q1;
    const minWhisker = Math.max(min, q1 - 1.5 * iqr);
    const maxWhisker = Math.min(max, q3 + 1.5 * iqr);
    const outliers = sorted.filter((value) => value < minWhisker || value > maxWhisker);
    return { min, max, q1, q3, median, minWhisker, maxWhisker, outliers };
  }, [values]);

  return (
    <div className="relative h-full w-full">
      <ParentSize>
        {({ width: containerWidth, height: containerHeight }) => {
          const resolvedWidth = Math.max(containerWidth || width, 180);
          const resolvedHeight = Math.max(containerHeight || height, 140);
          const padding = 16;
          const yScale = scaleLinear({
            domain: [stats.min, stats.max],
            range: [resolvedHeight - padding, padding]
          });
          const centerX = resolvedWidth / 2;
          const boxWidth = resolvedWidth * 0.35;
          const whiskerWidth = boxWidth * 0.6;

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              <line
                x1={centerX}
                x2={centerX}
                y1={yScale(stats.minWhisker)}
                y2={yScale(stats.maxWhisker)}
                stroke={accent}
                strokeOpacity={0.4}
                strokeWidth={2}
              />
              <line
                x1={centerX - whiskerWidth / 2}
                x2={centerX + whiskerWidth / 2}
                y1={yScale(stats.minWhisker)}
                y2={yScale(stats.minWhisker)}
                stroke={accent}
                strokeOpacity={0.6}
                strokeWidth={2}
              />
              <line
                x1={centerX - whiskerWidth / 2}
                x2={centerX + whiskerWidth / 2}
                y1={yScale(stats.maxWhisker)}
                y2={yScale(stats.maxWhisker)}
                stroke={accent}
                strokeOpacity={0.6}
                strokeWidth={2}
              />
              <rect
                x={centerX - boxWidth / 2}
                y={yScale(stats.q3)}
                width={boxWidth}
                height={Math.max(1, yScale(stats.q1) - yScale(stats.q3))}
                fill={accent}
                fillOpacity={0.25}
                stroke={accent}
                strokeOpacity={0.7}
                rx={6}
              />
              <line
                x1={centerX - boxWidth / 2}
                x2={centerX + boxWidth / 2}
                y1={yScale(stats.median)}
                y2={yScale(stats.median)}
                stroke={accent}
                strokeWidth={2}
              />
              {stats.outliers.map((value, index) => (
                <circle key={index} cx={centerX} cy={yScale(value)} r={3} fill={accent} opacity={0.6} />
              ))}
            </svg>
          );
        }}
      </ParentSize>
    </div>
  );
}
