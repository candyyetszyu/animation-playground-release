"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { ParentSize } from "@visx/responsive";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type NetworkNode = {
  id: string;
  label: string;
  value: number;
};

type NetworkLink = {
  source: string;
  target: string;
  value: number;
};

type VisxNetworkGraphProps = {
  nodes: NetworkNode[];
  links: NetworkLink[];
  width?: number;
  height?: number;
};

export default function VisxNetworkGraph({ nodes, links, width = 260, height = 180 }: VisxNetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

  const layout = useMemo(() => {
    const radius = 0.38;
    return nodes.map((node, index) => {
      const angle = (index / nodes.length) * Math.PI * 2;
      return {
        ...node,
        x: 0.5 + Math.cos(angle) * radius,
        y: 0.5 + Math.sin(angle) * radius
      };
    });
  }, [nodes]);

  const nodeMap = useMemo(
    () => Object.fromEntries(layout.map((node) => [node.id, node])),
    [layout]
  );

  const handleMove = (event: MouseEvent, node: NetworkNode) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      x: event.clientX - rect.left + 12,
      y: event.clientY - rect.top + 12,
      title: node.label,
      body: `Score: ${node.value}`
    });
  };

  const clearTooltip = () => setTooltip((prev) => ({ ...prev, visible: false }));

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <ParentSize>
        {({ width: containerWidth, height: containerHeight }) => {
          const resolvedWidth = Math.max(containerWidth || width, 220);
          const resolvedHeight = Math.max(containerHeight || height, 160);

          return (
            <svg width={resolvedWidth} height={resolvedHeight}>
              {links.map((link, index) => {
                const source = nodeMap[link.source];
                const target = nodeMap[link.target];
                if (!source || !target) return null;
                const isActive =
                  activeId && (link.source === activeId || link.target === activeId);
                return (
                  <line
                    key={`${link.source}-${link.target}-${index}`}
                    x1={source.x * resolvedWidth}
                    y1={source.y * resolvedHeight}
                    x2={target.x * resolvedWidth}
                    y2={target.y * resolvedHeight}
                    stroke={isActive ? "rgba(56, 189, 248, 0.7)" : "rgba(255,255,255,0.12)"}
                    strokeWidth={Math.max(1, link.value / 10)}
                  />
                );
              })}
              {layout.map((node) => {
                const active = activeId === node.id;
                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x * resolvedWidth}
                      cy={node.y * resolvedHeight}
                      r={active ? 8 : 6}
                      fill={active ? "rgba(34, 211, 238, 0.9)" : "rgba(139, 92, 246, 0.7)"}
                      onMouseEnter={() => setActiveId(node.id)}
                      onMouseLeave={() => setActiveId(null)}
                      onMouseMove={(event) => handleMove(event, node)}
                      onMouseOut={clearTooltip}
                    />
                    <text
                      x={node.x * resolvedWidth}
                      y={node.y * resolvedHeight - 10}
                      textAnchor="middle"
                      fontSize="8"
                      fill="var(--color-soft)"
                    >
                      {node.label}
                    </text>
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
