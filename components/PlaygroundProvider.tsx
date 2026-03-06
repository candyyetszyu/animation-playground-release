"use client";

import { demoText } from "@/tokens/tokens";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Density = "comfortable" | "compact";
export type Brand = "studio" | "figma" | "linear" | "arc" | "framer";
export type FontChoice =
  | "inter"
  | "manrope"
  | "space"
  | "sora"
  | "jakarta"
  | "dm-sans"
  | "outfit"
  | "plex"
  | "playfair"
  | "jetbrains";

type PlaygroundContextValue = {
  theme: "light" | "dark";
  density: Density;
  brand: Brand;
  reducedMotion: boolean;
  baseline: boolean;
  setTheme: (value: "light" | "dark") => void;
  setDensity: (value: Density) => void;
  setBrand: (value: Brand) => void;
  setReducedMotion: (value: boolean) => void;
  setBaseline: (value: boolean) => void;
  search: string;
  setSearch: (value: string) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  restartKey: number;
  restart: () => void;
  tokensJson: string;
  typeSize: number;
  setTypeSize: (value: number) => void;
  lineHeight: number;
  setLineHeight: (value: number) => void;
  tracking: number;
  setTracking: (value: number) => void;
  maxWidth: number;
  setMaxWidth: (value: number) => void;
  fontFamily: FontChoice;
  setFontFamily: (value: FontChoice) => void;
  previewText: string;
  setPreviewText: (value: string) => void;
  duration: number;
  setDuration: (value: number) => void;
  delay: number;
  setDelay: (value: number) => void;
  ease: string;
  setEase: (value: string) => void;
  stiffness: number;
  setStiffness: (value: number) => void;
  damping: number;
  setDamping: (value: number) => void;
  mass: number;
  setMass: (value: number) => void;
  stagger: number;
  setStagger: (value: number) => void;
  repeat: number;
  setRepeat: (value: number) => void;
  direction: "normal" | "reverse" | "alternate";
  setDirection: (value: "normal" | "reverse" | "alternate") => void;
};

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export function PlaygroundProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [density, setDensity] = useState<Density>("comfortable");
  const [brand, setBrand] = useState<Brand>("studio");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [baseline, setBaseline] = useState(false);
  const [search, setSearch] = useState("");
  const [restartKey, setRestartKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [tokensJson, setTokensJson] = useState("");

  const [typeSize, setTypeSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [tracking, setTracking] = useState(0);
  const [maxWidth, setMaxWidth] = useState(48);
  const [fontFamily, setFontFamily] = useState<FontChoice>("inter");
  const [previewText, setPreviewText] = useState(demoText);

  const [duration, setDuration] = useState(0.5);
  const [delay, setDelay] = useState(0);
  const [ease, setEase] = useState("easeInOut");
  const [stiffness, setStiffness] = useState(180);
  const [damping, setDamping] = useState(22);
  const [mass, setMass] = useState(1);
  const [stagger, setStagger] = useState(0.08);
  const [repeat, setRepeat] = useState(0);
  const [direction, setDirection] = useState<"normal" | "reverse" | "alternate">("normal");

  useEffect(() => {
    // Detect user's OS preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReducedMotion);

    // Safely parse localStorage
    try {
      const stored = localStorage.getItem("playground-settings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setTheme(parsed.theme ?? "dark");
          setDensity(parsed.density ?? "comfortable");
          setBrand(parsed.brand ?? "studio");
          setReducedMotion(parsed.reducedMotion ?? prefersReducedMotion);
          setBaseline(parsed.baseline ?? false);
          setFontFamily(parsed.fontFamily ?? "inter");
        }
      }
    } catch (error) {
      console.warn("Failed to parse stored settings, using defaults:", error);
      localStorage.removeItem("playground-settings");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "playground-settings",
      JSON.stringify({ theme, density, brand, reducedMotion, baseline, fontFamily })
    );
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-brand", brand);
    document.body.classList.toggle("baseline-grid", baseline);
  }, [theme, density, brand, reducedMotion, baseline, fontFamily]);

  useEffect(() => {
    fetch("/tokens.json")
      .then((response) => response.text())
      .then((data) => setTokensJson(data))
      .catch(() => setTokensJson(""));
  }, []);

  const value = useMemo<PlaygroundContextValue>(
    () => ({
      theme,
      density,
      brand,
      reducedMotion,
      baseline,
      setTheme,
      setDensity,
      setBrand,
      setReducedMotion,
      setBaseline,
      search,
      setSearch,
      isPlaying,
      setIsPlaying,
      restartKey,
      restart: () => setRestartKey((value) => value + 1),
      tokensJson,
      typeSize,
      setTypeSize,
      lineHeight,
      setLineHeight,
      tracking,
      setTracking,
      maxWidth,
      setMaxWidth,
      fontFamily,
      setFontFamily,
      previewText,
      setPreviewText,
      duration,
      setDuration,
      delay,
      setDelay,
      ease,
      setEase,
      stiffness,
      setStiffness,
      damping,
      setDamping,
      mass,
      setMass,
      stagger,
      setStagger,
      repeat,
      setRepeat,
      direction,
      setDirection
    }),
    [
      theme,
      density,
      brand,
      reducedMotion,
      baseline,
      search,
      isPlaying,
      restartKey,
      tokensJson,
      typeSize,
      lineHeight,
      tracking,
      maxWidth,
      fontFamily,
      previewText,
      duration,
      delay,
      ease,
      stiffness,
      damping,
      mass,
      stagger,
      repeat,
      direction
    ]
  );

  return <PlaygroundContext.Provider value={value}>{children}</PlaygroundContext.Provider>;
}

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (!context) {
    throw new Error("usePlayground must be used within PlaygroundProvider");
  }
  return context;
}
