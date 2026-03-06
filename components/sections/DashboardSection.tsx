"use client";

import SectionHeader from "@/components/SectionHeader";
import Toggle from "@/components/Toggle";
import { useMemo, useState, type CSSProperties } from "react";

type RangeOption = {
  id: "24h" | "7d" | "30d" | "90d";
  label: string;
  scale: number;
};

type SourceOption = {
  id: "product" | "marketing" | "platform" | "finance";
  label: string;
  scale: number;
  accent: string;
};

const ranges: RangeOption[] = [
  { id: "24h", label: "Last 24h", scale: 0.82 },
  { id: "7d", label: "Last 7d", scale: 1 },
  { id: "30d", label: "Last 30d", scale: 1.16 },
  { id: "90d", label: "Last 90d", scale: 1.28 }
];

const sources: SourceOption[] = [
  { id: "product", label: "Product", scale: 1, accent: "var(--color-primary)" },
  { id: "marketing", label: "Marketing", scale: 0.92, accent: "var(--color-secondary)" },
  { id: "platform", label: "Platform", scale: 1.08, accent: "var(--color-success)" },
  { id: "finance", label: "Finance", scale: 1.18, accent: "var(--color-warn)" }
];

const baseKpis = [
  { id: "mrr", label: "Monthly revenue", unit: "$k", value: 86, delta: 12, series: [62, 68, 72, 75, 80, 86, 90] },
  { id: "active", label: "Active users", unit: "k", value: 52, delta: 8, series: [32, 36, 41, 44, 48, 52, 56] },
  { id: "conversion", label: "Conversion", unit: "%", value: 4.6, delta: 0.7, series: [3.4, 3.6, 3.8, 4.1, 4.3, 4.6, 4.8] },
  { id: "retention", label: "Retention", unit: "%", value: 78, delta: 1.6, series: [72, 73, 74, 75, 76, 78, 79] }
];

const baseSegments = [
  { id: "enterprise", label: "Enterprise", value: 42, delta: 6 },
  { id: "mid", label: "Mid-market", value: 28, delta: 4 },
  { id: "smb", label: "SMB", value: 18, delta: 2 },
  { id: "self", label: "Self-serve", value: 12, delta: 1 }
];

const basePipeline = [
  { id: "aware", label: "Aware", value: 680 },
  { id: "trial", label: "Trial", value: 420 },
  { id: "activated", label: "Activated", value: 280 },
  { id: "paid", label: "Paid", value: 140 }
];

const baseAccounts = [
  { id: "atlas", name: "Atlas Analytics", region: "NA", arr: 260, growth: 18, health: 86 },
  { id: "radar", name: "Radar Stack", region: "EU", arr: 210, growth: 14, health: 78 },
  { id: "helios", name: "Helios Labs", region: "APAC", arr: 184, growth: 21, health: 82 },
  { id: "nova", name: "Nova Systems", region: "NA", arr: 162, growth: 9, health: 72 },
  { id: "meridian", name: "Meridian Cloud", region: "LATAM", arr: 138, growth: 12, health: 68 }
];

const baseGoals = [
  { id: "retention", label: "Retention lift", value: 0.72 },
  { id: "activation", label: "Activation", value: 0.64 },
  { id: "latency", label: "Latency SLA", value: 0.84 }
];

const baseCohorts = [
  { id: "week-1", label: "W1", values: [100, 78, 64, 52, 44] },
  { id: "week-2", label: "W2", values: [100, 80, 66, 56, 46] },
  { id: "week-3", label: "W3", values: [100, 76, 61, 50, 41] },
  { id: "week-4", label: "W4", values: [100, 82, 70, 60, 52] }
];

const baseMilestones = [
  { id: "m1", label: "AI routing v3", detail: "Model routing improves latency", time: "This week" },
  { id: "m2", label: "Growth loop", detail: "Referral flywheel launch", time: "Next week" },
  { id: "m3", label: "Enterprise SSO", detail: "Security upgrade for paid plans", time: "In 3 weeks" },
  { id: "m4", label: "Billing refresh", detail: "Usage-based packaging", time: "In 5 weeks" }
];

const baseBudget = [
  { id: "compute", label: "Compute", value: 46 },
  { id: "storage", label: "Storage", value: 24 },
  { id: "network", label: "Network", value: 18 },
  { id: "support", label: "Support", value: 12 }
];

const baseAnomalies = [
  { id: "a1", label: "Activation dip", value: 68, note: "APAC cohort" },
  { id: "a2", label: "Latency spike", value: 82, note: "EU edge cluster" },
  { id: "a3", label: "Expansion surge", value: 56, note: "Enterprise upsell" },
  { id: "a4", label: "Billing retries", value: 42, note: "New payment gateway" }
];

const baseForecast = [62, 66, 69, 73, 78, 82, 86, 89, 92];

const baseSla = [
  { id: "uptime", label: "API uptime", value: 0.997, target: 0.999 },
  { id: "latency", label: "Latency SLO", value: 0.982, target: 0.99 },
  { id: "errors", label: "Error budget", value: 0.965, target: 0.98 }
];

const baseIncidents = [
  { id: "i1", title: "Edge latency spike", detail: "EU-West routing", time: "15m ago", severity: "high" },
  { id: "i2", title: "Queue backlog", detail: "Billing webhooks", time: "42m ago", severity: "medium" },
  { id: "i3", title: "Node restart", detail: "Model gateway", time: "2h ago", severity: "low" }
];

const baseJourney = [
  { id: "acq", label: "Acquisition", value: 78 },
  { id: "activate", label: "Activation", value: 64 },
  { id: "retain", label: "Retention", value: 58 },
  { id: "expand", label: "Expansion", value: 46 }
];

const baseRegions = [
  { id: "na", label: "North America", value: 68 },
  { id: "eu", label: "Europe", value: 52 },
  { id: "apac", label: "APAC", value: 61 },
  { id: "latam", label: "LATAM", value: 37 }
];

const baseCohortFlow = [
  { id: "w1", label: "Week 1", stages: [42, 28, 18] },
  { id: "w2", label: "Week 2", stages: [48, 32, 22] },
  { id: "w3", label: "Week 3", stages: [38, 26, 16] },
  { id: "w4", label: "Week 4", stages: [52, 36, 24] }
];

