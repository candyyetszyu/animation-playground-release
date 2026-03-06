# Animation Playground

An interactive design system playground showcasing motion animations, data visualizations, UI components, and design tokens. Explore, customize, and copy production-ready code for your next project.

**[Live Demo →](https://animation-playground-indol.vercel.app/)**

## Features

### Motion Library
42 interactive animation demos with adjustable parameters:
- **Transitions**: Fade, slide, scale, blur
- **Interactive Controls**: Hover, press, toggle, wiggle
- **UI Components**: Accordion, tabs, modal, drawer, tooltip, flip cards
- **List Animations**: Stagger, add/remove items, reorder
- **Loading States**: Skeleton, spinner, shimmer, progress bar
- **Scroll Effects**: Parallax, reveal on scroll
- **Spring Physics**: Bounce, elastic animations
- **Drag Interactions**: Snap-back draggable elements
- **Continuous Loops**: Orbit, marquee, pulse, float, wave, morph
- **Advanced Effects**: Tilt, progress ring, path draw, shimmer border, ripple, glow burst

### Data Visualization
18+ chart types powered by Visx and D3.js:
- Scatter plots, heatmaps, donut charts
- Radar, treemap, stream graphs
- Bump charts, radial bars, box plots
- Violin plots, histograms, candlesticks
- Waterfall, parallel coordinates
- Network graphs, world maps
- Chord diagrams, Sankey diagrams

### Design System
21 organized sections across 8 categories:
- **Product**: Overview, design system index, pricing, CTA
- **Text Effects**: Animated typography, font effects
- **Design System**: Typography, colors, spacing, icons, layout
- **Backgrounds**: Glass, blur, gradients, noise, mesh effects
- **Motion**: Motion library, hover interactions
- **Components**: Button states, form states, accessibility
- **Data Viz**: Charts, dashboard elements, visualization lab
- **Export**: Token export (JSON + CSS variables)

### Interactive Playground
- Adjust animation duration, delay, easing, and spring physics
- Control stagger timing for list animations
- Real-time preview with play/pause/restart
- Copy-to-clipboard code snippets for every demo
- Respects `prefers-reduced-motion` system preference

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) + [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Visualization**: [Visx](https://airbnb.io/visx/) + [D3.js](https://d3js.org/)
- **Performance**: [@tanstack/react-virtual](https://tanstack.com/virtual)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sections Overview

| Category | Sections |
|----------|----------|
| Product | Overview, Design System Index, Pricing, CTA |
| Text Effects | Text Effects, Font Effects |
| Design System | Typography, Colors & Tokens, Spacing, Icons, Layout |
| Backgrounds | Background Effects |
| Motion | Motion Library, Hover + Effects |
| Components | Component States, Form States, Accessibility |
| Data Viz | Charts & Counters, Dashboard Elements, Visualization Lab |
| Export | Token Export |

## Project Structure

```
animation-playground/
├── app/                    # Next.js app router pages
│   ├── page.tsx            # Home page (overview)
│   ├── layout.tsx          # Root layout
│   └── sections/           # Dynamic section routes
├── components/
│   ├── sections/           # Section components (21 sections)
│   ├── visualization/      # Chart components (18+ charts)
│   └── *.tsx               # Shared UI components
├── data/
│   ├── sections.ts         # Section metadata & navigation
│   ├── motionDemos.ts      # Motion demo definitions
│   └── visualizationData.ts # Sample visualization data
├── tokens/
│   └── tokens.ts           # Design token definitions
├── public/
│   └── tokens.json         # Exportable design tokens
└── tailwind.config.ts      # Tailwind configuration
```

## Adding New Content

### Add a Motion Demo

1. Add a new entry to `motionDemos` in `data/motionDemos.ts`
2. Implement the demo component in `components/MotionDemo.tsx`
3. Use tags for searchability (e.g., `transition`, `hover`, `loading`)

### Update Design Tokens

1. Update CSS variables in `app/globals.css`
2. Update `public/tokens.json` for export
3. Adjust token cards in `tokens/tokens.ts`

### Add a New Section

1. Create a new component in `components/sections/`
2. Add metadata to `data/sections.ts` (title, description, tags)
3. Add to `sectionOrder` and `sectionGroups` arrays

## License

[MIT](LICENSE)