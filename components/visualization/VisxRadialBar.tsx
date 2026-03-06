"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { ParentSize } from "@visx/responsive";
import { Pie } from "@visx/shape";
import { scaleOrdinal } from "@visx/scale";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type RadialDatum = {
  label: string;
  value: number;
  color?: string;
};

type VisxRadialBarProps = {
  data: RadialDatum[];
  width?: number;
  height?: number;
};

const palette = [
  "rgba(34, 211, 238, 0.85)",
  "rgba(139, 92, 246, 0.85)",
  "rgba(244, 114, 182, 0.8)",
  "rgba(34, 197, 94, 0.8)",
  "rgba(251, 191, 36, 0.8)"
];

export default function VisxRadialBar({ data, width = 220, height = 200 }: VisxRadialBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

  const max = Math.max(...data.map((d) => d.value), 1);
  const colorScale = useMemo(
    () =>
      scaleOrdinal<string, string>({
        domain: data.map((d) => d.label),
        range: data.map((d, index) => d.color ?? palette[index % palette.length])
      }),
    [data]
  );

  const handleMove = (event: MouseEvent, title: string, body: string) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      x: event.clientX - rect.left + 10,
      y: event.clientY - rect.top + 10,
      title,
      body
    });
  };

  const clearTooltip = () => setTooltip((prev) => ({ ...prev, visible: false }));

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <ParentSize>
        {({ width: containerWidth, height: containerHeight }) => {
          const resolvedWidth = Math.max(containerWidth || width, 200);
          const resolvedHeight = Math.max(containerHeight || height, 160);
          const radius = Math.min(resolvedWidth, resolvedHeight) / 2 - 8;
          const inner = radius * 0.35;

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              <Pie
                data={data}
                pieValue={() => 1}
                innerRadius={inner}
                outerRadius={(arc) => inner + (arc.data.value / max) * (radius - inner)}
                padAngle={0.04}
                cornerRadius={6}
              >
                {(pie) => (
                  <g transform={`translate(${resolvedWidth / 2}, ${resolvedHeight / 2})`}>
                    {pie.arcs.map((arc) => (
                      <path
                        key={arc.data.label}
                        d={pie.path(arc) ?? undefined}
                        fill={colorScale(arc.data.label)}
                        onMouseMove={(event) =>
                          handleMove(event, arc.data.label, `Value: ${arc.data.value}`)
                        }
                        onMouseLeave={clearTooltip}
                      />
                    ))}
                  </g>
                )}
              </Pie>
            </svg>
          );
        }}
      </ParentSize>
      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} title={tooltip.title} body={tooltip.body} />
    </div>
  );
}