const baseEscalations = [
  { id: "e1", label: "SLA breach risk", detail: "Latency approaching limit", owner: "SRE", severity: "high" },
  { id: "e2", label: "Incident follow-up", detail: "Postmortem pending", owner: "Platform", severity: "medium" },
  { id: "e3", label: "Billing retries", detail: "Webhook timeout spike", owner: "Payments", severity: "low" }
];

const baseAnomalyTimeline = [
  { id: "t1", label: "Activation dip", impact: 62, time: "08:10" },
  { id: "t2", label: "Latency spike", impact: 78, time: "09:00" },
  { id: "t3", label: "Churn uptick", impact: 54, time: "10:30" },
  { id: "t4", label: "Expansion surge", impact: 70, time: "11:15" }
];

const adoptionSegments = ["Enterprise", "Mid-market", "SMB", "Self-serve"];
const adoptionFeatures = ["Smart Search", "Alerts", "Exports", "Collaboration", "Governance", "AI Assist"];
const baseAdoptionMatrix = [
  [82, 64, 52, 38],
  [76, 58, 46, 34],
  [68, 52, 40, 30],
  [62, 48, 36, 28],
  [54, 42, 32, 24],
  [70, 56, 44, 36]
];

const flowStageLabels = ["New", "Activated", "Paid"];
const flowStageColors = [
  "rgba(56, 189, 248, 0.7)",
  "rgba(139, 92, 246, 0.65)",
  "rgba(34, 197, 94, 0.6)"
];

const baseExperiments = [
  { id: "exp-1", label: "Onboarding v4", lift: 6.2, status: "running" },
  { id: "exp-2", label: "Pricing copy", lift: 3.4, status: "paused" },
  { id: "exp-3", label: "AI summary panel", lift: 9.1, status: "running" },
  { id: "exp-4", label: "Checkout flow", lift: -1.8, status: "review" }
];

const baseQueries = [
  { id: "q1", label: "Revenue by region", value: 82 },
  { id: "q2", label: "Activation funnel", value: 64 },
  { id: "q3", label: "Churn cohort", value: 58 },
  { id: "q4", label: "Latency P95", value: 46 }
];

const baseBaseline = [42, 46, 44, 50, 56, 52, 60, 58, 62, 66, 70, 68];
const baseBurn = [86, 82, 78, 74, 70, 66, 60, 56, 52];
const baseWaterfall = [
  { label: "Starting ARR", value: 240 },
  { label: "New sales", value: 72 },
  { label: "Expansion", value: 48 },
  { label: "Churn", value: -36 },
  { label: "Contraction", value: -18 },
  { label: "Ending ARR", value: 306 }
];

const baseRadar = [
  { label: "Reliability", value: 0.82 },
  { label: "Velocity", value: 0.72 },
  { label: "Efficiency", value: 0.64 },
  { label: "Adoption", value: 0.78 },
  { label: "Satisfaction", value: 0.7 }
];

const baseHistogram = [12, 18, 24, 32, 28, 22, 14, 10];

const baseActivity = [
  { id: "a1", title: "Experiment shipped", detail: "Pricing test to 12% traffic", time: "2m ago" },
  { id: "a2", title: "Churn risk flagged", detail: "3 enterprise accounts at risk", time: "12m ago" },
  { id: "a3", title: "New cohort anomaly", detail: "Activation dip in APAC", time: "28m ago" },
  { id: "a4", title: "Sales pipeline updated", detail: "4 deals moved to review", time: "1h ago" }
];

const baseAlerts = [
  { id: "al1", label: "Latency spike", severity: "critical", value: "P95 420ms" },
  { id: "al2", label: "Churn watchlist", severity: "warn", value: "12 accounts" },
  { id: "al3", label: "New expansion", severity: "positive", value: "MRR +$42k" }
];

const baseHeatmap = Array.from({ length: 24 }, (_, index) => {
  const wave = Math.sin(index * 0.55) + Math.cos(index * 0.32);
  return Math.round(((wave + 2) / 4) * 100);
});

const sparkSize = { width: 120, height: 44 };

