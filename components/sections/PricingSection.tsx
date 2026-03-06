"use client";

import SectionHeader from "@/components/SectionHeader";
import { useMemo, useState } from "react";

const tiers = [
  {
    name: "Starter",
    monthly: 19,
    description: "For individual creators and side projects.",
    features: ["50+ demos", "Design tokens export", "Community presets"]
  },
  {
    name: "Studio",
    monthly: 79,
    highlight: true,
    description: "For product teams building real systems.",
    features: ["Everything in Starter", "Collaboration workspace", "Advanced data viz lab"]
  },
  {
    name: "Enterprise",
    monthly: null,
    description: "For organizations scaling design ops.",
    features: ["Custom integrations", "SSO & audit", "Dedicated support"]
  }
];

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const pricingLabel = useMemo(() => {
    return billing === "annual" ? "Annual (2 months free)" : "Monthly";
  }, [billing]);

  return (
    <section id="pricing" className="space-y-6">
      <SectionHeader title="Pricing" subtitle="Launch-ready plans for teams" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-soft">{pricingLabel}</div>
        <div className="flex gap-2">
          <button
            className={`btn ${billing === "monthly" ? "btn-primary" : ""}`}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>
          <button
            className={`btn ${billing === "annual" ? "btn-primary" : ""}`}
            onClick={() => setBilling("annual")}
          >
            Annual
          </button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => {
          const annualPrice = tier.monthly ? tier.monthly * 10 : null;
          const displayPrice =
            tier.monthly === null
              ? "Let’s talk"
              : billing === "annual"
              ? `$${annualPrice}/yr`
              : `$${tier.monthly}/mo`;

          return (
            <div
              key={tier.name}
              className={`card card-hover card-refract space-y-4 p-6 ${
                tier.highlight
                  ? "pricing-highlight card-prism-border"
                  : tier.name === "Enterprise"
                  ? "card-holo"
                  : "card-glass-luxe"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                {tier.highlight && <span className="pricing-badge">Most popular</span>}
              </div>
              <div>
                <p className="text-soft text-xs">{tier.description}</p>
              </div>
              <div className="text-3xl font-semibold">{displayPrice}</div>
              <ul className="space-y-2 text-xs text-soft">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <button className={`btn ${tier.highlight ? "btn-primary" : ""}`}>
                {tier.highlight ? "Start Studio" : "Choose plan"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
