"use client";

import { LegendQuantile } from "@visx/legend";
import { ParentSize } from "@visx/responsive";
import { Zoom } from "@visx/zoom";
import { useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { scaleQuantile } from "d3";
import { geoNaturalEarth1, geoMercator, geoOrthographic, geoPath, type GeoProjection } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";
import { useMemo, useState } from "react";

type MapPoint = {
  name: string;
  coordinates: [number, number];
  value: number;
};

type VisxWorldMapProps = {
  points: MapPoint[];
  width?: number;
  height?: number;
  accent?: string;
  valueFormatter?: (value: number) => string;
};

const projectionOptions = [
  { id: "natural", label: "Natural Earth", factory: geoNaturalEarth1 },
  { id: "mercator", label: "Mercator", factory: geoMercator },
  { id: "orthographic", label: "Orthographic", factory: geoOrthographic }
];

const palette = [
  "rgba(34, 211, 238, 0.16)",
  "rgba(34, 211, 238, 0.24)",
  "rgba(59, 130, 246, 0.32)",
  "rgba(139, 92, 246, 0.42)",
  "rgba(236, 72, 153, 0.5)"
];

type WorldTopology = typeof worldData;

export default function VisxWorldMap({
  points,
  width = 520,
  height = 260,
  accent = "var(--color-primary)",
  valueFormatter = (value) => value.toString()
}: VisxWorldMapProps) {
  const [projectionId, setProjectionId] = useState("natural");
  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = useTooltip<{
    title: string;
    body: string;
  }>();

  const geo = useMemo((): GeoJSON.Feature[] => {
    const topology = worldData as unknown as WorldTopology;
    const objects = topology.objects as Record<string, unknown>;
    const object = objects.countries ?? Object.values(objects)[0];
    const result = feature(topology as unknown as any, object as any) as GeoJSON.FeatureCollection | GeoJSON.Feature;
    if ("features" in result) {
      return result.features;
    }
    return [result];
  }, []);

  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const colorScale = useMemo(
    () =>
      scaleQuantile<string>()
        .domain(points.map((p) => p.value))
        .range(palette),
    [points]
  );

  return (
    <div className="relative h-full w-full">
      <ParentSize>
        {({ width: containerWidth, height: containerHeight }) => {
          const resolvedWidth = Math.max(containerWidth || width, 320);
          const resolvedHeight = Math.max(containerHeight || height, 200);
          const option = projectionOptions.find((item) => item.id === projectionId) ?? projectionOptions[0];
          const projection: GeoProjection = option.factory();
          if (option.id === "orthographic") {
            projection.clipAngle(90).rotate([0, -10]);
          }
          projection.fitSize([resolvedWidth, resolvedHeight], { type: "Sphere" });
          const path = geoPath(projection);

          return (
            <>
              <div className="absolute right-4 top-4 z-10 flex items-center gap-3 text-xs">
                <select
                  className="control-input"
                  value={projectionId}
                  onChange={(event) => setProjectionId(event.target.value)}
                >
                  {projectionOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <Zoom
                width={resolvedWidth}
                height={resolvedHeight}
                scaleXMin={1}
                scaleXMax={6}
                scaleYMin={1}
                scaleYMax={6}
              >
                {(zoom) => (
                  <div className="relative">
                    <svg width={resolvedWidth} height={resolvedHeight}>
                      <rect
                        width={resolvedWidth}
                        height={resolvedHeight}
                        fill="transparent"
                        onMouseDown={zoom.dragStart}
                        onMouseMove={zoom.dragMove}
                        onMouseUp={zoom.dragEnd}
                        onMouseLeave={zoom.dragEnd}
                        onTouchStart={zoom.dragStart}
                        onTouchMove={zoom.dragMove}
                        onTouchEnd={zoom.dragEnd}
                        onWheel={zoom.handleWheel}
                      />
                      <g transform={zoom.toString()}>
                        <path
                          d={path({ type: "Sphere" }) ?? undefined}
                          fill="transparent"
                          stroke="currentColor"
                          className="text-border"
                        />
                        {geo.map((featureItem, index) => {
                          const regionValue = (index / Math.max(geo.length - 1, 1)) * maxValue;
                          const regionLabel = (featureItem.properties as any)?.name ?? `Region ${index + 1}`;
                          return (
                            <path
                              key={index}
                              d={path(featureItem) ?? undefined}
                              fill={colorScale(regionValue)}
                              stroke="rgba(255,255,255,0.1)"
                              strokeWidth={0.5}
                              onMouseMove={(event) =>
                                showTooltip({
                                  tooltipLeft: event.clientX,
                                  tooltipTop: event.clientY,
                                  tooltipData: { title: regionLabel, body: "Hover points for exact values." }
                                })
                              }
                              onMouseLeave={hideTooltip}
                            />
                          );
                        })}
                        {points.map((point) => {
                          const [x, y] = projection(point.coordinates) ?? [0, 0];
                          const radius = 4 + (point.value / maxValue) * 6;
                          return (
                            <circle
                              key={point.name}
                              cx={x}
                              cy={y}
                              r={radius}
                              fill={accent}
                              fillOpacity={0.8}
                              stroke="rgba(255,255,255,0.4)"
                              onMouseMove={(event) =>
                                showTooltip({
                                  tooltipLeft: event.clientX,
                                  tooltipTop: event.clientY,
                                  tooltipData: { title: point.name, body: `Value: ${valueFormatter(point.value)}` }
                                })
                              }
                              onMouseLeave={hideTooltip}
                            />
                          );
                        })}
                      </g>
                    </svg>
                    <div className="absolute left-4 top-4 flex gap-2">
                      <button className="btn" onClick={() => zoom.scale({ scaleX: 1.25, scaleY: 1.25 })}>
                        +
                      </button>
                      <button className="btn" onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}>
                        −
                      </button>
                      <button className="btn" onClick={zoom.reset}>
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </Zoom>

              <div className="absolute bottom-4 left-4 rounded-md border border-border bg-surface-1 px-3 py-2 text-[10px] text-soft">
                <LegendQuantile scale={colorScale} labelFormat={(label) => `${label}`} />
              </div>

              {tooltipData && (
                <TooltipWithBounds top={tooltipTop} left={tooltipLeft} className="tooltip">
                  <div className="text-xs">
                    <p className="font-semibold">{tooltipData.title}</p>
                    <p className="text-soft">{tooltipData.body}</p>
                  </div>
                </TooltipWithBounds>
              )}
            </>
          );
        }}
      </ParentSize>
    </div>
  );
}
