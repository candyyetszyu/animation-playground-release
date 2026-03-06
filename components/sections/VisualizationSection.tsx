"use client";

import dynamic from "next/dynamic";
import SectionHeader from "@/components/SectionHeader";
import Toggle from "@/components/Toggle";

const ChordDiagram = dynamic(() => import("@/components/visualization/ChordDiagram"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxWorldMap = dynamic(() => import("@/components/visualization/VisxWorldMap"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxTreemap = dynamic(() => import("@/components/visualization/VisxTreemap"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxBoxPlot = dynamic(() => import("@/components/visualization/VisxBoxPlot"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxViolinPlot = dynamic(() => import("@/components/visualization/VisxViolinPlot"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxHistogram = dynamic(() => import("@/components/visualization/VisxHistogram"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxCandlestick = dynamic(() => import("@/components/visualization/VisxCandlestick"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxWaterfall = dynamic(() => import("@/components/visualization/VisxWaterfall"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxRadar = dynamic(() => import("@/components/visualization/VisxRadar"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxScatterPlot = dynamic(() => import("@/components/visualization/VisxScatterPlot"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxHeatmap = dynamic(() => import("@/components/visualization/VisxHeatmap"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxDonut = dynamic(() => import("@/components/visualization/VisxDonut"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxStreamGraph = dynamic(() => import("@/components/visualization/VisxStreamGraph"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxBumpChart = dynamic(() => import("@/components/visualization/VisxBumpChart"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxRadialBar = dynamic(() => import("@/components/visualization/VisxRadialBar"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxNetworkGraph = dynamic(() => import("@/components/visualization/VisxNetworkGraph"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const VisxParallelCoordinates = dynamic(() => import("@/components/visualization/VisxParallelCoordinates"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});
const SankeyDiagram = dynamic(() => import("@/components/visualization/SankeyDiagram"), {
  loading: () => <div className="card p-8 text-center text-soft">Loading chart...</div>
});

import { useEffect, useMemo, useState, type MouseEvent } from "react";

type DatasetKey = "revenue" | "usage" | "latency" | "conversion" | "retention";
type SourceKey = "product" | "marketing" | "infrastructure" | "finance";
type ScenarioKey = "steady" | "seasonal" | "volatile";

type ParallelDatum = {
  id: string;
  growth: number;
  retention: number;
  efficiency: number;
  cost: number;
  satisfaction: number;
};

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const dataSources: Record<
  SourceKey,
  {
    label: string;
    datasets: Record<DatasetKey, { label: string; unit: string; base: number[]; accent: string }>;
  }
> = {
  product: {
    label: "Product Analytics",
    datasets: {
      revenue: {
        label: "MRR",
        unit: "$k",
        base: [28, 34, 42, 38, 50, 62, 58, 70, 64, 76, 72, 86],
        accent: "var(--color-primary)"
      },
      usage: {
        label: "Active Users",
        unit: "k",
        base: [12, 18, 25, 22, 30, 36, 32, 42, 40, 48, 46, 55],
        accent: "var(--color-secondary)"
      },
      retention: {
        label: "Retention",
        unit: "%",
        base: [62, 64, 63, 66, 65, 68, 67, 70, 72, 71, 73, 74],
        accent: "var(--color-success)"
      },
      conversion: {
        label: "Activation",
        unit: "%",
        base: [18, 20, 19, 21, 22, 24, 23, 26, 25, 27, 28, 30],
        accent: "var(--color-warn)"
      },
      latency: {
        label: "Feature Latency",
        unit: "ms",
        base: [220, 210, 200, 190, 180, 170, 175, 168, 162, 158, 150, 145],
        accent: "var(--color-danger)"
      }
    }
  },
  marketing: {
    label: "Marketing",
    datasets: {
      revenue: {
        label: "Pipeline",
        unit: "$k",
        base: [18, 22, 26, 24, 30, 34, 36, 40, 42, 46, 50, 58],
        accent: "var(--color-primary)"
      },
      usage: {
        label: "Trials",
        unit: "k",
        base: [6, 8, 10, 9, 12, 14, 13, 15, 17, 18, 20, 22],
        accent: "var(--color-secondary)"
      },
      retention: {
        label: "Email CTR",
        unit: "%",
        base: [2, 2.4, 2.1, 2.6, 2.7, 2.9, 3.1, 3.0, 3.2, 3.4, 3.6, 3.7],
        accent: "var(--color-success)"
      },
      conversion: {
        label: "Landing CVR",
        unit: "%",
        base: [3.2, 3.4, 3.6, 3.5, 3.9, 4.1, 4.0, 4.3, 4.5, 4.6, 4.8, 5.0],
        accent: "var(--color-warn)"
      },
      latency: {
        label: "CAC",
        unit: "$",
        base: [120, 116, 112, 110, 108, 105, 102, 98, 96, 92, 90, 88],
        accent: "var(--color-danger)"
      }
    }
  },
  infrastructure: {
    label: "Infrastructure",
    datasets: {
      revenue: {
        label: "Throughput",
        unit: "k",
        base: [240, 260, 280, 270, 300, 320, 340, 360, 355, 380, 400, 420],
        accent: "var(--color-primary)"
      },
      usage: {
        label: "Requests",
        unit: "k",
        base: [120, 140, 155, 150, 170, 190, 200, 220, 210, 230, 240, 260],
        accent: "var(--color-secondary)"
      },
      retention: {
        label: "Uptime",
        unit: "%",
        base: [99.2, 99.4, 99.5, 99.6, 99.7, 99.8, 99.8, 99.9, 99.9, 99.95, 99.96, 99.97],
        accent: "var(--color-success)"
      },
      conversion: {
        label: "Error Rate",
        unit: "%",
        base: [1.6, 1.4, 1.5, 1.3, 1.2, 1.1, 1.0, 1.1, 0.9, 0.8, 0.7, 0.6],
        accent: "var(--color-warn)"
      },
      latency: {
        label: "P95 Latency",
        unit: "ms",
        base: [320, 300, 280, 260, 250, 230, 220, 210, 205, 195, 190, 180],
        accent: "var(--color-danger)"
      }
    }
  },
  finance: {
    label: "Finance",
    datasets: {
      revenue: {
        label: "ARR",
        unit: "$k",
        base: [120, 132, 146, 158, 170, 188, 200, 220, 236, 250, 270, 300],
        accent: "var(--color-primary)"
      },
      usage: {
        label: "Cash Runway",
        unit: "mo",
        base: [14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8],
        accent: "var(--color-secondary)"
      },
      retention: {
        label: "Gross Margin",
        unit: "%",
        base: [68, 69, 70, 71, 72, 72, 73, 74, 74, 75, 75, 76],
        accent: "var(--color-success)"
      },
      conversion: {
        label: "Burn Rate",
        unit: "$k",
        base: [180, 176, 172, 170, 168, 165, 162, 160, 158, 154, 150, 145],
        accent: "var(--color-warn)"
      },
      latency: {
        label: "Net Retention",
        unit: "%",
        base: [102, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114],
        accent: "var(--color-danger)"
      }
    }
  }
};

function mulberry32(seed: number) {
  let value = seed;
  return () => {
    value |= 0;
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function VisualizationSection() {
  const [sourceKey, setSourceKey] = useState<SourceKey>("product");
  const [datasetKey, setDatasetKey] = useState<DatasetKey>("revenue");
  const [scenario, setScenario] = useState<ScenarioKey>("steady");
  const [points, setPoints] = useState(12);
  const [noise, setNoise] = useState(10);
  const [animate, setAnimate] = useState(true);
  const [seed, setSeed] = useState(1);
  const [sortBars, setSortBars] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [barHover, setBarHover] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dataset = dataSources[sourceKey].datasets[datasetKey];

  useEffect(() => {
    if (!animate) return;
    const interval = setInterval(() => setSeed((value) => value + 1), 2200);
    return () => clearInterval(interval);
  }, [animate]);

  const series = useMemo(() => {
    const rng = mulberry32(seed + points * 17 + noise * 13);
    return Array.from({ length: points }, (_, index) => {
      const base = dataset.base[index % dataset.base.length];
      const jitter = (rng() - 0.5) * noise;
      const seasonal = scenario === "seasonal" ? 1 + 0.18 * Math.sin((2 * Math.PI * index) / points) : 1;
      const trend = scenario === "steady" ? 1 + index * 0.02 : 1;
      const volatility = scenario === "volatile" ? 1 + (rng() - 0.5) * 0.4 : 1;
      const value = base * seasonal * trend * volatility + jitter;
      return Math.max(0, Math.round(value));
    });
  }, [dataset.base, noise, points, seed, scenario]);

  const stats = useMemo(() => {
    const max = Math.max(...series);
    const min = Math.min(...series);
    const avg = Math.round(series.reduce((sum, value) => sum + value, 0) / series.length);
    return { max, min, avg };
  }, [series]);

  const barSeries = useMemo(() => {
    if (!sortBars) return series;
    return [...series].sort((a, b) => b - a);
  }, [series, sortBars]);

  const labels = useMemo(() => {
    if (points <= 12) return monthLabels.slice(0, points);
    return Array.from({ length: points }, (_, index) => `W${index + 1}`);
  }, [points]);

  const formatValue = (value: number) => {
    if (dataset.unit === "$k") return `$${value}k`;
    if (dataset.unit === "$") return `$${value}`;
    if (dataset.unit === "%") return `${value}%`;
    return `${value}${dataset.unit ? ` ${dataset.unit}` : ""}`;
  };

  const trendDelta = series[series.length - 1] - series[0];
  const trendPct = series[0] ? Math.round((trendDelta / series[0]) * 100) : 0;
  const volatilityScore = stats.max ? Math.round(((stats.max - stats.min) / stats.max) * 100) : 0;

  const chordLabels = ["Awareness", "Activation", "Engagement", "Retention", "Expansion"];
  const chordMatrix = useMemo(() => {
    const base = [
      [0, 12, 6, 4, 3],
      [8, 0, 9, 5, 4],
      [5, 7, 0, 10, 6],
      [4, 5, 8, 0, 9],
      [3, 4, 6, 8, 0]
    ];
    const scale = Math.max(stats.avg / 20, 1);
    return base.map((row) => row.map((value) => Math.max(2, Math.round(value * scale))));
  }, [stats.avg]);

  const sankeyNodes = useMemo(
    () => [
      { name: "Awareness" },
      { name: "Signup" },
      { name: "Activation" },
      { name: "Paid" },
      { name: "Expansion" }
    ],
    []
  );

  const sankeyLinks = useMemo(() => {
    const flowValues = series.slice(0, 6).map((value) => Math.max(4, Math.round(value / (stats.max / 14 || 1))));
    const flow = (index: number, fallback: number) => flowValues[index] ?? fallback;
    return [
      { source: 0, target: 1, value: flow(0, 12) },
      { source: 1, target: 2, value: flow(1, 9) },
      { source: 2, target: 3, value: flow(2, 7) },
      { source: 3, target: 4, value: flow(3, 5) },
      { source: 1, target: 3, value: flow(4, 4) },
      { source: 2, target: 4, value: flow(5, 3) }
    ];
  }, [series, stats.max]);

  const mapPoints = useMemo(
    () => [
      { name: "San Francisco", coordinates: [-122.4194, 37.7749] as [number, number], value: series[0] ?? 0 },
      { name: "New York", coordinates: [-74.006, 40.7128] as [number, number], value: series[1] ?? 0 },
      { name: "London", coordinates: [-0.1276, 51.5072] as [number, number], value: series[2] ?? 0 },
      { name: "Berlin", coordinates: [13.405, 52.52] as [number, number], value: series[3] ?? 0 },
      { name: "Dubai", coordinates: [55.27, 25.2] as [number, number], value: series[4] ?? 0 },
      { name: "Singapore", coordinates: [103.8198, 1.3521] as [number, number], value: series[5] ?? 0 },
      { name: "Tokyo", coordinates: [139.6917, 35.6895] as [number, number], value: series[6] ?? 0 },
      { name: "Sydney", coordinates: [151.2093, -33.8688] as [number, number], value: series[7] ?? 0 }
    ],
    [series]
  );

  const treemapData = useMemo(
    () =>
      labels.map((label, index) => ({
        name: label,
        value: series[index] ?? 0
      })),
    [labels, series]
  );

  const candlestickData = useMemo(() => {
    const limit = Math.min(series.length - 1, 8);
    return Array.from({ length: Math.max(limit, 1) }, (_, index) => {
      const open = series[index] ?? 0;
      const close = series[index + 1] ?? open;
      const spread = Math.max(Math.abs(close - open), Math.round(stats.max * 0.06));
      const high = Math.max(open, close) + spread * 0.5;
      const low = Math.min(open, close) - spread * 0.5;
      return {
        label: labels[index] ?? `P${index + 1}`,
        open: Math.round(open),
        close: Math.round(close),
        high: Math.round(high),
        low: Math.round(low)
      };
    });
  }, [series, labels, stats.max]);

  const waterfallData = useMemo(() => {
    const limit = Math.min(series.length, 8);
    return Array.from({ length: Math.max(limit, 1) }, (_, index) => {
      const value = index === 0 ? series[index] ?? 0 : (series[index] ?? 0) - (series[index - 1] ?? 0);
      return {
        label: labels[index] ?? `S${index + 1}`,
        value: Math.round(value)
      };
    });
  }, [series, labels]);

  const radarData = useMemo(() => {
    const categories = ["Growth", "Retention", "Activation", "Satisfaction", "Efficiency"];
    return categories.map((label, index) => {
      const seriesIndex = Math.min(series.length - 1, index * 2);
      const value = stats.max ? Math.round((series[seriesIndex] / stats.max) * 100) : 0;
      return { label, value: clamp(value, 5, 100) };
    });
  }, [series, stats.max]);

  const linePoints = useMemo(() => {
    const padding = 10;
    const width = 240;
    const height = 80;
    const range = Math.max(stats.max - stats.min, 1);
    return series.map((value, index) => {
      const x = padding + (index / (series.length - 1 || 1)) * (width - padding * 2);
      const y = height - padding - ((value - stats.min) / range) * (height - padding * 2);
      return { x, y, value };
    });
  }, [series, stats.max, stats.min]);

  const areaPoints = useMemo(() => {
    const pointsString = linePoints.map((point) => `${point.x},${point.y}`).join(" ");
    return `${pointsString} 240,80 0,80`;
  }, [linePoints]);

  const scatterData = useMemo(() => {
    const rng = mulberry32(seed + 77);
    return series.map((value, index) => {
      const jitterX = (rng() - 0.5) * 0.6;
      const jitterY = (rng() - 0.5) * noise;
      return {
        id: labels[index] ?? `P${index + 1}`,
        label: labels[index] ?? `P${index + 1}`,
        x: index + 1 + jitterX,
        y: value + jitterY
      };
    });
  }, [labels, noise, seed, series]);

  const heatmapData = useMemo(() => {
    const rng = mulberry32(seed + 111);
    const columns = 6;
    const rows = 4;
    return Array.from({ length: rows * columns }, (_, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      return {
        x: `W${col + 1}`,
        y: `Seg ${row + 1}`,
        value: Math.round((rng() + series[index % series.length] / (stats.max || 1)) * 100) / 100
      };
    });
  }, [seed, series, stats.max]);

  const donutData = useMemo(() => {
    const buckets = [
      { label: "Core", weight: 0.32 },
      { label: "Expansion", weight: 0.22 },
      { label: "Services", weight: 0.18 },
      { label: "Partners", weight: 0.16 },
      { label: "Churn", weight: 0.12 }
    ];
    const base = Math.max(stats.avg, 1);
    return buckets.map((bucket, index) => ({
      label: bucket.label,
      value: Math.max(1, Math.round(base * bucket.weight))
    }));
  }, [stats.avg]);

  const streamKeys = useMemo(() => ["Core", "Expansion", "Ops", "Services"], []);
  const streamData = useMemo(() => {
    const rng = mulberry32(seed + 541);
    return labels.map((label, index) => {
      const base = series[index] ?? 0;
      const slices = streamKeys.map(() => 0.3 + rng() * 0.6);
      const sum = slices.reduce((total, value) => total + value, 0);
      return {
        x: label,
        [streamKeys[0]]: (base * slices[0]) / sum + rng() * noise * 0.2,
        [streamKeys[1]]: (base * slices[1]) / sum + rng() * noise * 0.2,
        [streamKeys[2]]: (base * slices[2]) / sum + rng() * noise * 0.2,
        [streamKeys[3]]: (base * slices[3]) / sum + rng() * noise * 0.2
      };
    });
  }, [labels, noise, seed, series, streamKeys]);

  const bumpLabels = useMemo(() => labels.slice(0, Math.min(labels.length, 8)), [labels]);
  const bumpSeries = useMemo(() => {
    const rng = mulberry32(seed + 333);
    const categories = ["Core", "Growth", "Scale", "Ops"];
    const rawValues = categories.map(() =>
      bumpLabels.map((_, index) => (series[index] ?? 0) * (0.6 + rng() * 0.8) + rng() * noise)
    );
    const ranks = categories.map(() => Array(bumpLabels.length).fill(0));
    for (let index = 0; index < bumpLabels.length; index += 1) {
      const sorted = rawValues
        .map((values, catIndex) => ({ catIndex, value: values[index] }))
        .sort((a, b) => b.value - a.value);
      sorted.forEach((item, rank) => {
        ranks[item.catIndex][index] = rank + 1;
      });
    }
    return categories.map((label, index) => ({
      label,
      values: ranks[index]
    }));
  }, [bumpLabels, noise, seed, series]);

  const radialData = useMemo(() => {
    const labels = ["Growth", "Retention", "Activation", "Efficiency", "Reliability", "Momentum"];
    const base = Math.max(stats.max, 1);
    return labels.map((label, index) => ({
      label,
      value: Math.round(((series[index] ?? stats.avg) / base) * 100)
    }));
  }, [series, stats.avg, stats.max]);

  const networkNodes = useMemo(
    () => [
      { id: "awareness", label: "Awareness", value: series[0] ?? stats.avg },
      { id: "activation", label: "Activation", value: series[2] ?? stats.avg },
      { id: "retention", label: "Retention", value: series[4] ?? stats.avg },
      { id: "expansion", label: "Expansion", value: series[6] ?? stats.avg },
      { id: "advocacy", label: "Advocacy", value: series[8] ?? stats.avg },
      { id: "churn", label: "Churn", value: series[10] ?? stats.avg }
    ],
    [series, stats.avg]
  );

  const networkLinks = useMemo(
    () => [
      { source: "awareness", target: "activation", value: 12 },
      { source: "activation", target: "retention", value: 9 },
      { source: "retention", target: "expansion", value: 8 },
      { source: "expansion", target: "advocacy", value: 7 },
      { source: "awareness", target: "churn", value: 4 },
      { source: "activation", target: "churn", value: 5 },
      { source: "retention", target: "churn", value: 6 }
    ],
    []
  );

  const parallelData = useMemo<ParallelDatum[]>(() => {
    const indices = [0, Math.floor(points / 3), Math.floor((points * 2) / 3), points - 1];
    return indices.map((index) => {
      const value = series[index] ?? stats.avg;
      const ratio = stats.max ? value / stats.max : 0;
      return {
        id: labels[index] ?? `P${index + 1}`,
        growth: clamp(ratio * 100, 5, 100),
        retention: clamp(100 - volatilityScore + (index % 3) * 6, 30, 100),
        efficiency: clamp(100 - ratio * 40, 20, 100),
        cost: clamp(100 - ratio * 60, 10, 100),
        satisfaction: clamp(60 + ratio * 40, 30, 100)
      };
    });
  }, [labels, points, series, stats.avg, stats.max, volatilityScore]);

  const parallelDimensions = useMemo(() => {
    const dimensionMeta: Array<{ key: keyof Omit<ParallelDatum, "id">; label: string }> = [
      { key: "growth", label: "Growth" },
      { key: "retention", label: "Retention" },
      { key: "efficiency", label: "Efficiency" },
      { key: "cost", label: "Cost" },
      { key: "satisfaction", label: "Satisfaction" }
    ];
    return dimensionMeta.map((dim) => {
      const values = parallelData.map((item) => Number(item[dim.key]));
      return {
        key: dim.key,
        label: dim.label,
        min: Math.min(...values),
        max: Math.max(...values)
      };
    });
  }, [parallelData]);

  const handleLineMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const percent = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const index = Math.round(percent * (series.length - 1));
    setHoverIndex(index);
  };

  useEffect(() => {
    if (hoverIndex !== null) {
      setSelectedIndex(hoverIndex);
    }
  }, [hoverIndex]);

  useEffect(() => {
    setSelectedIndex((prev) => Math.min(prev, points - 1));
  }, [points]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [datasetKey, sourceKey]);

  return (
    <section id="visualization" className="space-y-6">
      <SectionHeader title="Visualization" subtitle="Data-first, interactive analysis" />
      <div className="text-xs text-soft">Mock data set with adjustable scenarios for exploration.</div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Data controls</h3>
              <p className="text-sm text-soft">
                Switch datasets, adjust noise, and regenerate to explore patterns.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="btn" onClick={() => setSeed((value) => value + 1)}>
                Regenerate
              </button>
              <Toggle label={animate ? "Auto" : "Manual"} checked={animate} onChange={setAnimate} />
              <button className="btn" onClick={() => setSortBars((value) => !value)}>
                {sortBars ? "Unsort bars" : "Sort bars"}
              </button>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-6">
            <label className="flex flex-col gap-2 text-sm">
              Data source
              <select
                className="control-input"
                value={sourceKey}
                onChange={(event) => {
                  const next = event.target.value as SourceKey;
                  setSourceKey(next);
                  setDatasetKey("revenue");
                }}
              >
                {Object.entries(dataSources).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Metric
              <select
                className="control-input"
                value={datasetKey}
                onChange={(event) => setDatasetKey(event.target.value as DatasetKey)}
              >
                {Object.entries(dataSources[sourceKey].datasets).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Scenario
              <select
                className="control-input"
                value={scenario}
                onChange={(event) => setScenario(event.target.value as ScenarioKey)}
              >
                <option value="steady">Steady growth</option>
                <option value="seasonal">Seasonal</option>
                <option value="volatile">Volatile</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Points ({points})
              <input
                type="range"
                min={6}
                max={24}
                value={points}
                onChange={(event) => setPoints(Number(event.target.value))}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              Noise ({noise})
              <input
                type="range"
                min={0}
                max={30}
                value={noise}
                onChange={(event) => setNoise(Number(event.target.value))}
              />
            </label>
            <div className="flex flex-col gap-2 text-sm lg:col-span-2">
              KPIs
              <div className="flex gap-3">
                <div className="rounded-md border border-border bg-surface-2 px-3 py-2 text-xs">
                  Max: {formatValue(stats.max)}
                </div>
                <div className="rounded-md border border-border bg-surface-2 px-3 py-2 text-xs">
                  Avg: {formatValue(stats.avg)}
                </div>
                <div className="rounded-md border border-border bg-surface-2 px-3 py-2 text-xs">
                  Min: {formatValue(stats.min)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Interactive line</h3>
            <span className="text-xs text-soft">
              {dataset.label} ({dataset.unit})
            </span>
          </div>
          <div
            className="relative h-32 rounded-md bg-surface-2 chart-grid"
            onMouseMove={handleLineMove}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <svg viewBox="0 0 240 80" className="h-full w-full">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                points={linePoints.map((point) => `${point.x},${point.y}`).join(" ")}
                style={{ color: dataset.accent }}
              />
              {linePoints.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={hoverIndex === index ? 4 : 2}
                  fill={hoverIndex === index ? dataset.accent : "rgba(255,255,255,0.5)"}
                />
              ))}
              <polygon points={areaPoints} style={{ fill: dataset.accent, opacity: 0.12 }} />
            </svg>
            {hoverIndex !== null && (
              <div
                className="absolute rounded-md border border-border bg-surface-1 px-3 py-2 text-xs shadow-lg"
                style={{
                  left: `${(hoverIndex / (series.length - 1)) * 100}%`,
                  top: "10%",
                  transform: "translateX(-50%)"
                }}
              >
                {formatValue(series[hoverIndex])}
              </div>
            )}
          </div>
          {points <= 12 && (
            <div className="mt-2 grid grid-cols-12 text-[10px] text-soft">
              {labels.map((label) => (
                <span key={label} className="text-center">
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Bar comparison</h3>
            <span className="text-xs text-soft">Hover for value</span>
          </div>
          <div className="flex h-32 items-end gap-2">
            {barSeries.map((value, index) => (
              <div
                key={index}
                className="relative flex-1 rounded-md"
                style={{
                  height: `${(value / stats.max) * 100}%`,
                  background: dataset.accent,
                  opacity: 0.4
                }}
                onMouseEnter={() => setBarHover(index)}
                onMouseLeave={() => setBarHover(null)}
                onClick={() => {
                  if (!sortBars) setSelectedIndex(index);
                }}
              >
                {barHover === index && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-soft">
                    {formatValue(value)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card card-hover card-holo card-refract space-y-4 p-6 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Mock data table</h3>
            <span className="text-xs text-soft">
              {dataSources[sourceKey].label} · {dataset.label}
            </span>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="max-h-40 overflow-auto rounded-md border border-border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-2 text-soft">
                    <tr>
                      <th className="px-3 py-2">Label</th>
                      <th className="px-3 py-2">Value</th>
                      <th className="px-3 py-2">Index</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labels.map((label, index) => (
                      <tr
                        key={label}
                        className={`border-t border-border ${
                          index === selectedIndex ? "bg-surface-2" : ""
                        }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <td className="px-3 py-2">{label}</td>
                        <td className="px-3 py-2">{formatValue(series[index])}</td>
                        <td className="px-3 py-2 text-soft">#{index + 1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-3 text-xs">
              <div className="rounded-md border border-border bg-surface-2 px-3 py-3">
                <p className="text-soft">Selected</p>
                <p className="text-lg font-semibold">{formatValue(series[selectedIndex])}</p>
                <p className="text-soft">Label: {labels[selectedIndex]}</p>
              </div>
              <div className="rounded-md border border-border bg-surface-2 px-3 py-3">
                <p className="text-soft">Trend</p>
                <p className="text-lg font-semibold">
                  {trendDelta >= 0 ? "+" : ""}
                  {formatValue(trendDelta)} ({trendPct}%)
                </p>
                <p className="text-soft">Volatility: {volatilityScore}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-hover card-streak card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Scatter</h3>
          <div className="relative h-40 rounded-md bg-surface-2">
            <VisxScatterPlot
              data={scatterData}
              xLabel="Index"
              yLabel={dataset.label}
              accent={dataset.accent}
            />
          </div>
        </div>

        <div className="card card-hover card-volumetric card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Heatmap</h3>
          <div className="relative h-40 rounded-md bg-surface-2">
            <VisxHeatmap data={heatmapData} />
          </div>
        </div>

        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Donut</h3>
          <div className="relative h-40 rounded-md bg-surface-2">
            <VisxDonut data={donutData} />
          </div>
        </div>

        <div className="card card-hover card-holo card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Radar</h3>
          <div className="relative h-40 rounded-md bg-surface-2">
            <VisxRadar data={radarData} accent={dataset.accent} />
          </div>
        </div>

        <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Treemap</h3>
          <div className="relative h-36 rounded-md bg-surface-2">
            <VisxTreemap data={treemapData} />
          </div>
        </div>

        <div className="card card-hover card-volumetric card-refract space-y-4 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Streamgraph</h3>
            <span className="text-xs text-soft">Layered flow</span>
          </div>
          <div className="relative h-40 rounded-md bg-surface-2">
            <VisxStreamGraph data={streamData} keys={streamKeys} />
          </div>
        </div>

        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Radial bars</h3>
          <div className="relative h-40 rounded-md bg-surface-2">
            <VisxRadialBar data={radialData} />
          </div>
        </div>

        <div className="card card-hover card-prism-border card-refract space-y-4 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Sankey flow</h3>
            <span className="text-xs text-soft">Hover nodes & links</span>
          </div>
          <div className="relative h-40 rounded-md bg-surface-2">
            <SankeyDiagram nodes={sankeyNodes} links={sankeyLinks} valueFormatter={formatValue} />
          </div>
        </div>

        <div className="card card-hover card-holo card-refract space-y-4 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Chord relationships</h3>
            <span className="text-xs text-soft">Hover segments</span>
          </div>
          <div className="relative h-40">
            <ChordDiagram labels={chordLabels} matrix={chordMatrix} valueFormatter={formatValue} />
          </div>
        </div>

        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Bump chart</h3>
            <span className="text-xs text-soft">Rank movement</span>
          </div>
          <div className="relative h-36 rounded-md bg-surface-2">
            <VisxBumpChart series={bumpSeries} labels={bumpLabels} />
          </div>
        </div>

        <div className="card card-hover card-streak card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Box plot</h3>
          <div className="relative h-32 rounded-md bg-surface-2">
            <VisxBoxPlot values={series} accent={dataset.accent} />
          </div>
        </div>

        <div className="card card-hover card-volumetric card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Violin plot</h3>
          <div className="relative h-32 rounded-md bg-surface-2">
            <VisxViolinPlot values={series} accent={dataset.accent} />
          </div>
        </div>

        <div className="card card-hover card-streak card-refract space-y-4 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">World map</h3>
            <span className="text-xs text-soft">Zoom, pan, projection + tooltip</span>
          </div>
          <div className="relative h-64 rounded-md bg-surface-2">
            <VisxWorldMap points={mapPoints} accent={dataset.accent} valueFormatter={formatValue} />
          </div>
        </div>

        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Histogram</h3>
          <div className="relative h-32 rounded-md bg-surface-2">
            <VisxHistogram values={series} accent={dataset.accent} />
          </div>
        </div>

        <div className="card card-hover card-holo card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Candlestick</h3>
          <div className="relative h-40 rounded-md bg-surface-2">
            <VisxCandlestick data={candlestickData} />
          </div>
        </div>

        <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Waterfall</h3>
          <div className="relative h-32 rounded-md bg-surface-2">
            <VisxWaterfall data={waterfallData} />
          </div>
        </div>

        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6 lg:col-span-2">
          <h3 className="text-base font-semibold">Parallel coordinates</h3>
          <div className="relative h-32 rounded-md bg-surface-2">
            <VisxParallelCoordinates data={parallelData} dimensions={parallelDimensions} />
          </div>
        </div>

        <div className="card card-hover card-streak card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Network graph</h3>
          <div className="relative h-36 rounded-md bg-surface-2">
            <VisxNetworkGraph nodes={networkNodes} links={networkLinks} />
          </div>
        </div>
      </div>
    </section>
  );
}
