export const motionDemos = [
  {
    type: "fade",
    name: "Fade In",
    description: "Opacity transition for entrances.",
    tags: ["transition", "opacity"],
    snippet: `motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}`
  },
  {
    type: "slide",
    name: "Slide",
    description: "Horizontal slide with fade.",
    tags: ["transition", "slide"],
    snippet: `motion.div initial={{ x: -30 }} animate={{ x: 0 }}`
  },
  {
    type: "scale",
    name: "Scale Up",
    description: "Scale emphasis for focus.",
    tags: ["transition", "scale"],
    snippet: `motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}`
  },
  {
    type: "blur",
    name: "Blur In",
    description: "Blur-to-sharp transition.",
    tags: ["transition", "blur"],
    snippet: `motion.div initial={{ filter: "blur(8px)" }} animate={{ filter: "blur(0px)" }}`
  },
  {
    type: "stagger",
    name: "Staggered List",
    description: "Child elements stagger in.",
    tags: ["list", "stagger"],
    snippet: `transition={{ staggerChildren: 0.1 }}`
  },
  {
    type: "hover",
    name: "Button Hover",
    description: "Hover scale micro-interaction.",
    tags: ["hover", "button"],
    snippet: `whileHover={{ scale: 1.05 }}`
  },
  {
    type: "press",
    name: "Button Press",
    description: "Tap scale feedback.",
    tags: ["press", "button"],
    snippet: `whileTap={{ scale: 0.92 }}`
  },
  {
    type: "wiggle",
    name: "Icon Wiggle",
    description: "Playful wiggle keyframes.",
    tags: ["icon", "attention"],
    snippet: `animate={{ rotate: [0, -10, 10, 0] }}`
  },
  {
    type: "toggle",
    name: "Toggle Switch",
    description: "Animated thumb movement.",
    tags: ["toggle", "micro"],
    snippet: `animate={{ x: isOn ? 24 : 0 }}`
  },
  {
    type: "accordion",
    name: "Accordion",
    description: "Height + opacity expansion.",
    tags: ["layout", "content"],
    snippet: `animate={{ height: "auto", opacity: 1 }}`
  },
  {
    type: "tabs",
    name: "Tabs",
    description: "Content swap transition.",
    tags: ["tabs", "content"],
    snippet: `key={activeTab} initial={{ y: 8 }} animate={{ y: 0 }}`
  },
  {
    type: "modal",
    name: "Modal",
    description: "Backdrop + scale in.",
    tags: ["overlay", "modal"],
    snippet: `AnimatePresence with backdrop + dialog`
  },
  {
    type: "drawer",
    name: "Drawer",
    description: "Slide from the right.",
    tags: ["overlay", "drawer"],
    snippet: `initial={{ x: 200 }} animate={{ x: 0 }}`
  },
  {
    type: "tooltip",
    name: "Tooltip",
    description: "Hover label.",
    tags: ["tooltip", "hover"],
    snippet: `initial={{ y: -6, opacity: 0 }}`
  },
  {
    type: "list-add",
    name: "List Add",
    description: "Animate new items.",
    tags: ["list", "add"],
    snippet: `layout + AnimatePresence for list items`
  },
  {
    type: "list-remove",
    name: "List Remove",
    description: "Animate removal.",
    tags: ["list", "remove"],
    snippet: `exit={{ opacity: 0, y: -10 }}`
  },
  {
    type: "skeleton",
    name: "Skeleton",
    description: "Pulse loading.",
    tags: ["loading", "skeleton"],
    snippet: `animate={{ opacity: [0.4, 1, 0.4] }}`
  },
  {
    type: "spinner",
    name: "Spinner",
    description: "Infinite rotation.",
    tags: ["loading", "spinner"],
    snippet: `animate={{ rotate: 360 }}`
  },
  {
    type: "shimmer",
    name: "Shimmer",
    description: "Shimmer loading state.",
    tags: ["loading", "shimmer"],
    snippet: `bg-gradient-to-r shimmer layer`
  },
  {
    type: "progress",
    name: "Progress",
    description: "Animated progress bar.",
    tags: ["loading", "progress"],
    snippet: `animate={{ width: "80%" }}`
  },
  {
    type: "parallax",
    name: "Parallax Layer",
    description: "Depth with layered motion.",
    tags: ["scroll", "parallax"],
    snippet: `animate={{ y: [0, -12, 0] }}`
  },
  {
    type: "reveal",
    name: "Reveal on Scroll",
    description: "Simulated scroll reveal.",
    tags: ["scroll", "reveal"],
    snippet: `initial={{ y: 24, opacity: 0 }}`
  },
  {
    type: "bounce",
    name: "Bounce",
    description: "Spring bounce entrance.",
    tags: ["spring", "bounce"],
    snippet: `transition={{ type: "spring", bounce: 0.4 }}`
  },
  {
    type: "reorder",
    name: "Spring Reorder",
    description: "Shuffle list with layout spring.",
    tags: ["layout", "reorder"],
    snippet: `layout + shuffle on click`
  },
  {
    type: "drag-snap",
    name: "Drag + Snap",
    description: "Draggable element that snaps back.",
    tags: ["drag", "snap"],
    snippet: `drag dragElastic={0.2}`
  },
  {
    type: "orbit",
    name: "Orbit",
    description: "Radial orbit loop.",
    tags: ["loop", "orbit"],
    snippet: `animate={{ rotate: 360 }}`
  },
  {
    type: "count",
    name: "Count Up",
    description: "Animated numeric counter.",
    tags: ["number", "value"],
    snippet: `useEffect + animate number`
  },
  {
    type: "morph",
    name: "Morph Shape",
    description: "Border radius morphing.",
    tags: ["shape", "morph"],
    snippet: `animate={{ borderRadius: ["20%", "50%"] }}`
  },
  {
    type: "marquee",
    name: "Marquee",
    description: "Infinite text loop.",
    tags: ["loop", "marquee"],
    snippet: `animate={{ x: ["0%", "-50%"] }}`
  },
  {
    type: "tilt",
    name: "3D Tilt",
    description: "Pointer-driven tilt.",
    tags: ["3d", "hover"],
    snippet: `whileHover={{ rotateX, rotateY }}`
  },
  {
    type: "pulse",
    name: "Pulse",
    description: "Looping pulse highlight.",
    tags: ["loop", "attention"],
    snippet: `animate={{ scale: [1, 1.08, 1] }}`
  },
  {
    type: "float",
    name: "Float",
    description: "Gentle floating motion.",
    tags: ["loop", "float"],
    snippet: `animate={{ y: [-6, 6, -6] }}`
  },
  {
    type: "shake",
    name: "Shake",
    description: "Quick attention shake.",
    tags: ["attention", "shake"],
    snippet: `animate={{ x: [0, -6, 6, 0] }}`
  },
  {
    type: "flip",
    name: "Flip Card",
    description: "3D flip between two faces.",
    tags: ["card", "3d"],
    snippet: `animate={{ rotateY: flipped ? 180 : 0 }}`
  },
  {
    type: "progress-ring",
    name: "Progress Ring",
    description: "Circular progress animation.",
    tags: ["progress", "ring"],
    snippet: `strokeDashoffset animated`
  },
  {
    type: "path-draw",
    name: "Path Draw",
    description: "Stroke path drawing.",
    tags: ["svg", "path"],
    snippet: `motion.path pathLength`
  },
  {
    type: "skew",
    name: "Skew Hover",
    description: "Directional skew on hover.",
    tags: ["hover", "transform", "skew"],
    snippet: `whileHover={{ skewX: -12 }}`
  },
  {
    type: "shimmer-border",
    name: "Shimmer Border",
    description: "Animated gradient border.",
    tags: ["border", "gradient", "shimmer"],
    snippet: `animated gradient border with background-clip`
  },
  {
    type: "ripple",
    name: "Ripple",
    description: "Material ripple effect.",
    tags: ["button", "ripple", "material"],
    snippet: `onClick creates expanding circle`
  },
  {
    type: "glow-burst",
    name: "Glow Burst",
    description: "Radial glow burst on hover.",
    tags: ["hover", "glow", "burst"],
    snippet: `box-shadow expansion animation`
  },
  {
    type: "elastic",
    name: "Elastic Scale",
    description: "Spring elastic bounce scale.",
    tags: ["spring", "elastic", "scale"],
    snippet: `transition={{ type: "spring", stiffness: 400, damping: 8 }}`
  },
  {
    type: "wave",
    name: "Wave",
    description: "Continuous wave motion.",
    tags: ["loop", "wave", "motion"],
    snippet: `animate={{ y: [0, -8, 0], x: [0, 4, 0] }}`
  }
];
