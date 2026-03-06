type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition ${
        checked
          ? "border-transparent bg-primary text-white shadow-[0_10px_24px_rgba(34,211,238,0.25)]"
          : "border-border bg-surface-2 text-muted"
      }`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span
        className={`h-3 w-3 rounded-full ${
          checked ? "bg-white" : "bg-white/30"
        }`}
      />
      {label}
    </button>
  );
}
