"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { max, min } from "d3";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type WaterfallDatum = {
  label: string;
  value: number;
};

type WaterfallStep = WaterfallDatum & {
  start: number;
  end: number;
};

type VisxWaterfallProps = {
  data: WaterfallDatum[];
  width?: number;
  height?: number;
};

export default function VisxWaterfall({ data, width = 240, height = 160 }: VisxWaterfallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

  const steps = useMemo<WaterfallStep[]>(() => {
    let cumulative = 0;
    return data.map((item) => {
      const start = cumulative;
      const end = cumulative + item.value;
      cumulative = end;
      return { ...item, start, end };
    });
  }, [data]);

  const minValue = min(steps.flatMap((step) => [step.start, step.end])) ?? 0;
  const maxValue = max(steps.flatMap((step) => [step.start, step.end])) ?? 0;

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
          const resolvedHeight = Math.max(containerHeight || height, 140);
          const padding = 16;
          const xScale = scaleBand({
            domain: steps.map((step) => step.label),
            range: [padding, resolvedWidth - padding],
            padding: 0.25
          });
          const yScale = scaleLinear({
            domain: [minValue, maxValue],
            range: [resolvedHeight - padding, padding]
          });

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              <line
                x1={padding}
                x2={resolvedWidth - padding}
                y1={yScale(0)}
                y2={yScale(0)}
                stroke="rgba(255,255,255,0.2)"
              />
              {steps.map((step, index) => {
                const x = xScale(step.label) ?? 0;
                const barWidth = xScale.bandwidth();
                const barTop = yScale(Math.max(step.start, step.end));
                const barHeight = Math.abs(yScale(step.start) - yScale(step.end));
                const color = step.value >= 0 ? "var(--color-success)" : "var(--color-danger)";
                const next = steps[index + 1];
                const connectorX = x + barWidth;
                const connectorY = yScale(step.end);

                return (
                  <g key={step.label}>
                    <rect
                      x={x}
                      y={barTop}
                      width={barWidth}
                      height={Math.max(2, barHeight)}
                      rx={4}
                      fill={color}
                      fillOpacity={0.6}
                      onMouseMove={(event) =>
                        handleMove(event, step.label, `Δ ${step.value} · Total ${step.end}`)
                      }
                      onMouseLeave={clearTooltip}
                    />
                    {next && (
                      <line
                        x1={connectorX}
                        x2={(xScale(next.label) ?? 0)}
                        y1={connectorY}
                        y2={connectorY}
                        stroke="rgba(255,255,255,0.2)"
                      />
                    )}
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
