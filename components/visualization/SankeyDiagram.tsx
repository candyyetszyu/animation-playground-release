"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import {
  sankey as d3Sankey,
  sankeyLinkHorizontal,
  type SankeyNodeMinimal,
  type SankeyLinkMinimal
} from "d3-sankey";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type SankeyNode = {
  name: string;
};

type SankeyLink = {
  source: number;
  target: number;
  value: number;
};

type SankeyNodeDerived = SankeyNode & SankeyNodeMinimal<SankeyNode, SankeyLinkDerived>;
type SankeyLinkDerived = SankeyLink & SankeyLinkMinimal<SankeyNode, SankeyLink>;

type SankeyDiagramProps = {
  nodes: SankeyNode[];
  links: SankeyLink[];
  width?: number;
  height?: number;
  valueFormatter?: (value: number) => string;
};

export default function SankeyDiagram({
  nodes,
  links,
  width = 360,
  height = 180,
  valueFormatter = (value) => value.toString()
}: SankeyDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

  const sankeyGraph = useMemo(() => {
    const sankeyLayout = d3Sankey<SankeyNode, SankeyLink>()
      .nodeWidth(16)
      .nodePadding(14)
      .extent([
        [0, 0],
        [width, height]
      ]);

    return sankeyLayout({
      nodes: nodes.map((node) => ({ ...node })),
      links: links.map((link) => ({ ...link }))
    });
  }, [nodes, links, width, height]);

  const linkPath = sankeyLinkHorizontal();

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
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        <g>
          {sankeyGraph.links.map((link, index) => {
            const source = link.source as SankeyNodeDerived;
            const target = link.target as SankeyNodeDerived;
            const isActive =
              activeLink === null && activeNode === null
                ? true
                : activeLink === index ||
                  activeNode === source.index ||
                  activeNode === target.index;
            return (
              <path
                key={index}
                d={linkPath(link) ?? undefined}
                fill="none"
                stroke="currentColor"
                strokeWidth={Math.max(1, link.width ?? 1)}
                className="text-primary/40"
                opacity={isActive ? 0.7 : 0.15}
                onMouseMove={(event) => {
                  setActiveLink(index);
                  setActiveNode(null);
                  handleMove(
                    event,
                    `${source.name} → ${target.name}`,
                    `Flow: ${valueFormatter(Math.round(link.value))}`
                  );
                }}
                onMouseLeave={() => {
                  setActiveLink(null);
                  clearTooltip();
                }}
              />
            );
          })}
          {sankeyGraph.nodes.map((node, index) => {
            const isActive =
              activeNode === null && activeLink === null
                ? true
                : activeNode === index ||
                  sankeyGraph.links.some(
                    (link, linkIndex) =>
                      linkIndex === activeLink &&
                      ((link.source as SankeyNodeDerived).index === index ||
                        (link.target as SankeyNodeDerived).index === index)
                  );
            return (
              <g key={index}>
                <rect
                  x={node.x0 ?? 0}
                  y={node.y0 ?? 0}
                  width={(node.x1 ?? 0) - (node.x0 ?? 0)}
                  height={(node.y1 ?? 0) - (node.y0 ?? 0)}
                  rx={4}
                  fill="currentColor"
                  className="text-secondary/70"
                  opacity={isActive ? 0.9 : 0.3}
                  onMouseMove={(event) => {
                    setActiveNode(index);
                    setActiveLink(null);
                    handleMove(
                      event,
                      node.name,
                      `Total: ${valueFormatter(Math.round(node.value ?? 0))}`
                    );
                  }}
                  onMouseLeave={() => {
                    setActiveNode(null);
                    clearTooltip();
                  }}
                />
                <text
                  x={(node.x0 ?? 0) + 4}
                  y={(node.y0 ?? 0) - 6}
                  fontSize={10}
                  fill="currentColor"
                  className="text-soft"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} title={tooltip.title} body={tooltip.body} />
    </div>
  );
}
