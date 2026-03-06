import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

const systemCards = [
  { title: "Text Effects", desc: "Typewriter, gradients, motion text.", href: "/sections/text-effects" },
  { title: "Font Effects", desc: "Hero-ready cinematic typography.", href: "/sections/font-effects" },
  { title: "Typography", desc: "Scale, font pairs, editorial rhythm.", href: "/sections/typography" },
  { title: "Colors & Tokens", desc: "Semantic palette and theme variants.", href: "/sections/colors" },
  { title: "Spacing", desc: "Adaptive spacing scale and grids.", href: "/sections/spacing" },
  { title: "Icons", desc: "Consistent iconography system.", href: "/sections/icons" },
  { title: "Layout", desc: "Responsive layout templates.", href: "/sections/layout" },
  { title: "Components", desc: "Buttons, inputs, and states.", href: "/sections/components" },
  { title: "Motion", desc: "Transitions and micro-interactions.", href: "/sections/motion" },
  { title: "Data Viz", desc: "Charts and analytic patterns.", href: "/sections/visualization" }
];

export default function DesignSystemOverviewSection() {
  return (
    <section id="design-system" className="space-y-6">
      <SectionHeader title="Design System Index" subtitle="Foundations and patterns at a glance" />
      <div className="grid gap-6 lg:grid-cols-4 sm:grid-cols-2">
        {systemCards.map((card, index) => (
          <Link
            key={card.title}
            href={card.href}
            className={`card card-hover card-refract space-y-3 p-5 ${
              index % 3 === 0
                ? "card-prism-border"
                : index % 3 === 1
                ? "card-holo"
                : "card-glass-luxe"
            }`}
          >
            <div className="text-sm font-semibold">{card.title}</div>
            <p className="text-xs text-soft">{card.desc}</p>
            <span className="text-xs text-primary">Explore →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
