"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { ParentSize } from "@visx/responsive";
import { scaleBand, scaleLinear } from "@visx/scale";
import { bin, max, min } from "d3";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type HistogramBin = {
  index: number;
  count: number;
  x0: number;
  x1: number;
};

type VisxHistogramProps = {
  values: number[];
  bins?: number;
  width?: number;
  height?: number;
  accent?: string;
};

export default function VisxHistogram({
  values,
  bins = 7,
  width = 240,
  height = 160,
  accent = "var(--color-primary)"
}: VisxHistogramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

  const histogram = useMemo<HistogramBin[]>(() => {
    const minValue = min(values) ?? 0;
    const maxValue = max(values) ?? minValue + 1;
    const generator = bin().domain([minValue, maxValue]).thresholds(bins);
    return generator(values).map((bucket, index) => ({
      index,
      count: bucket.length,
      x0: bucket.x0 ?? minValue,
      x1: bucket.x1 ?? maxValue
    }));
  }, [values, bins]);

  const maxCount = Math.max(...histogram.map((item) => item.count), 1);

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
          const xScale = scaleBand<number>({
            domain: histogram.map((item) => item.index),
            range: [padding, resolvedWidth - padding],
            padding: 0.2
          });
          const yScale = scaleLinear({
            domain: [0, maxCount],
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
              {histogram.map((item) => {
                const barWidth = xScale.bandwidth();
                const barX = xScale(item.index) ?? 0;
                const barHeight = yScale(0) - yScale(item.count);
                return (
                  <rect
                    key={item.index}
                    x={barX}
                    y={yScale(item.count)}
                    width={barWidth}
                    height={Math.max(2, barHeight)}
                    rx={4}
                    fill={accent}
                    fillOpacity={0.6}
                    onMouseMove={(event) =>
                      handleMove(
                        event,
                        `Range ${Math.round(item.x0)}–${Math.round(item.x1)}`,
                        `Count: ${item.count}`
                      )
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
