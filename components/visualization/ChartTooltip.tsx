type ChartTooltipProps = {
  visible: boolean;
  x: number;
  y: number;
  title: string;
  body?: string;
  lines?: string[];
};

export default function ChartTooltip({ visible, x, y, title, body, lines }: ChartTooltipProps) {
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute z-20 rounded-md border border-border bg-surface-1 px-3 py-2 text-xs shadow-lg"
      style={{ left: x, top: y }}
    >
      <p className="font-semibold">{title}</p>
      {body && <p className="text-soft">{body}</p>}
      {lines?.map((line) => (
        <p key={line} className="text-soft">
          {line}
        </p>
      ))}
    </div>
  );
}
