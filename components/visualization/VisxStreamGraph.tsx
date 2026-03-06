"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { ParentSize } from "@visx/responsive";
import { AreaStack } from "@visx/shape";
import { curveCatmullRom } from "@visx/curve";
import { scaleLinear, scalePoint, scaleOrdinal } from "@visx/scale";
import { max } from "d3";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type StreamDatum = {
  x: string;
  [key: string]: string | number;
};

type VisxStreamGraphProps = {
  data: StreamDatum[];
  keys: string[];
  width?: number;
  height?: number;
};

const palette = [
  "rgba(34, 211, 238, 0.7)",
  "rgba(139, 92, 246, 0.65)",
  "rgba(244, 114, 182, 0.6)",
  "rgba(34, 197, 94, 0.6)",
  "rgba(251, 191, 36, 0.55)"
];

export default function VisxStreamGraph({ data, keys, width = 260, height = 160 }: VisxStreamGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: "",
    lines: [] as string[]
  });

  const totalMax = useMemo(() => {
    return (
      max(data.map((d) => keys.reduce((sum, key) => sum + Number(d[key] ?? 0), 0))) ?? 1
    );
  }, [data, keys]);

  const colorScale = useMemo(
    () =>
      scaleOrdinal<string, string>({
        domain: keys,
        range: keys.map((key, index) => palette[index % palette.length])
      }),
    [keys]
  );

  const handleMove = (event: MouseEvent, label: string, values: number[]) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      x: event.clientX - rect.left + 12,
      y: event.clientY - rect.top + 12,
      title: label,
      body: `Total: ${values.reduce((sum, v) => sum + v, 0).toFixed(1)}`,
      lines: keys.map((key, index) => `${key}: ${values[index].toFixed(1)}`)
    });
  };

  const clearTooltip = () => setTooltip((prev) => ({ ...prev, visible: false }));

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <ParentSize>
        {({ width: containerWidth, height: containerHeight }) => {
          const resolvedWidth = Math.max(containerWidth || width, 220);
          const resolvedHeight = Math.max(containerHeight || height, 140);
          const padding = { top: 12, right: 16, bottom: 16, left: 24 };

          const xScale = scalePoint({
            domain: data.map((d) => d.x as string),
            range: [padding.left, resolvedWidth - padding.right]
          });
          const yScale = scaleLinear({
            domain: [0, totalMax],
            range: [resolvedHeight - padding.bottom, padding.top]
          });

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              <AreaStack
                keys={keys}
                data={data}
                x={(d) => xScale(d.data.x as string) ?? 0}
                y0={(d) => yScale(d[0])}
                y1={(d) => yScale(d[1])}
                curve={curveCatmullRom}
              >
                {(stack) =>
                  stack.stacks.map((stacked) => (
                    <path
                      key={stacked.key}
                      d={stack.path(stacked) ?? undefined}
                      fill={colorScale(stacked.key)}
                      opacity={0.85}
                    />
                  ))
                }
              </AreaStack>
              <rect
                x={padding.left}
                y={padding.top}
                width={resolvedWidth - padding.left - padding.right}
                height={resolvedHeight - padding.top - padding.bottom}
                fill="transparent"
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const percent = (event.clientX - rect.left) / rect.width;
                  const index = Math.min(
                    data.length - 1,
                    Math.max(0, Math.round(percent * (data.length - 1)))
                  );
                  const values = keys.map((key) => Number(data[index]?.[key] ?? 0));
                  handleMove(event, data[index]?.x as string, values);
                }}
                onMouseLeave={clearTooltip}
              />
            </svg>
          );
        }}
      </ParentSize>
      <ChartTooltip
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
        title={tooltip.title}
        body={tooltip.body}
        lines={tooltip.lines}
      />
    </div>
  );
}
