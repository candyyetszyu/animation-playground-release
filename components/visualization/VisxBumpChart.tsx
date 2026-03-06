"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { ParentSize } from "@visx/responsive";
import { scalePoint, scaleLinear, scaleOrdinal } from "@visx/scale";
import { line as d3Line, curveMonotoneX } from "d3";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type BumpSeries = {
  label: string;
  values: number[];
  color?: string;
};

type VisxBumpChartProps = {
  series: BumpSeries[];
  labels: string[];
  width?: number;
  height?: number;
};

const palette = [
  "rgba(34, 211, 238, 0.85)",
  "rgba(139, 92, 246, 0.8)",
  "rgba(244, 114, 182, 0.75)",
  "rgba(34, 197, 94, 0.75)",
  "rgba(251, 191, 36, 0.7)"
];

export default function VisxBumpChart({ series, labels, width = 260, height = 160 }: VisxBumpChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

  const maxRank = Math.max(...series.flatMap((item) => item.values), 1);
  const colorScale = useMemo(
    () =>
      scaleOrdinal<string, string>({
        domain: series.map((item) => item.label),
        range: series.map((item, index) => item.color ?? palette[index % palette.length])
      }),
    [series]
  );

  const handleMove = (event: MouseEvent, label: string, value: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      x: event.clientX - rect.left + 10,
      y: event.clientY - rect.top + 10,
      title: label,
      body: `Rank: ${value}`
    });
  };

  const clearTooltip = () => setTooltip((prev) => ({ ...prev, visible: false }));

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <ParentSize>
        {({ width: containerWidth, height: containerHeight }) => {
          const resolvedWidth = Math.max(containerWidth || width, 220);
          const resolvedHeight = Math.max(containerHeight || height, 140);
          const padding = { top: 16, right: 16, bottom: 20, left: 20 };

          const xScale = scalePoint({
            domain: labels,
            range: [padding.left, resolvedWidth - padding.right]
          });
          const yScale = scaleLinear({
            domain: [1, maxRank],
            range: [padding.top, resolvedHeight - padding.bottom]
          });

          const lineBuilder = d3Line<number>()
            .x((_, index) => xScale(labels[index]) ?? 0)
            .y((value) => yScale(value))
            .curve(curveMonotoneX);

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              {series.map((item) => (
                <g key={item.label}>
                  <path
                    d={lineBuilder(item.values) ?? undefined}
                    fill="none"
                    stroke={colorScale(item.label)}
                    strokeWidth={active === item.label ? 3 : 2}
                    opacity={active && active !== item.label ? 0.3 : 1}
                    onMouseEnter={() => setActive(item.label)}
                    onMouseLeave={() => setActive(null)}
                  />
                  {item.values.map((value, index) => (
                    <circle
                      key={`${item.label}-${index}`}
                      cx={xScale(labels[index]) ?? 0}
                      cy={yScale(value)}
                      r={active === item.label ? 3 : 2}
                      fill={colorScale(item.label)}
                      onMouseMove={(event) => handleMove(event, item.label, value)}
                      onMouseLeave={clearTooltip}
                    />
                  ))}
                </g>
              ))}
            </svg>
          );
        }}
      </ParentSize>
      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} title={tooltip.title} body={tooltip.body} />
    </div>
  );
}
