"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { max, min } from "d3";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type CandleDatum = {
  label: string;
  open: number;
  close: number;
  high: number;
  low: number;
};

type VisxCandlestickProps = {
  data: CandleDatum[];
  width?: number;
  height?: number;
};

export default function VisxCandlestick({ data, width = 260, height = 180 }: VisxCandlestickProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

  const minValue = min(data.map((d) => d.low)) ?? 0;
  const maxValue = max(data.map((d) => d.high)) ?? 0;

  const handleMove = (event: MouseEvent, title: string, body: string) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      x: event.clientX - rect.left + 12,
      y: event.clientY - rect.top + 12,
      title,
      body
    });
  };

  const clearTooltip = () => setTooltip((prev) => ({ ...prev, visible: false }));

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <ParentSize>
        {({ width: containerWidth, height: containerHeight }) => {
          const resolvedWidth = Math.max(containerWidth || width, 220);
          const resolvedHeight = Math.max(containerHeight || height, 160);
          const padding = 16;
          const xScale = scaleBand({
            domain: data.map((d) => d.label),
            range: [padding, resolvedWidth - padding],
            padding: 0.35
          });
          const yScale = scaleLinear({
            domain: [minValue, maxValue],
            range: [resolvedHeight - padding, padding]
          });

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              {data.map((d) => {
                const x = (xScale(d.label) ?? 0) + xScale.bandwidth() / 2;
                const bodyWidth = xScale.bandwidth();
                const bodyTop = yScale(Math.max(d.open, d.close));
                const bodyBottom = yScale(Math.min(d.open, d.close));
                const color = d.close >= d.open ? "var(--color-success)" : "var(--color-danger)";

                return (
                  <g key={d.label}>
                    <line
                      x1={x}
                      x2={x}
                      y1={yScale(d.low)}
                      y2={yScale(d.high)}
                      stroke={color}
                      strokeWidth={2}
                      opacity={0.6}
                    />
                    <rect
                      x={x - bodyWidth / 2}
                      y={bodyTop}
                      width={bodyWidth}
                      height={Math.max(2, bodyBottom - bodyTop)}
                      rx={4}
                      fill={color}
                      fillOpacity={0.6}
                      onMouseMove={(event) =>
                        handleMove(
                          event,
                          d.label,
                          `O:${d.open} H:${d.high} L:${d.low} C:${d.close}`
                        )
                      }
                      onMouseLeave={clearTooltip}
                    />
                  </g>
                );
              })}
            </svg>
          );
        }}
      </ParentSize>
      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} title={tooltip.title} body={tooltip.body} />
    </div>
  );
}
