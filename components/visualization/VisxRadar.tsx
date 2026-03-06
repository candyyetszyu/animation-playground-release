"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { ParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { max } from "d3";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type RadarDatum = {
  label: string;
  value: number;
};

type VisxRadarProps = {
  data: RadarDatum[];
  width?: number;
  height?: number;
  accent?: string;
};

export default function VisxRadar({ data, width = 240, height = 200, accent = "var(--color-primary)" }: VisxRadarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

  const maxValue = max(data.map((d) => d.value)) ?? 100;
  const rings = 4;

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
          const resolvedHeight = Math.max(containerHeight || height, 180);
          const centerX = resolvedWidth / 2;
          const centerY = resolvedHeight / 2;
          const radius = Math.min(resolvedWidth, resolvedHeight) / 2 - 24;
          const angleStep = (Math.PI * 2) / data.length;
          const rScale = scaleLinear({
            domain: [0, maxValue],
            range: [0, radius]
          });

          const points = data.map((d, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const r = rScale(d.value);
            return {
              ...d,
              x: centerX + Math.cos(angle) * r,
              y: centerY + Math.sin(angle) * r,
              angle
            };
          });

          const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              {Array.from({ length: rings }).map((_, idx) => {
                const ringRadius = ((idx + 1) / rings) * radius;
                return (
                  <circle
                    key={idx}
                    cx={centerX}
                    cy={centerY}
                    r={ringRadius}
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                  />
                );
              })}
              {points.map((point, idx) => (
                <line
                  key={`axis-${point.label}`}
                  x1={centerX}
                  y1={centerY}
                  x2={centerX + Math.cos(point.angle) * radius}
                  y2={centerY + Math.sin(point.angle) * radius}
                  stroke="rgba(255,255,255,0.2)"
                />
              ))}
              <polygon points={polygonPoints} fill={accent} fillOpacity={0.25} stroke={accent} strokeWidth={2} />
              {points.map((point) => (
                <circle
                  key={point.label}
                  cx={point.x}
                  cy={point.y}
                  r={4}
                  fill={accent}
                  onMouseMove={(event) => handleMove(event, point.label, `Score: ${point.value}`)}
                  onMouseLeave={clearTooltip}
                />
              ))}
            </svg>
          );
        }}
      </ParentSize>
      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} title={tooltip.title} body={tooltip.body} />
    </div>
  );
}
