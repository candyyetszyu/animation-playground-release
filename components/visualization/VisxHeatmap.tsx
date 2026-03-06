"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { max, min } from "d3";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type HeatmapCell = {
  x: string;
  y: string;
  value: number;
};

type VisxHeatmapProps = {
  data: HeatmapCell[];
  width?: number;
  height?: number;
};

export default function VisxHeatmap({ data, width = 260, height = 180 }: VisxHeatmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

  const xLabels = useMemo(() => Array.from(new Set(data.map((d) => d.x))), [data]);
  const yLabels = useMemo(() => Array.from(new Set(data.map((d) => d.y))), [data]);
  const minValue = min(data.map((d) => d.value)) ?? 0;
  const maxValue = max(data.map((d) => d.value)) ?? 1;

  const colorScale = useMemo(
    () =>
      scaleLinear<string>({
        domain: [minValue, (minValue + maxValue) / 2, maxValue],
        range: ["rgba(34, 211, 238, 0.15)", "rgba(59, 130, 246, 0.5)", "rgba(168, 85, 247, 0.8)"]
      }),
    [minValue, maxValue]
  );

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
          const padding = { top: 16, right: 16, bottom: 32, left: 40 };

          const xScale = scaleBand({
            domain: xLabels,
            range: [padding.left, resolvedWidth - padding.right],
            padding: 0.12
          });
          const yScale = scaleBand({
            domain: yLabels,
            range: [padding.top, resolvedHeight - padding.bottom],
            padding: 0.12
          });

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              <AxisBottom
                top={resolvedHeight - padding.bottom}
                scale={xScale}
                stroke="rgba(255,255,255,0.2)"
                tickStroke="rgba(255,255,255,0.2)"
                tickLabelProps={() => ({
                  fill: "var(--color-soft)",
                  fontSize: 8,
                  textAnchor: "middle"
                })}
              />
              <AxisLeft
                left={padding.left}
                scale={yScale}
                stroke="rgba(255,255,255,0.2)"
                tickStroke="rgba(255,255,255,0.2)"
                tickLabelProps={() => ({
                  fill: "var(--color-soft)",
                  fontSize: 8,
                  textAnchor: "end",
                  dx: -4
                })}
              />
              {data.map((cell) => {
                const x = xScale(cell.x) ?? 0;
                const y = yScale(cell.y) ?? 0;
                return (
                  <rect
                    key={`${cell.x}-${cell.y}`}
                    x={x}
                    y={y}
                    width={xScale.bandwidth()}
                    height={yScale.bandwidth()}
                    rx={4}
                    fill={colorScale(cell.value)}
                    stroke="rgba(255,255,255,0.08)"
                    onMouseMove={(event) =>
                      handleMove(event, `${cell.x} · ${cell.y}`, `Value: ${cell.value.toFixed(2)}`)
                    }
                    onMouseLeave={clearTooltip}
                  />
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
