"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { LegendOrdinal } from "@visx/legend";
import { Pie } from "@visx/shape";
import { ParentSize } from "@visx/responsive";
import { scaleOrdinal } from "@visx/scale";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type DonutDatum = {
  label: string;
  value: number;
  color?: string;
};

type VisxDonutProps = {
  data: DonutDatum[];
  width?: number;
  height?: number;
};

const palette = [
  "rgba(34, 211, 238, 0.8)",
  "rgba(99, 102, 241, 0.8)",
  "rgba(236, 72, 153, 0.8)",
  "rgba(34, 197, 94, 0.8)",
  "rgba(251, 191, 36, 0.8)"
];

export default function VisxDonut({ data, width = 220, height = 180 }: VisxDonutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

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
          const resolvedWidth = Math.max(containerWidth || width, 200);
          const resolvedHeight = Math.max(containerHeight || height, 160);
          const radius = Math.min(resolvedWidth, resolvedHeight) / 2 - 12;
          const centerX = resolvedWidth / 2;
          const centerY = resolvedHeight / 2;

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              <Pie
                data={data}
                pieValue={(d) => d.value}
                outerRadius={radius}
                innerRadius={radius * 0.6}
                cornerRadius={6}
                padAngle={0.04}
              >
                {(pie) => (
                  <g transform={`translate(${centerX}, ${centerY})`}>
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

      <div className="absolute bottom-3 left-3 rounded-md border border-border bg-surface-1 px-3 py-2 text-[10px] text-soft">
        <LegendOrdinal scale={colorScale} labelFormat={(label) => label} />
      </div>

      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} title={tooltip.title} body={tooltip.body} />
    </div>
  );
}
