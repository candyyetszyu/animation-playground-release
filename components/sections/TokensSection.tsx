import SectionHeader from "@/components/SectionHeader";

type TokensSectionProps = {
  tokensJson: string;
};

export default function TokensSection({ tokensJson }: TokensSectionProps) {
  return (
    <section id="tokens" className="space-y-6">
      <SectionHeader title="Token Export" subtitle="JSON + CSS variables" />
      <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn"
            onClick={() => navigator.clipboard.writeText(tokensJson)}
          >
            Copy JSON
          </button>
          <a className="btn" href="/tokens.json" download>
            Download JSON
          </a>
        </div>
        <pre className="max-h-72 overflow-auto rounded-md border border-border bg-surface-2 p-4 text-xs">
          {tokensJson || "Loading tokens..."}
        </pre>
      </div>
    </section>
  );
}
