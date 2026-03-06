"use client";

import ChartTooltip from "@/components/visualization/ChartTooltip";
import { arc as d3Arc, chord as d3Chord, descending, ribbon as d3Ribbon, scaleOrdinal } from "d3";
import type { Chord, ChordGroup, ChordSubgroup } from "d3-chord";
import { useMemo, useRef, useState, type MouseEvent } from "react";

type ChordDiagramProps = {
  labels: string[];
  matrix: number[][];
  width?: number;
  height?: number;
  valueFormatter?: (value: number) => string;
};

const colorPalette = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-success)",
  "var(--color-warn)",
  "var(--color-danger)"
];

export default function ChordDiagram({
  labels,
  matrix,
  width = 280,
  height = 240,
  valueFormatter = (value) => value.toString()
}: ChordDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeChord, setActiveChord] = useState<{ source: number; target: number } | null>(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    title: "",
    body: ""
  });

  const chords = useMemo(() => {
    const chordLayout = d3Chord().padAngle(0.06).sortSubgroups(descending);
    return chordLayout(matrix);
  }, [matrix]);

  const radius = Math.min(width, height) / 2 - 16;
  const arc = useMemo(
    () =>
      d3Arc<ChordGroup>().innerRadius(radius - 18).outerRadius(radius),
    [radius]
  );
  const ribbon = useMemo(
    () =>
      d3Ribbon<Chord, ChordSubgroup>()
        .source((d) => ({ ...d.source, radius: radius - 18 }))
        .target((d) => ({ ...d.target, radius: radius - 18 })),
    [radius]
  );
  const colorScale = useMemo(() => scaleOrdinal(labels, colorPalette), [labels]);

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

  const clearTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {chords.groups.map((group) => {
            const path = arc(group) ?? undefined;
            const fill = colorScale(labels[group.index]);
            const isActive =
              activeIndex === null && activeChord === null
                ? true
                : activeIndex === group.index ||
                  activeChord?.source === group.index ||
                  activeChord?.target === group.index;
            return (
              <path
                key={group.index}
                d={path}
                fill={fill}
                fillOpacity={isActive ? 0.7 : 0.2}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1}
                onMouseMove={(event) => {
                  setActiveIndex(group.index);
                  setActiveChord(null);
                  handleMove(
                    event,
                    labels[group.index],
                    `Total: ${valueFormatter(Math.round(group.value))}`
                  );
                }}
                onMouseLeave={() => {
                  setActiveIndex(null);
                  clearTooltip();
                }}
              />
            );
          })}
          {chords.map((chord) => {
            const path = ribbon(chord) ?? undefined;
            const isActive =
              activeChord === null && activeIndex === null
                ? true
                : activeChord?.source === chord.source.index && activeChord?.target === chord.target.index;
            return (
              <path
                key={`${chord.source.index}-${chord.target.index}`}
                d={path}
                fill={colorScale(labels[chord.source.index])}
                fillOpacity={isActive ? 0.45 : 0.12}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={0.5}
                onMouseMove={(event) => {
                  setActiveIndex(null);
                  setActiveChord({ source: chord.source.index, target: chord.target.index });
                  handleMove(
                    event,
                    `${labels[chord.source.index]} → ${labels[chord.target.index]}`,
                    `Flow: ${valueFormatter(Math.round(chord.source.value))}`
                  );
                }}
                onMouseLeave={() => {
                  setActiveChord(null);
                  clearTooltip();
                }}
              />
            );
          })}
        </g>
      </svg>
      <ChartTooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} title={tooltip.title} body={tooltip.body} />
    </div>
  );
}
