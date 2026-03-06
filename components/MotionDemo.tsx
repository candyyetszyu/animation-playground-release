"use client";

import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export type MotionSettings = {
  duration: number;
  delay: number;
  ease: string;
  stiffness: number;
  damping: number;
  mass: number;
  stagger: number;
  repeat: number;
  direction: "normal" | "reverse" | "alternate";
  isPlaying: boolean;
  reducedMotion: boolean;
  restartKey: number;
};

type MotionDemoProps = {
  type: string;
  settings: MotionSettings;
};

export default function MotionDemo({ type, settings }: MotionDemoProps) {
  const transition = useMemo<Transition>(() => {
    if (settings.reducedMotion) {
      return { duration: 0 };
    }
    const repeatType: Transition["repeatType"] =
      settings.direction === "normal" ? "loop" : settings.direction === "alternate" ? "mirror" : "reverse";
    return {
      duration: settings.duration,
      delay: settings.delay,
      ease: settings.ease as any,
      stiffness: settings.stiffness,
      damping: settings.damping,
      mass: settings.mass,
      repeat: settings.repeat,
      repeatType,
      staggerChildren: settings.stagger
    };
  }, [settings]);

  const [toggleOn, setToggleOn] = useState(false);
  const [list, setList] = useState(["A", "B", "C"]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(true);
  const [count, setCount] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!settings.isPlaying) return;
    const target = 128;
    if (settings.reducedMotion) {
      setCount(target);
      return;
    }
    let current = 0;
    const step = Math.max(1, Math.floor(target / 24));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(current);
    }, 30);
    return () => clearInterval(interval);
  }, [settings.isPlaying, settings.reducedMotion, settings.restartKey]);

  const baseBox = "h-14 w-14 rounded-lg bg-primary";
  const mutedBox = "h-10 w-10 rounded-md bg-secondary";

  switch (type) {
    case "fade":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          initial={{ opacity: 0 }}
          animate={{ opacity: settings.isPlaying ? 1 : 0.2 }}
          transition={transition}
        />
      );
    case "slide":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: settings.isPlaying ? 30 : -10, opacity: 1 }}
          transition={transition}
        />
      );
    case "scale":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          initial={{ scale: 0.7 }}
          animate={{ scale: settings.isPlaying ? 1.1 : 0.9 }}
          transition={transition}
        />
      );
    case "blur":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          initial={{ filter: "blur(8px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={transition}
        />
      );
    case "stagger":
      return (
        <motion.div
          key={settings.restartKey}
          className="flex gap-2"
          initial="hidden"
          animate={settings.isPlaying ? "show" : "hidden"}
          variants={{
            show: { transition: { staggerChildren: settings.stagger || 0.1 } },
            hidden: {}
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={index}
              className={mutedBox}
              variants={{
                show: { y: 0, opacity: 1 },
                hidden: { y: 20, opacity: 0 }
              }}
              transition={transition}
            />
          ))}
        </motion.div>
      );
    case "hover":
      return (
        <motion.button
          key={settings.restartKey}
          className="btn"
          whileHover={{ scale: 1.05 }}
          transition={transition}
        >
          Hover me
        </motion.button>
      );
    case "press":
      return (
        <motion.button
          key={settings.restartKey}
          className="btn"
          whileTap={{ scale: 0.92 }}
          transition={transition}
        >
          Press me
        </motion.button>
      );
    case "wiggle":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          animate={{ rotate: settings.isPlaying ? [0, -10, 10, -8, 8, 0] : 0 }}
          transition={transition}
        />
      );
    case "toggle":
      return (
        <div className="flex items-center gap-3">
          <motion.div
            key={`${settings.restartKey}-${toggleOn}`}
            className="h-8 w-14 rounded-full border border-border bg-surface-2 p-1"
            onClick={() => setToggleOn(!toggleOn)}
            role="button"
            tabIndex={0}
          >
            <motion.div
              className="h-6 w-6 rounded-full bg-primary"
              animate={{ x: toggleOn ? 24 : 0 }}
              transition={transition}
            />
          </motion.div>
          <span className="text-sm">{toggleOn ? "On" : "Off"}</span>
        </div>
      );
    case "accordion":
      return (
        <div className="w-full">
          <button
            type="button"
            className="btn w-full text-left"
            onClick={() => setOpenAccordion(!openAccordion)}
          >
            Accordion header
          </button>
          <AnimatePresence>
            {openAccordion && (
              <motion.div
                key="accordion"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={transition}
                className="overflow-hidden rounded-md border border-border bg-surface-2 p-3 text-sm"
              >
                Smooth height + opacity content.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    case "tabs":
      return (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {["Overview", "Specs", "Notes"].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`btn ${activeTab === tab ? "btn-primary" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <motion.div
            key={activeTab}
            className="rounded-md border border-border bg-surface-2 p-3 text-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            {activeTab} content goes here.
          </motion.div>
        </div>
      );
    case "modal":
      return (
        <div>
          <button type="button" className="btn" onClick={() => setOpenModal(true)}>
            Open modal
          </button>
          <AnimatePresence>
            {openModal && (
              <motion.div
                className="fixed inset-0 z-20 flex items-center justify-center bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                onClick={() => setOpenModal(false)}
              >
                <motion.div
                  className="card max-w-xs p-4"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={transition}
                  onClick={(event) => event.stopPropagation()}
                >
                  <p className="text-sm">Modal content with focus fallback.</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    case "drawer":
      return (
        <div>
          <button type="button" className="btn" onClick={() => setOpenDrawer(true)}>
            Open drawer
          </button>
          <AnimatePresence>
            {openDrawer && (
              <motion.div
                className="fixed inset-0 z-20 flex justify-end bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                onClick={() => setOpenDrawer(false)}
              >
                <motion.div
                  className="h-full w-64 bg-surface-1 p-4 shadow-2"
                  initial={{ x: 200 }}
                  animate={{ x: 0 }}
                  exit={{ x: 200 }}
                  transition={transition}
                  onClick={(event) => event.stopPropagation()}
                >
                  Drawer content
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    case "tooltip":
      return (
        <div className="relative">
          <button
            type="button"
            className="btn"
            onMouseEnter={() => setOpenTooltip(true)}
            onMouseLeave={() => setOpenTooltip(false)}
          >
            Hover tooltip
          </button>
          <AnimatePresence>
            {openTooltip && (
              <motion.div
                className="absolute left-1/2 top-10 -translate-x-1/2 rounded-md bg-surface-3 px-3 py-2 text-xs"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={transition}
              >
                Tooltip content
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    case "list-add":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              className="btn"
              onClick={() => setList((prev) => [...prev, String.fromCharCode(65 + prev.length)])}
            >
              Add item
            </button>
            <button type="button" className="btn" onClick={() => setList(["A", "B", "C"])}>
              Reset
            </button>
          </div>
          <motion.ul layout className="flex gap-2">
            <AnimatePresence>
              {list.map((item) => (
                <motion.li
                  key={item}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transition}
                  className="rounded-md bg-surface-2 px-3 py-2 text-sm"
                >
                  {item}
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      );
    case "list-remove":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              className="btn"
              onClick={() => setList((prev) => prev.slice(0, -1))}
            >
              Remove item
            </button>
            <button type="button" className="btn" onClick={() => setList(["A", "B", "C"])}>
              Reset
            </button>
          </div>
          <motion.ul layout className="flex gap-2">
            <AnimatePresence>
              {list.map((item) => (
                <motion.li
                  key={item}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transition}
                  className="rounded-md bg-surface-2 px-3 py-2 text-sm"
                >
                  {item}
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      );
    case "skeleton":
      return (
        <div className="w-full space-y-2">
          <motion.div
            key={settings.restartKey}
            className="h-3 w-full rounded bg-surface-2"
            animate={{ opacity: settings.isPlaying ? [0.4, 1, 0.4] : 0.6 }}
            transition={transition}
          />
          <motion.div
            className="h-3 w-4/5 rounded bg-surface-2"
            animate={{ opacity: settings.isPlaying ? [0.4, 1, 0.4] : 0.6 }}
            transition={transition}
          />
        </div>
      );
    case "spinner":
      return (
        <motion.div
          key={settings.restartKey}
          className="h-10 w-10 rounded-full border-4 border-border border-t-primary"
          animate={{ rotate: settings.isPlaying ? 360 : 0 }}
          transition={{ ...transition, repeat: Infinity, duration: 1 }}
        />
      );
    case "shimmer":
      return (
        <motion.div
          key={settings.restartKey}
          className="relative h-12 w-full overflow-hidden rounded-md bg-surface-2"
        >
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: settings.isPlaying ? ["-100%", "100%"] : "0%" }}
            transition={{ ...transition, repeat: Infinity, duration: 1.6 }}
          />
        </motion.div>
      );
    case "progress":
      return (
        <div className="h-3 w-full rounded-full bg-surface-2">
          <motion.div
            key={settings.restartKey}
            className="h-3 rounded-full bg-primary"
            animate={{ width: settings.isPlaying ? "80%" : "30%" }}
            transition={transition}
          />
        </div>
      );
    case "parallax":
      return (
        <div className="relative h-28 w-full overflow-hidden rounded-lg bg-surface-2">
          <motion.div
            key={settings.restartKey}
            className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/10"
            animate={{ y: settings.isPlaying ? [-6, 6, -6] : 0 }}
            transition={{ ...transition, repeat: Infinity, duration: 2.4 }}
          />
          <motion.div
            className="absolute bottom-4 left-6 h-10 w-28 rounded-lg bg-primary"
            animate={{ y: settings.isPlaying ? [4, -4, 4] : 0 }}
            transition={{ ...transition, repeat: Infinity, duration: 1.6 }}
          />
        </div>
      );
    case "reveal":
      return (
        <motion.div
          key={settings.restartKey}
          className="rounded-md bg-surface-2 px-4 py-3 text-sm"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: settings.isPlaying ? 0 : 12, opacity: 1 }}
          transition={transition}
        >
          Revealed content block
        </motion.div>
      );
    case "bounce":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          initial={{ y: 24 }}
          animate={{ y: settings.isPlaying ? 0 : 12 }}
          transition={{ type: "spring", bounce: 0.4, duration: settings.duration }}
        />
      );
    case "reorder":
      return (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="btn"
            onClick={() =>
              setList((prev) => [...prev].sort(() => Math.random() - 0.5))
            }
          >
            Shuffle
          </button>
          <motion.ul layout className="flex gap-2">
            {list.map((item) => (
              <motion.li
                key={item}
                layout
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="rounded-md bg-surface-2 px-3 py-2 text-sm"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      );
    case "drag-snap":
      return (
        <div className="relative h-20 w-full rounded-md border border-border bg-surface-2">
          <motion.div
            key={settings.restartKey}
            className="absolute left-3 top-3 h-10 w-16 cursor-grab rounded-md bg-primary"
            drag
            dragConstraints={{ left: 0, right: 120, top: 0, bottom: 20 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.05 }}
            transition={transition}
          />
        </div>
      );
    case "orbit":
      return (
        <div className="relative h-24 w-24">
          <motion.div
            key={settings.restartKey}
            className="absolute inset-0 rounded-full border border-border"
            animate={{ rotate: settings.isPlaying ? 360 : 0 }}
            transition={{ ...transition, repeat: Infinity, duration: 2.4, ease: "linear" }}
          >
            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-secondary" />
          </motion.div>
        </div>
      );
    case "count":
      return (
        <div className="text-2xl font-semibold text-primary tabular-nums">
          {count}
        </div>
      );
    case "morph":
      return (
        <motion.div
          key={settings.restartKey}
          className="h-16 w-16 bg-secondary"
          animate={{
            borderRadius: settings.isPlaying ? ["20%", "50%", "12%", "20%"] : "20%"
          }}
          transition={{ ...transition, repeat: Infinity, duration: 2.2 }}
        />
      );
    case "marquee":
      return (
        <div className="relative h-10 w-full overflow-hidden rounded-md bg-surface-2">
          <motion.div
            key={settings.restartKey}
            className="absolute left-0 top-0 flex h-full w-[200%] items-center gap-6 text-sm"
            animate={{ x: settings.isPlaying ? ["0%", "-50%"] : "0%" }}
            transition={{ ...transition, repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <span>Design tokens</span>
            <span>Motion recipes</span>
            <span>Component states</span>
            <span>Design tokens</span>
            <span>Motion recipes</span>
            <span>Component states</span>
          </motion.div>
        </div>
      );
    case "tilt":
      return (
        <motion.div
          key={settings.restartKey}
          className="h-20 w-20 rounded-xl bg-primary"
          whileHover={{ rotateX: 8, rotateY: -10, scale: 1.05 }}
          transition={transition}
          style={{ transformStyle: "preserve-3d", perspective: 600 }}
        />
      );
    case "pulse":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          animate={{
            scale: settings.isPlaying ? [1, 1.12, 1] : 1,
            opacity: settings.isPlaying ? [0.7, 1, 0.7] : 1
          }}
          transition={{ duration: 1.6, repeat: settings.isPlaying ? Infinity : 0, ease: "easeInOut" }}
        />
      );
    case "float":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          animate={{ y: settings.isPlaying ? [-6, 6, -6] : 0 }}
          transition={{ duration: 2.2, repeat: settings.isPlaying ? Infinity : 0, ease: "easeInOut" }}
        />
      );
    case "shake":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          animate={{ x: settings.isPlaying ? [0, -6, 6, -4, 4, 0] : 0 }}
          transition={{ duration: 0.8, repeat: settings.isPlaying ? Infinity : 0, ease: "easeInOut" }}
        />
      );
    case "flip":
      return (
        <div className="flex flex-col items-center gap-2">
          <button type="button" className="btn" onClick={() => setFlipped((value) => !value)}>
            Flip
          </button>
          <div style={{ perspective: 800 }}>
            <motion.div
              className="relative h-20 w-20"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary text-xs text-white"
                style={{ backfaceVisibility: "hidden" }}
              >
                Front
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center rounded-xl bg-secondary text-xs text-white"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
              >
                Back
              </div>
            </motion.div>
          </div>
        </div>
      );
    case "progress-ring": {
      const radius = 22;
      const circumference = 2 * Math.PI * radius;
      const progress = settings.isPlaying ? 0.78 : 0.35;
      return (
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} stroke="var(--color-border)" strokeWidth="6" fill="none" />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke="var(--color-primary)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * (1 - progress) }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: "40px 40px", transform: "rotate(-90deg)" }}
          />
        </svg>
      );
    }
    case "path-draw":
      return (
        <svg width="140" height="80" viewBox="0 0 140 80">
          <motion.path
            d="M10 60 C 35 20, 65 20, 90 55 S 130 75, 130 30"
            stroke="var(--color-secondary)"
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: settings.isPlaying ? 1 : 0.3 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </svg>
      );
    case "skew":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          whileHover={{ skewX: -12 }}
          transition={transition}
        />
      );
    case "shimmer-border":
      return (
        <div className="relative rounded-lg p-[2px] bg-gradient-to-r from-primary via-secondary to-primary">
          <div className="rounded-lg bg-surface-2 px-4 py-2 text-sm">Content</div>
        </div>
      );
    case "ripple":
      return (
        <motion.button
          key={settings.restartKey}
          className="relative overflow-hidden rounded-lg bg-primary px-4 py-2 text-sm text-white"
          whileTap={{ scale: 0.95 }}
          transition={transition}
        >
          Click me
        </motion.button>
      );
    case "glow-burst":
      return (
        <motion.div
          key={settings.restartKey}
          className={`${baseBox} ${settings.isPlaying ? "shadow-[0_0_30px_rgba(59,130,246,0.7)]" : ""}`}
          animate={{
            boxShadow: settings.isPlaying
              ? ["0 0 0 rgba(59,130,246,0)", "0 0 30px rgba(59,130,246,0.7)", "0 0 0 rgba(59,130,246,0)"]
              : "none"
          }}
          transition={{ duration: 1.2, repeat: settings.isPlaying ? Infinity : 0 }}
        />
      );
    case "elastic":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          initial={{ scale: 0.5 }}
          animate={{ scale: settings.isPlaying ? 1 : 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 8 }}
        />
      );
    case "wave":
      return (
        <motion.div
          key={settings.restartKey}
          className={baseBox}
          animate={{
            y: settings.isPlaying ? [0, -8, 0] : 0,
            x: settings.isPlaying ? [0, 4, 0] : 0
          }}
          transition={{ duration: 1.5, repeat: settings.isPlaying ? Infinity : 0, ease: "easeInOut" }}
        />
      );
    default:
      return <div className="text-sm text-muted">Demo not found.</div>;
  }
}
