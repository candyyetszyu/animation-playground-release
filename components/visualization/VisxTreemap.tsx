"use client";

import { ParentSize } from "@visx/responsive";
import { Treemap } from "@visx/hierarchy";
import { hierarchy, scaleOrdinal, treemapSquarify } from "d3";
import { useMemo } from "react";

type TreemapDatum = {
  name: string;
  value: number;
};

type VisxTreemapProps = {
  data: TreemapDatum[];
  width?: number;
  height?: number;
};

const palette = [
  "rgba(34, 211, 238, 0.55)",
  "rgba(99, 102, 241, 0.55)",
  "rgba(236, 72, 153, 0.55)",
  "rgba(34, 197, 94, 0.55)",
  "rgba(251, 191, 36, 0.55)"
];

export default function VisxTreemap({ data, width = 320, height = 200 }: VisxTreemapProps) {
  const root = useMemo(
    () =>
      hierarchy<{ name: string; value?: number; children?: TreemapDatum[] }>({
        name: "root",
        children: data
      }).sum((node) => node.value ?? 0),
    [data]
  );

  const colorScale = useMemo(
    () => scaleOrdinal(data.map((item) => item.name), palette),
    [data]
  );

  return (
    <div className="relative h-full w-full">
      <ParentSize>
        {({ width: containerWidth, height: containerHeight }) => {
          const resolvedWidth = Math.max(containerWidth || width, 240);
          const resolvedHeight = Math.max(containerHeight || height, 160);

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              <Treemap root={root} size={[resolvedWidth, resolvedHeight]} tile={treemapSquarify} round>
                {(treemap) => (
                  <g>
                    {treemap.leaves().map((leaf) => {
                      const leafWidth = leaf.x1 - leaf.x0;
                      const leafHeight = leaf.y1 - leaf.y0;
                      return (
                        <g key={leaf.data.name}>
                          <rect
                            x={leaf.x0}
                            y={leaf.y0}
                            width={leafWidth}
                            height={leafHeight}
                            rx={8}
                            fill={colorScale(leaf.data.name) as string}
                            stroke="rgba(255,255,255,0.15)"
                            strokeWidth={0.5}
                          />
                          {leafWidth > 64 && leafHeight > 28 && (
                            <text
                              x={leaf.x0 + 8}
                              y={leaf.y0 + 18}
                              fill="white"
                              fontSize={10}
                              fontWeight={600}
                            >
                              {leaf.data.name}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                )}
              </Treemap>
            </svg>
          );
        }}
      </ParentSize>
    </div>
  );
}
