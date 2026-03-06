type TokenSwatchProps = {
  name: string;
  label: string;
};

export default function TokenSwatch({ name, label }: TokenSwatchProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2 p-3 text-sm">
      <div className="flex items-center gap-3">
        <div
          className="h-8 w-8 rounded-md border border-border"
          style={{ background: `var(${name})` }}
        />
        <div className="flex flex-col">
          <span className="font-medium">{label}</span>
          <span className="text-xs text-muted">{name}</span>
        </div>
      </div>
      <button
        type="button"
        className="btn text-sm"
        onClick={async () => {
          if (typeof window === "undefined") return;
          const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
          await navigator.clipboard.writeText(`${name}: ${value}`);
        }}
      >
        Copy
      </button>
    </div>
  );
}