const buildSparkPath = (values: number[], width: number, height: number) => {
  const padding = 6;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  const step = (width - padding * 2) / (values.length - 1 || 1);
  const points = values.map((value, index) => {
    const x = padding + index * step;
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return { x, y };
  });
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
  const area = `${line} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;
  return { line, area };
};

export default function DashboardSection() {
  const [rangeId, setRangeId] = useState<RangeOption["id"]>("7d");
  const [sourceId, setSourceId] = useState<SourceOption["id"]>("product");
  const [compareMode, setCompareMode] = useState(true);
  const [liveMode, setLiveMode] = useState(false);
  const [activeSegment, setActiveSegment] = useState(baseSegments[0].id);
  const [activeCohort, setActiveCohort] = useState({ row: 0, col: 0 });
  const [activeAnomaly, setActiveAnomaly] = useState(baseAnomalies[0].id);
  const [activeJourney, setActiveJourney] = useState(baseJourney[0].id);
  const [activeAdoption, setActiveAdoption] = useState({ feature: 0, segment: 0 });
  const [activeTimeline, setActiveTimeline] = useState(baseAnomalyTimeline[0].id);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [sortKey, setSortKey] = useState<"arr" | "growth" | "health">("arr");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [compactTable, setCompactTable] = useState(false);

  const range = ranges.find((item) => item.id === rangeId) ?? ranges[1];
  const source = sources.find((item) => item.id === sourceId) ?? sources[0];
  const scale = range.scale * source.scale;

  const kpis = useMemo(
    () =>
      baseKpis.map((kpi) => ({
        ...kpi,
        value: Math.round(kpi.value * scale * 10) / 10,
        delta: Math.round(kpi.delta * scale * 10) / 10,
        series: kpi.series.map((value) => Math.round(value * scale))
      })),
    [scale]
  );

  const segments = useMemo(
    () =>
      baseSegments.map((segment, index) => ({
        ...segment,
        value: Math.round(segment.value * scale * (0.9 + index * 0.05)),
        delta: Math.round(segment.delta * scale)
      })),
    [scale]
  );

  const pipeline = useMemo(
    () =>
      basePipeline.map((stage, index) => ({
        ...stage,
        value: Math.round(stage.value * scale * (0.92 + index * 0.04))
      })),
    [scale]
  );

  const accounts = useMemo(
    () =>
      baseAccounts.map((account, index) => ({
        ...account,
        arr: Math.round(account.arr * scale * (0.95 + index * 0.03)),
        growth: Math.round(account.growth * scale * 0.9),
        health: Math.round(account.health * scale * 0.9)
      })),
    [scale]
  );

  const sortedAccounts = useMemo(() => {
    const sorted = [...accounts].sort((a, b) => {
      const value = a[sortKey] - b[sortKey];
      return sortDir === "asc" ? value : -value;
    });
    return compactTable ? sorted.slice(0, 4) : sorted;
  }, [accounts, sortDir, sortKey, compactTable]);

  const goals = useMemo(
    () => baseGoals.map((goal) => ({ ...goal, value: Math.min(goal.value * scale * 0.95, 0.95) })),
    [scale]
  );

  const trendSeries = useMemo(
    () => baseKpis[0].series.map((value, index) => Math.round(value * scale * (0.9 + index * 0.03))),
    [scale]
  );

  const forecastSeries = useMemo(
    () => baseForecast.map((value, index) => Math.round(value * scale * (0.88 + index * 0.02))),
    [scale]
  );

  const cohortValues = useMemo(
    () =>
      baseCohorts.map((cohort) => ({
        ...cohort,
        values: cohort.values.map((value) => Math.round(value * (0.9 + scale * 0.08)))
      })),
    [scale]
  );

  const budget = useMemo(
    () =>
      baseBudget.map((item) => ({
        ...item,
        value: Math.round(item.value * scale * 0.9)
      })),
    [scale]
  );

  const anomalies = useMemo(
    () =>
      baseAnomalies.map((item, index) => ({
        ...item,
        value: Math.min(98, Math.round(item.value * scale * (0.9 + index * 0.03)))
      })),
    [scale]
  );

  const radarValues = useMemo(
    () =>
      baseRadar.map((item) => ({
        ...item,
        value: Math.min(0.95, item.value * scale * 0.92)
      })),
    [scale]
  );

  const slas = useMemo(
    () =>
      baseSla.map((item, index) => ({
        ...item,
        value: Math.min(item.target, item.value * (0.96 + scale * 0.04 + index * 0.01))
      })),
    [scale]
  );

  const journey = useMemo(
    () =>
      baseJourney.map((item, index) => ({
        ...item,
        value: Math.round(item.value * scale * (0.92 + index * 0.03))
      })),
    [scale]
  );

  const regions = useMemo(
    () =>
      baseRegions.map((item, index) => ({
        ...item,
        value: Math.round(item.value * scale * (0.9 + index * 0.04))
      })),
    [scale]
  );

  const cohortFlow = useMemo(
    () =>
      baseCohortFlow.map((flow, index) => ({
        ...flow,
        stages: flow.stages.map((value) => Math.round(value * scale * (0.9 + index * 0.02)))
      })),
    [scale]
  );

  const escalations = useMemo(
    () =>
      baseEscalations.map((item, index) => ({
        ...item,
        score: Math.round((72 + index * 6) * scale)
      })),
    [scale]
  );

  const timeline = useMemo(
    () =>
      baseAnomalyTimeline.map((item, index) => ({
        ...item,
        impact: Math.min(98, Math.round(item.impact * scale * (0.9 + index * 0.02)))
      })),
    [scale]
  );

  const adoptionMatrix = useMemo(
    () =>
      baseAdoptionMatrix.map((row) =>
        row.map((value) => Math.min(100, Math.round(value * scale * 0.95)))
      ),
    [scale]
  );

  const experiments = useMemo(
    () =>
      baseExperiments.map((item, index) => ({
        ...item,
        lift: Math.round(item.lift * scale * 10) / 10,
        score: Math.min(100, Math.round((56 + index * 8) * scale))
      })),
    [scale]
  );

  const queries = useMemo(
    () =>
      baseQueries.map((item, index) => ({
        ...item,
        value: Math.round(item.value * scale * (0.92 + index * 0.03))
      })),
    [scale]
  );

  const baselineSeries = useMemo(
    () => baseBaseline.map((value, index) => Math.round(value * scale * (0.92 + index * 0.01))),
    [scale]
  );

  const burnSeries = useMemo(
    () => baseBurn.map((value, index) => Math.round(value * scale * (0.92 + index * 0.01))),
    [scale]
  );

  const waterfall = useMemo(
    () =>
      baseWaterfall.map((item) => ({
        ...item,
        value: Math.round(item.value * scale)
      })),
    [scale]
  );

  const npsScore = Math.min(96, Math.round(52 * scale + 6));

  const histogram = useMemo(
    () => baseHistogram.map((value, index) => Math.round(value * scale * (0.9 + index * 0.02))),
    [scale]
  );

  const heatmap = useMemo(() => {
    return baseHeatmap.map((value, index) => {
      const modifier = 0.8 + (index % 6) * 0.04 + (sourceId === "finance" ? 0.12 : 0);
      return Math.round(value * modifier * range.scale);
    });
  }, [range.scale, sourceId]);

  const sparkPaths = useMemo(
    () =>
      kpis.reduce<Record<string, { line: string; area: string }>>((acc, kpi) => {
        acc[kpi.id] = buildSparkPath(kpi.series, sparkSize.width, sparkSize.height);
        return acc;
      }, {}),
    [kpis]
  );

  const trendPath = useMemo(
    () => buildSparkPath(trendSeries, 360, 140),
    [trendSeries]
  );

  const forecastPath = useMemo(
    () => buildSparkPath(forecastSeries, 360, 140),
    [forecastSeries]
  );

  const baselinePath = useMemo(
    () => buildSparkPath(baselineSeries, 360, 140),
    [baselineSeries]
  );

  const burnPath = useMemo(
    () => buildSparkPath(burnSeries, 300, 120),
    [burnSeries]
  );

  const activeSegmentData = segments.find((segment) => segment.id === activeSegment) ?? segments[0];
  const activeAnomalyData = anomalies.find((item) => item.id === activeAnomaly) ?? anomalies[0];
  const activeJourneyData = journey.find((item) => item.id === activeJourney) ?? journey[0];
  const activeTimelineData = timeline.find((item) => item.id === activeTimeline) ?? timeline[0];

  const ringRadius = 36;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const budgetTotal = budget.reduce((sum, item) => sum + item.value, 0) || 1;
  const slaRadius = 18;
  const slaCircumference = 2 * Math.PI * slaRadius;
  const radarRadius = 54;
  const radarPoints = radarValues
    .map((item, index) => {
      const angle = (Math.PI * 2 * index) / radarValues.length - Math.PI / 2;
      const radius = radarRadius * item.value;
      return {
        x: 70 + Math.cos(angle) * radius,
        y: 70 + Math.sin(angle) * radius
      };
    })
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <section id="dashboard-elements" className="space-y-6">
      <SectionHeader title="Dashboard Elements" subtitle="Operational UI kit" />

      <div className="card card-hover p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-soft uppercase tracking-[0.3em]">Workspace</p>
            <h3 className="text-lg font-semibold">Product intelligence console</h3>
            <p className="text-xs text-muted">
              Assemble KPI cards, tables, and operational widgets for dashboards and apps.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select className="control-input" value={rangeId} onChange={(event) => setRangeId(event.target.value as RangeOption["id"])}>
              {ranges.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <select className="control-input" value={sourceId} onChange={(event) => setSourceId(event.target.value as SourceOption["id"])}>
              {sources.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <Toggle label="Compare" checked={compareMode} onChange={setCompareMode} />
            <Toggle label="Live" checked={liveMode} onChange={setLiveMode} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="card card-hover space-y-4 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs text-soft uppercase tracking-[0.2em]">{kpi.label}</p>
              <span className="rounded-full border border-border bg-surface-2 px-2 py-1 text-[10px] text-muted">
                {compareMode ? `${kpi.delta >= 0 ? "+" : ""}${kpi.delta}${kpi.unit}` : "Live"}
              </span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-2xl font-semibold">
                  {kpi.value}
                  <span className="text-sm text-soft"> {kpi.unit}</span>
                </p>
                <p className="text-xs text-muted">vs previous period</p>
              </div>
              <svg width={sparkSize.width} height={sparkSize.height} viewBox={`0 0 ${sparkSize.width} ${sparkSize.height}`}>
                <path d={sparkPaths[kpi.id].area} fill="rgba(56, 189, 248, 0.18)" />
                <path d={sparkPaths[kpi.id].line} stroke={source.accent} strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="card card-hover dashboard-aurora space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Performance overview</h3>
            <span className="text-xs text-soft">Engagement trend</span>
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4">
            <svg viewBox="0 0 360 140" className="h-32 w-full">
              <path d={trendPath.area} fill="rgba(139, 92, 246, 0.18)" />
              <path d={trendPath.line} stroke="rgba(139, 92, 246, 0.9)" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-muted">
            <span className="rounded-full border border-border bg-surface-2 px-3 py-1">Traffic + {Math.round(scale * 12)}%</span>
            <span className="rounded-full border border-border bg-surface-2 px-3 py-1">Churn - {Math.round(scale * 4)}%</span>
            <span className="rounded-full border border-border bg-surface-2 px-3 py-1">Quality score {Math.round(scale * 86)}</span>
          </div>
        </div>

        <div className="card card-hover space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Goal progress</h3>
            <span className="text-xs text-soft">{range.label}</span>
          </div>
          <div className="grid gap-3">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-muted">{goal.label}</p>
                  <p className="text-sm font-semibold">{Math.round(goal.value * 100)}%</p>
                </div>
                <div className="h-2 w-40 rounded-full bg-surface-2">
                  <div
                    className="h-2 rounded-full bg-primary/70"
                    style={{ width: `${Math.round(goal.value * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            Track OKR momentum and operational stability.
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card card-hover space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Segment mix</h3>
            <span className="text-xs text-soft">Hover to inspect</span>
          </div>
          <div className="space-y-3">
            {segments.map((segment) => (
              <button
                key={segment.id}
                type="button"
                className={`flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-left text-xs transition ${
                  segment.id === activeSegment ? "bg-surface-3" : "bg-surface-2"
                }`}
                onMouseEnter={() => setActiveSegment(segment.id)}
              >
                <div>
                  <p className="text-sm font-semibold">{segment.label}</p>
                  <p className="text-[10px] text-muted">+{segment.delta}% growth</p>
                </div>
                <div className="h-2 w-24 rounded-full bg-surface-1">
                  <div
                    className="h-2 rounded-full bg-primary/70"
                    style={{ width: `${segment.value}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            {activeSegmentData.label} share · {activeSegmentData.value}% of pipeline.
          </div>
        </div>

        <div className="card card-hover space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Pipeline funnel</h3>
            <span className="text-xs text-soft">Stage velocity</span>
          </div>
          <div className="space-y-3">
            {pipeline.map((stage, index) => (
              <div key={stage.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">{stage.label}</span>
                  <span className="text-soft">{stage.value}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-2">
                  <div
                    className="h-2 rounded-full bg-secondary/70"
                    style={{ width: `${(stage.value / pipeline[0].value) * 100}%` }}
                  />
                </div>
                {index < pipeline.length - 1 && (
                  <div className="text-[10px] text-muted">Drop-off {Math.round(100 - (pipeline[index + 1].value / stage.value) * 100)}%</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card card-hover space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Utilization ring</h3>
            <span className="text-xs text-soft">Platform load</span>
          </div>
          <div className="flex items-center gap-4">
            <svg width="110" height="110" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r={ringRadius} stroke="var(--color-border)" strokeWidth="10" fill="none" />
              <circle
                cx="55"
                cy="55"
                r={ringRadius}
                stroke={source.accent}
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringCircumference * (1 - Math.min(0.92, 0.62 * scale))}
                style={{ transformOrigin: "55px 55px", transform: "rotate(-90deg)" }}
              />
              <text x="55" y="60" textAnchor="middle" className="fill-current text-sm text-soft">
                {Math.round(62 * scale)}%
              </text>
            </svg>
            <div className="space-y-2 text-xs text-muted">
              <div>Compute: {Math.round(68 * scale)}%</div>
              <div>Memory: {Math.round(54 * scale)}%</div>
              <div>Storage: {Math.round(42 * scale)}%</div>
            </div>
          </div>
          <p className="text-xs text-muted">Ring widgets are great for realtime capacity signals.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="card card-hover space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold">Account table</h3>
            <div className="flex items-center gap-2">
              <select className="control-input" value={sortKey} onChange={(event) => setSortKey(event.target.value as typeof sortKey)}>
                <option value="arr">ARR</option>
                <option value="growth">Growth</option>
                <option value="health">Health</option>
              </select>
              <button className="btn" onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}>
                {sortDir === "asc" ? "Asc" : "Desc"}
              </button>
              <Toggle label="Compact" checked={compactTable} onChange={setCompactTable} />
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-2 text-[10px] uppercase tracking-[0.2em] text-soft">
                <tr>
                  <th className="px-3 py-2">Account</th>
                  <th className="px-3 py-2">Region</th>
                  <th className="px-3 py-2">ARR</th>
                  <th className="px-3 py-2">Growth</th>
                  <th className="px-3 py-2">Health</th>
                </tr>
              </thead>
              <tbody>
                {sortedAccounts.map((account) => (
                  <tr key={account.id} className="border-t border-border">
                    <td className="px-3 py-2 font-medium">{account.name}</td>
                    <td className="px-3 py-2 text-muted">{account.region}</td>
                    <td className="px-3 py-2">${account.arr}k</td>
                    <td className="px-3 py-2 text-success">+{account.growth}%</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary/70" />
                        {account.health}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted">Sortable tables for revenue, ops, and customer health views.</p>
        </div>

        <div className="grid gap-6">
          <div className="card card-hover space-y-4 p-6">
            <h3 className="text-base font-semibold">Activity feed</h3>
            <div className="space-y-3 text-xs">
              {baseActivity.map((item) => (
                <div key={item.id} className="rounded-lg border border-border bg-surface-2 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-[10px] text-muted">{item.time}</span>
                  </div>
                  <p className="text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card card-hover space-y-4 p-6">
            <h3 className="text-base font-semibold">Alerts & flags</h3>
            <div className="space-y-3 text-xs">
              {baseAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2">
                  <div>
                    <p className="font-semibold">{alert.label}</p>
                    <p className="text-[10px] text-muted">{alert.value}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] ${
                      alert.severity === "critical"
                        ? "bg-red-500/20 text-red-200"
                        : alert.severity === "warn"
                        ? "bg-yellow-500/20 text-yellow-100"
                        : "bg-emerald-500/20 text-emerald-100"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border bg-surface-2 p-3 text-[10px] text-muted">
              Surface alerts for ops dashboards and executive summaries.
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card card-hover space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Engagement heatmap</h3>
            <span className="text-xs text-soft">Session density</span>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {heatmap.map((value, index) => (
              <div
                key={index}
                className="h-6 rounded-md"
                style={{ background: `rgba(56, 189, 248, ${0.15 + value / 120})` }}
                title={`Score ${value}`}
              />
            ))}
          </div>
          <p className="text-xs text-muted">Heatmaps communicate activity clusters in dashboards.</p>
        </div>

        <div className="card card-hover space-y-4 p-6">
          <h3 className="text-base font-semibold">Quick actions</h3>
          <div className="flex flex-wrap gap-2">
            {["Share report", "Export CSV", "Create alert", "Add widget"].map((label) => (
              <button key={label} className="btn">
                {label}
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            Action clusters anchor the dashboard for operators and analysts.
          </div>
        </div>

        <div className="card card-hover space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Snapshot cards</h3>
            <span className="text-xs text-soft">{liveMode ? "Live" : "Static"}</span>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="rounded-lg border border-border bg-surface-2 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">Insight {index}</span>
                  <span className="text-muted">+{Math.round(scale * (index * 2 + 6))}%</span>
                </div>
                <p className="text-[10px] text-muted">
                  Add narrative cards for executives, stakeholders, and client portals.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card card-hover space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Cohort retention</h3>
            <span className="text-xs text-soft">Hover a cell</span>
          </div>
          <div className="grid grid-cols-[auto_repeat(5,1fr)] gap-2 text-[10px] text-soft">
            <div />
            {["D1", "D7", "D14", "D21", "D28"].map((label) => (
              <div key={label} className="text-center text-muted">
                {label}
              </div>
            ))}
            {cohortValues.map((cohort, row) => (
              <div key={cohort.id} className="contents">
                <div className="text-muted">{cohort.label}</div>
                {cohort.values.map((value, col) => (
                  <button
                    key={`${cohort.id}-${col}`}
                    type="button"
                    className="h-7 rounded-md border border-border"
                    style={{ background: `rgba(56, 189, 248, ${0.15 + value / 140})` }}
                    onMouseEnter={() => setActiveCohort({ row, col })}
                  >
                    <span className="text-[10px] text-soft">{value}%</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-3 text-[10px] text-muted">
            {cohortValues[activeCohort.row]?.label} · Day{" "}
            {["1", "7", "14", "21", "28"][activeCohort.col]} retention:{" "}
            {cohortValues[activeCohort.row]?.values[activeCohort.col]}%
          </div>
        </div>

        <div className="card card-hover dashboard-sheen space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Forecast band</h3>
            <span className="text-xs text-soft">90-day outlook</span>
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4">
            <svg viewBox="0 0 360 140" className="h-32 w-full">
              <path d={forecastPath.area} fill="rgba(34, 211, 238, 0.18)" />
              <path d={forecastPath.line} stroke="rgba(34, 211, 238, 0.9)" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] text-muted">
            <span className="rounded-full border border-border bg-surface-2 px-2 py-1">Baseline +{Math.round(scale * 8)}%</span>
            <span className="rounded-full border border-border bg-surface-2 px-2 py-1">Upside +{Math.round(scale * 14)}%</span>
            <span className="rounded-full border border-border bg-surface-2 px-2 py-1">Risk -{Math.round(scale * 5)}%</span>
          </div>
        </div>

        <div className="card card-hover dashboard-orb space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Signal radar</h3>
            <span className="text-xs text-soft">Multi-metric health</span>
          </div>
          <div className="flex items-center justify-center">
            <svg width="140" height="140" viewBox="0 0 140 140">
              {[1, 2, 3].map((ring) => (
                <circle
                  key={ring}
                  cx="70"
                  cy="70"
                  r={ring * 18}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                  fill="none"
                />
              ))}
              <polygon points={radarPoints} fill="rgba(139, 92, 246, 0.35)" stroke="rgba(139, 92, 246, 0.9)" strokeWidth="2" />
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] text-muted">
            {radarValues.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-md border border-border bg-surface-2 px-2 py-1">
                <span>{item.label}</span>
                <span>{Math.round(item.value * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card card-hover space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Budget allocator</h3>
            <span className="text-xs text-soft">Stacked mix</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-surface-2">
            <div className="flex h-full">
              {budget.map((item, index) => (
                <div
                  key={item.id}
                  className="h-full"
                  style={{
                    width: `${(item.value / budgetTotal) * 100}%`,
                    background: index % 2 === 0 ? "rgba(34, 211, 238, 0.7)" : "rgba(139, 92, 246, 0.6)"
                  }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2 text-xs text-muted">
            {budget.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-hover space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Milestone timeline</h3>
            <span className="text-xs text-soft">Roadmap focus</span>
          </div>
          <div className="space-y-4">
            {baseMilestones.map((item, index) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="h-2 w-2 rounded-full bg-primary/80" />
                  {index < baseMilestones.length - 1 && <span className="mt-2 h-6 w-px bg-border" />}
                </div>
                <div className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-[10px] text-muted">{item.time}</span>
                  </div>
                  <p className="text-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-hover space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Latency distribution</h3>
            <span className="text-xs text-soft">P95 histogram</span>
          </div>
          <div className="flex items-end gap-2">
            {histogram.map((value, index) => (
              <div
                key={index}
                className="w-4 rounded-md bg-secondary/70"
                style={{ height: `${value}px` }}
              />
            ))}
          </div>
          <p className="text-xs text-muted">Use histograms for performance variance and outliers.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="card card-hover dashboard-sheen space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Anomaly tracker</h3>
            <span className="text-xs text-soft">Hover a signal</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {anomalies.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`rounded-lg border border-border px-3 py-3 text-left text-xs transition ${
                  item.id === activeAnomaly ? "bg-surface-3 shadow-[0_0_24px_rgba(56,189,248,0.2)]" : "bg-surface-2"
                }`}
                onMouseEnter={() => setActiveAnomaly(item.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{item.label}</span>
                  <span className="text-soft">{item.value}%</span>
                </div>
                <p className="text-[10px] text-muted">{item.note}</p>
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            {activeAnomalyData.label} · Signal strength {activeAnomalyData.value}% · {activeAnomalyData.note}
          </div>
        </div>

        <div className="card card-hover space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Ops checklist</h3>
            <span className="text-xs text-soft">Daily cadence</span>
          </div>
          <div className="space-y-2 text-xs">
            {["Refresh alerts", "Review cohort dips", "Sync revenue forecast", "Validate pipeline"].map((label) => (
              <label key={label} className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2">
                <span className="text-muted">{label}</span>
                <input type="checkbox" defaultChecked={label === "Review cohort dips"} />
              </label>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-3 text-[10px] text-muted">
            Checklist blocks keep dashboards actionable for operators.
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Glassmorphism panel</h3>
            <span className="text-xs text-soft">Premium overlay</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {["Realtime sync", "Risk guard", "Smart alerts", "Multi-tenant"].map((item) => (
              <div key={item} className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-soft">
                {item}
              </div>
            ))}
          </div>
          <button className="btn btn-primary w-fit">Deploy module</button>
        </div>

        <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Prism border</h3>
            <span className="text-xs text-soft">Animated edge</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/20" />
            <div className="space-y-1 text-xs text-muted">
              <div className="text-sm font-semibold text-soft">Investor-ready KPI</div>
              <div>Highlight premium cards with chroma borders.</div>
            </div>
          </div>
          <div className="flex gap-2 text-[10px] text-muted">
            <span className="rounded-full border border-border bg-surface-2 px-2 py-1">Gradient</span>
            <span className="rounded-full border border-border bg-surface-2 px-2 py-1">Animated</span>
          </div>
        </div>

        <div className="card card-hover card-streak card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Light streak</h3>
            <span className="text-xs text-soft">Luxury sheen</span>
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4">
            <div className="flex items-end gap-2">
              {[34, 46, 58, 42, 66].map((value, index) => (
                <div key={index} className="w-6 rounded-md bg-secondary/70" style={{ height: `${value}px` }} />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted">Sweep highlights across hero KPI cards.</p>
        </div>

        <div className="card card-hover card-volumetric card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Volumetric glow</h3>
            <span className="text-xs text-soft">Depth field</span>
          </div>
          <div className="grid gap-3">
            {["Pipeline", "Forecast", "Health"].map((label) => (
              <div key={label} className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs">
                <span className="text-muted">{label}</span>
                <span className="text-soft">{Math.round(scale * 80)}%</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted">Soft glow builds dimensional hierarchy.</p>
        </div>

        <div className="card card-hover card-holo card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Holographic foil</h3>
            <span className="text-xs text-soft">Editorial accent</span>
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            <p className="text-sm font-semibold text-soft">Signature highlight</p>
            <p>Use for standout announcements and launch cards.</p>
          </div>
          <button className="btn">Learn more</button>
        </div>

        <div
          className="card card-hover card-parallax card-refract space-y-4 p-6"
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const dx = ((event.clientX - rect.left) / rect.width - 0.5) * 20;
            const dy = ((event.clientY - rect.top) / rect.height - 0.5) * 20;
            setParallax({ x: dx, y: dy });
          }}
          onMouseLeave={() => setParallax({ x: 0, y: 0 })}
          style={
            { "--parallax-x": `${parallax.x}px`, "--parallax-y": `${parallax.y}px` } as CSSProperties
          }
        >
          <div className="parallax-layer parallax-layer-one" />
          <div className="parallax-layer parallax-layer-two" />
          <div className="parallax-layer parallax-layer-three" />
          <div className="relative z-10 space-y-2">
            <h3 className="text-base font-semibold">3D parallax deck</h3>
            <p className="text-xs text-muted">Pointer-reactive depth for hero dashboards.</p>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-surface-2 px-2 py-1 text-[10px]">Depth</span>
              <span className="rounded-full border border-border bg-surface-2 px-2 py-1 text-[10px]">Motion</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="card card-hover dashboard-aurora space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">SLA status</h3>
            <span className="text-xs text-soft">Service health</span>
          </div>
          <div className="space-y-3">
            {slas.map((sla) => {
              const ratio = Math.min(1, sla.value / sla.target);
              return (
                <div key={sla.id} className="flex items-center gap-3">
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r={slaRadius} stroke="var(--color-border)" strokeWidth="6" fill="none" />
                    <circle
                      cx="24"
                      cy="24"
                      r={slaRadius}
                      stroke="var(--color-primary)"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={slaCircumference}
                      strokeDashoffset={slaCircumference * (1 - ratio)}
                      style={{ transformOrigin: "24px 24px", transform: "rotate(-90deg)" }}
                    />
                  </svg>
                  <div>
                    <p className="text-xs text-muted">{sla.label}</p>
                    <p className="text-sm font-semibold">
                      {(sla.value * 100).toFixed(2)}% <span className="text-xs text-soft">/ {(sla.target * 100).toFixed(2)}%</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="pulse-dot" />
            All service objectives within tolerance.
          </div>
        </div>

        <div className="card card-hover card-volumetric space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Incident timeline</h3>
            <span className="text-xs text-soft">Operational events</span>
          </div>
          <div className="space-y-4 text-xs">
            {baseIncidents.map((incident, index) => (
              <div key={incident.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      incident.severity === "high"
                        ? "bg-red-400"
                        : incident.severity === "medium"
                        ? "bg-yellow-300"
                        : "bg-emerald-400"
                    }`}
                  />
                  {index < baseIncidents.length - 1 && <span className="mt-2 h-6 w-px bg-border" />}
                </div>
                <div className="rounded-lg border border-border bg-surface-2 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{incident.title}</span>
                    <span className="text-[10px] text-muted">{incident.time}</span>
                  </div>
                  <p className="text-muted">{incident.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-hover card-prism-border space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Journey flow</h3>
            <span className="text-xs text-soft">Lifecycle momentum</span>
          </div>
          <div className="space-y-3">
            {journey.map((step) => (
              <button
                key={step.id}
                type="button"
                className={`flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-left text-xs ${
                  activeJourney === step.id ? "bg-surface-3" : "bg-surface-2"
                }`}
                onMouseEnter={() => setActiveJourney(step.id)}
              >
                <div>
                  <p className="text-sm font-semibold">{step.label}</p>
                  <p className="text-[10px] text-muted">Stage health</p>
                </div>
                <div className="h-2 w-24 rounded-full bg-surface-1">
                  <div className="h-2 rounded-full bg-secondary/70" style={{ width: `${step.value}%` }} />
                </div>
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-3 text-[10px] text-muted">
            {activeJourneyData.label} momentum · {activeJourneyData.value} score
          </div>
        </div>

        <div className="card card-hover card-holo space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Regional load</h3>
            <span className="text-xs text-soft">Traffic mix</span>
          </div>
          <div className="space-y-3 text-xs text-muted">
            {regions.map((region) => (
              <div key={region.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>{region.label}</span>
                  <span>{region.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-2">
                  <div className="h-2 rounded-full bg-primary/70" style={{ width: `${region.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted">Use regional split cards in executive dashboards.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">NPS pulse</h3>
            <span className="text-xs text-soft">Customer sentiment</span>
          </div>
          <div className="flex items-center justify-center">
            <svg width="160" height="90" viewBox="0 0 160 90">
              <defs>
                <linearGradient id="npsGradient" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="rgba(56, 189, 248, 0.9)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0.9)" />
                </linearGradient>
              </defs>
              <path
                d="M20 70 A50 50 0 0 1 140 70"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="10"
                fill="none"
                pathLength={100}
              />
              <path
                d="M20 70 A50 50 0 0 1 140 70"
                stroke="url(#npsGradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray={`${npsScore} 100`}
              />
              <text x="80" y="60" textAnchor="middle" className="fill-current text-xl font-semibold text-soft">
                {npsScore}
              </text>
              <text x="80" y="78" textAnchor="middle" className="fill-current text-[10px] text-muted">
                NPS score
              </text>
            </svg>
          </div>
          <p className="text-xs text-muted">Sentiment gauges are perfect for executive dashboards.</p>
        </div>

        <div className="card card-hover card-volumetric card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Experiment tracker</h3>
            <span className="text-xs text-soft">Growth lab</span>
          </div>
          <div className="space-y-3 text-xs">
            {experiments.map((experiment) => (
              <div key={experiment.id} className="rounded-lg border border-border bg-surface-2 px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{experiment.label}</span>
                  <span className="text-soft">
                    {experiment.lift >= 0 ? "+" : ""}
                    {experiment.lift}%
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-surface-1">
                    <div className="h-2 rounded-full bg-primary/70" style={{ width: `${experiment.score}%` }} />
                  </div>
                  <span className="text-[10px] text-muted">{experiment.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Top queries</h3>
            <span className="text-xs text-soft">Analyst workspace</span>
          </div>
          <div className="space-y-3 text-xs text-muted">
            {queries.map((query) => (
              <div key={query.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>{query.label}</span>
                  <span>{query.value}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-2">
                  <div className="h-2 rounded-full bg-secondary/70" style={{ width: `${query.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted">Quick-access queries help operators move faster.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Cohort flow</h3>
            <span className="text-xs text-soft">Stage progression</span>
          </div>
          <div className="space-y-3 text-xs">
            {cohortFlow.map((flow) => {
              const total = flow.stages.reduce((sum, value) => sum + value, 0) || 1;
              return (
                <div key={flow.id} className="space-y-1">
                  <div className="flex items-center justify-between text-muted">
                    <span>{flow.label}</span>
                    <span>{total}k</span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full bg-surface-2">
                    {flow.stages.map((value, index) => (
                      <div
                        key={`${flow.id}-${index}`}
                        className="h-full"
                        style={{
                          width: `${(value / total) * 100}%`,
                          background: flowStageColors[index]
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] text-muted">
            {flowStageLabels.map((label, index) => (
              <span key={label} className="flex items-center gap-2 rounded-full border border-border bg-surface-2 px-2 py-1">
                <span className="h-2 w-2 rounded-full" style={{ background: flowStageColors[index] }} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="card card-hover card-volumetric card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Anomaly timeline</h3>
            <span className="text-xs text-soft">Signal drift</span>
          </div>
          <div className="space-y-3 text-xs">
            {timeline.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-left ${
                  activeTimeline === item.id ? "bg-surface-3" : "bg-surface-2"
                }`}
                onMouseEnter={() => setActiveTimeline(item.id)}
              >
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-[10px] text-muted">{item.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 rounded-full bg-surface-1">
                    <div className="h-2 rounded-full bg-secondary/70" style={{ width: `${item.impact}%` }} />
                  </div>
                  <span className="text-soft">{item.impact}%</span>
                </div>
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-3 text-[10px] text-muted">
            {activeTimelineData.label} impact · {activeTimelineData.impact}% · {activeTimelineData.time}
          </div>
        </div>

        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">SLA escalations</h3>
            <span className="text-xs text-soft">Queue priority</span>
          </div>
          <div className="space-y-3 text-xs">
            {escalations.map((item) => (
              <div key={item.id} className="rounded-lg border border-border bg-surface-2 px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{item.label}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] ${
                      item.severity === "high"
                        ? "bg-red-500/20 text-red-200"
                        : item.severity === "medium"
                        ? "bg-yellow-500/20 text-yellow-100"
                        : "bg-emerald-500/20 text-emerald-100"
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>
                <p className="text-[10px] text-muted">{item.detail}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-muted">
                  <span>{item.owner}</span>
                  <span>Score {item.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Feature adoption grid</h3>
            <span className="text-xs text-soft">Segment x feature</span>
          </div>
          <div className="grid grid-cols-[auto_repeat(4,1fr)] gap-2 text-[10px] text-soft">
            <div />
            {adoptionSegments.map((segment) => (
              <div key={segment} className="text-center text-muted">
                {segment}
              </div>
            ))}
            {adoptionFeatures.map((feature, row) => (
              <div key={feature} className="contents">
                <div className="text-muted">{feature}</div>
                {adoptionMatrix[row].map((value, col) => (
                  <button
                    key={`${feature}-${col}`}
                    type="button"
                    className="h-8 rounded-md border border-border"
                    style={{ background: `rgba(56, 189, 248, ${0.15 + value / 140})` }}
                    onMouseEnter={() => setActiveAdoption({ feature: row, segment: col })}
                  >
                    <span className="text-[10px] text-soft">{value}%</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-3 text-[10px] text-muted">
            {adoptionFeatures[activeAdoption.feature]} · {adoptionSegments[activeAdoption.segment]} adoption:{" "}
            {adoptionMatrix[activeAdoption.feature][activeAdoption.segment]}%
          </div>
        </div>

        <div className="card card-hover card-streak card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Cohort escalations</h3>
            <span className="text-xs text-soft">Risk watch</span>
          </div>
          <div className="space-y-3 text-xs text-muted">
            {["High-value churn risk", "New cohort volatility", "SMB downgrade signal", "Activation drop"].map((label, index) => (
              <div key={label} className="rounded-lg border border-border bg-surface-2 px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{label}</span>
                  <span className="text-soft">{Math.round(scale * (72 - index * 8))}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-surface-1">
                  <div className="h-2 rounded-full bg-primary/70" style={{ width: `${Math.round(scale * (72 - index * 8))}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card card-hover card-volumetric card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Anomaly baseline</h3>
            <span className="text-xs text-soft">Expected vs actual</span>
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4">
            <svg viewBox="0 0 360 140" className="h-28 w-full">
              <path d={baselinePath.area} fill="rgba(244, 114, 182, 0.18)" />
              <path d={baselinePath.line} stroke="rgba(244, 114, 182, 0.9)" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] text-muted">
            <span className="rounded-full border border-border bg-surface-2 px-2 py-1">Baseline variance {Math.round(scale * 6)}%</span>
            <span className="rounded-full border border-border bg-surface-2 px-2 py-1">Anomaly index {Math.round(scale * 74)}</span>
          </div>
        </div>

        <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">SLA burn-down</h3>
            <span className="text-xs text-soft">Error budget</span>
          </div>
          <div className="rounded-lg border border-border bg-surface-2 p-4">
            <svg viewBox="0 0 300 120" className="h-24 w-full">
              <path d={burnPath.area} fill="rgba(34, 197, 94, 0.2)" />
              <path d={burnPath.line} stroke="rgba(34, 197, 94, 0.9)" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <p className="text-xs text-muted">Track burn-down to keep SLOs within target.</p>
        </div>

        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <div className="dashboard-noise" />
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">KPI waterfall</h3>
            <span className="text-xs text-soft">ARR movement</span>
          </div>
          <div className="space-y-2 text-xs">
            {waterfall.reduce<{ label: string; value: number; start: number; delta: number }[]>((acc, item, index) => {
              const previous = acc[index - 1]?.start ?? 0;
              const start =
                item.label === "Starting ARR"
                  ? item.value
                  : item.label === "Ending ARR"
                  ? acc[acc.length - 1]?.start ?? item.value
                  : previous + item.value;
              acc.push({ label: item.label, value: item.value, start, delta: item.value });
              return acc;
            }, []).map((item, index) => (
              <div key={`${item.label}-${index}`} className="flex items-center justify-between rounded-lg border border-border bg-surface-2 px-3 py-2">
                <span className="text-muted">{item.label}</span>
                <span className={`${item.delta >= 0 ? "text-success" : "text-danger"}`}>
                  {item.delta >= 0 ? "+" : ""}
                  {item.delta}k
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted">Use waterfall cards for revenue decomposition.</p>
        </div>
      </div>
    </section>
  );
}
