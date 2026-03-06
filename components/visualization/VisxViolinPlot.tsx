"use client";

import { ParentSize } from "@visx/responsive";
import { Area } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { mean, quantileSorted, ticks } from "d3";
import { useMemo } from "react";

type DensityPoint = {
  value: number;
  density: number;
};

type VisxViolinPlotProps = {
  values: number[];
  width?: number;
  height?: number;
  accent?: string;
};

function kernelDensityEstimator(kernel: (value: number) => number, sample: number[], xs: number[]) {
  return xs.map((x) => ({
    value: x,
    density: mean(sample, (v) => kernel(x - v)) ?? 0
  }));
}

function gaussianKernel(bandwidth: number) {
  return (value: number) => Math.exp(-0.5 * (value / bandwidth) ** 2) / (bandwidth * Math.sqrt(2 * Math.PI));
}

export default function VisxViolinPlot({
  values,
  width = 240,
  height = 160,
  accent = "var(--color-secondary)"
}: VisxViolinPlotProps) {
  const stats = useMemo(() => {
    const sorted = [...values].sort((a, b) => a - b);
    const min = sorted[0] ?? 0;
    const max = sorted[sorted.length - 1] ?? 0;
    const median = quantileSorted(sorted, 0.5) ?? min;
    return { min, max, median };
  }, [values]);

  const density = useMemo(() => {
    const range = stats.max - stats.min || 1;
    const bandwidth = range / 6;
    const xValues = ticks(stats.min, stats.max, 30);
    return kernelDensityEstimator(gaussianKernel(bandwidth), values, xValues);
  }, [values, stats.min, stats.max]);

  return (
    <div className="relative h-full w-full">
      <ParentSize>
        {({ width: containerWidth, height: containerHeight }) => {
          const resolvedWidth = Math.max(containerWidth || width, 200);
          const resolvedHeight = Math.max(containerHeight || height, 140);
          const padding = 16;
          const xScale = scaleLinear({
            domain: [stats.min, stats.max],
            range: [padding, resolvedWidth - padding]
          });
          const maxDensity = Math.max(...density.map((d) => d.density), 1);
          const densityScale = scaleLinear({
            domain: [0, maxDensity],
            range: [0, (resolvedHeight - padding * 2) / 2]
          });
          const centerY = resolvedHeight / 2;

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              <Area
                data={density as DensityPoint[]}
                x={(d) => xScale(d.value)}
                y0={(d) => centerY - densityScale(d.density)}
                y1={(d) => centerY + densityScale(d.density)}
                fill={accent}
                fillOpacity={0.25}
                stroke={accent}
                strokeOpacity={0.7}
                strokeWidth={2}
              />
              <line
                x1={xScale(stats.median)}
                x2={xScale(stats.median)}
                y1={centerY - densityScale(maxDensity)}
                y2={centerY + densityScale(maxDensity)}
                stroke={accent}
                strokeWidth={1.5}
                strokeOpacity={0.8}
                strokeDasharray="4 4"
              />
            </svg>
          );
        }}
      </ParentSize>
    </div>
  );
}
