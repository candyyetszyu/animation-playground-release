"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { ParentSize } from "@visx/responsive";
import { scaleLinear } from "@visx/scale";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { max, min } from "d3";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type ScatterDatum = {
  id: string;
  x: number;
  y: number;
  label?: string;
};

type VisxScatterPlotProps = {
  data: ScatterDatum[];
  xLabel?: string;
  yLabel?: string;
  width?: number;
  height?: number;
  accent?: string;
};

export default function VisxScatterPlot({
  data,
  xLabel = "Index",
  yLabel = "Value",
  width = 240,
  height = 180,
  accent = "var(--color-primary)"
}: VisxScatterPlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

  const xDomain = useMemo(() => {
    const minValue = min(data.map((d) => d.x)) ?? 0;
    const maxValue = max(data.map((d) => d.x)) ?? 1;
    return [minValue, maxValue];
  }, [data]);

  const yDomain = useMemo(() => {
    const minValue = min(data.map((d) => d.y)) ?? 0;
    const maxValue = max(data.map((d) => d.y)) ?? 1;
    return [minValue, maxValue];
  }, [data]);

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
          const resolvedHeight = Math.max(containerHeight || height, 180);
          const padding = { top: 16, right: 16, bottom: 32, left: 40 };

          const xScale = scaleLinear({
            domain: xDomain,
            range: [padding.left, resolvedWidth - padding.right]
          });
          const yScale = scaleLinear({
            domain: yDomain,
            range: [resolvedHeight - padding.bottom, padding.top]
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
                  fontSize: 9,
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
                  fontSize: 9,
                  textAnchor: "end",
                  dx: -4
                })}
              />
              <text x={resolvedWidth / 2} y={resolvedHeight - 6} fill="var(--color-soft)" fontSize={9}>
                {xLabel}
              </text>
              <text
                x={-resolvedHeight / 2}
                y={12}
                fill="var(--color-soft)"
                fontSize={9}
                transform="rotate(-90)"
              >
                {yLabel}
              </text>
              {data.map((point) => (
                <circle
                  key={point.id}
                  cx={xScale(point.x)}
                  cy={yScale(point.y)}
                  r={4}
                  fill={accent}
                  fillOpacity={0.7}
                  stroke="rgba(255,255,255,0.3)"
                  onMouseMove={(event) =>
                    handleMove(event, point.label ?? point.id, `x: ${point.x.toFixed(1)} · y: ${point.y.toFixed(1)}`)
                  }
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
