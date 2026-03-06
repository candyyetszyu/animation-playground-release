"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scalePoint } from "@visx/scale";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type ParallelDimension = {
  key: string;
  label: string;
  min: number;
  max: number;
};

type ParallelDatum = {
  id: string;
  [key: string]: string | number;
};

type VisxParallelCoordinatesProps = {
  data: ParallelDatum[];
  dimensions: ParallelDimension[];
  width?: number;
  height?: number;
};

export default function VisxParallelCoordinates({
  data,
  dimensions,
  width = 260,
  height = 140
}: VisxParallelCoordinatesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    lines: [] as string[]
  });

  const handleMove = (event: MouseEvent, item: ParallelDatum) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      x: event.clientX - rect.left + 10,
      y: event.clientY - rect.top + 10,
      title: item.id,
      lines: dimensions.map((dim) => `${dim.label}: ${Number(item[dim.key]).toFixed(0)}`)
    });
  };

  const clearTooltip = () => setTooltip((prev) => ({ ...prev, visible: false }));

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <ParentSize>
        {({ width: containerWidth, height: containerHeight }) => {
          const resolvedWidth = Math.max(containerWidth || width, 220);
          const resolvedHeight = Math.max(containerHeight || height, 120);
          const padding = { top: 16, right: 16, bottom: 20, left: 16 };

          const xScale = scalePoint({
            domain: dimensions.map((d) => d.key),
            range: [padding.left, resolvedWidth - padding.right]
          });

          const yScales = Object.fromEntries(
            dimensions.map((dim) => [
              dim.key,
              scaleLinear({
                domain: [dim.min, dim.max],
                range: [resolvedHeight - padding.bottom, padding.top]
              })
            ])
          );

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              {dimensions.map((dim) => {
                const x = xScale(dim.key) ?? 0;
                return (
                  <g key={dim.key}>
                    <line x1={x} y1={padding.top} x2={x} y2={resolvedHeight - padding.bottom} stroke="rgba(255,255,255,0.2)" />
                    <text x={x} y={resolvedHeight - 4} textAnchor="middle" fontSize="8" fill="var(--color-soft)">
                      {dim.label}
                    </text>
                  </g>
                );
              })}
              {data.map((item) => {
                const points = dimensions
                  .map((dim) => {
                    const x = xScale(dim.key) ?? 0;
                    const y = yScales[dim.key](Number(item[dim.key]));
                    return `${x},${y}`;
                  })
                  .join(" ");
                return (
                  <polyline
                    key={item.id}
                    points={points}
                    fill="none"
                    stroke={active && active !== item.id ? "rgba(255,255,255,0.15)" : "rgba(34, 211, 238, 0.75)"}
                    strokeWidth={active === item.id ? 2.5 : 1.5}
                    onMouseEnter={() => setActive(item.id)}
                    onMouseLeave={() => setActive(null)}
                    onMouseMove={(event) => handleMove(event, item)}
                    onMouseOut={clearTooltip}
                  />
                );
              })}
            </svg>
          );
        }}
      </ParentSize>
      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} title={tooltip.title} lines={tooltip.lines} />
    </div>
  );
}
