"use client";

import SectionHeader from "@/components/SectionHeader";
import { useEffect, useMemo, useState } from "react";

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

function useTypewriter(text: string, speed = 60) {
  const [display, setDisplay] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplay("");
    const interval = setInterval(() => {
      index += 1;
      setDisplay(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return { display, showCursor };
}

function useScramble(target: string) {
  const [output, setOutput] = useState(target);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      const next = target
        .split("")
        .map((char, index) => {
          if (index < progress) return char;
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join("");
      setOutput(next);
      if (progress >= target.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
    }, 35);
  };

  return { output, scramble, isScrambling };
}

export default function TextEffectsSection() {
  const typewriterText = "Text appears letter by letter with a blinking cursor.";
  const scrambleTarget = "Random characters resolve into readable text.";
  const { display, showCursor } = useTypewriter(typewriterText);
  const { output, scramble, isScrambling } = useScramble(scrambleTarget);
  const gradientWords = useMemo(() => ["GRADIENT", "SPECTRUM", "AURORA"], []);
  const [wordIndex, setWordIndex] = useState(0);
  const [glitchActive, setGlitchActive] = useState(true);
  const [highlightActive, setHighlightActive] = useState(true);
  const [underlineActive, setUnderlineActive] = useState(true);
  const [blurRevealActive, setBlurRevealActive] = useState(true);
  const [waveActive, setWaveActive] = useState(true);
  const [elasticActive, setElasticActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((index) => (index + 1) % gradientWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [gradientWords.length]);

  return (
    <section id="text-effects" className="space-y-6">
      <SectionHeader title="Text Effects" subtitle="Type + animated text" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Typewriter</h3>
          <p className="text-sm text-muted">Text appears like live typing.</p>
          <div className="rounded-md border border-border bg-surface-2 p-4 font-mono text-sm">
            <span>{display}</span>
            <span className="ml-1 inline-block w-2">
              {showCursor ? "|" : " "}
            </span>
          </div>
        </div>

        <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Text Scramble</h3>
          <p className="text-sm text-muted">Movie-style decoding effect.</p>
          <div className="rounded-md border border-border bg-surface-2 p-4 font-mono text-sm">
            {output}
          </div>
          <button className="btn" onClick={scramble} disabled={isScrambling}>
            {isScrambling ? "Scrambling..." : "Scramble"}
          </button>
        </div>

        <div className="card card-hover card-holo card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Animated Gradient</h3>
          <p className="text-sm text-muted">Shifting color across text.</p>
          <div className="flex h-24 items-center justify-center rounded-md bg-surface-2">
            <span className="text-gradient-animated text-4xl font-semibold tracking-wide">
              {gradientWords[wordIndex]}
            </span>
          </div>
        </div>

        <div className="card card-hover card-streak card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Outline / Stroke</h3>
          <p className="text-sm text-muted">Hollow text that fills on hover.</p>
          <div className="flex h-24 items-center justify-center rounded-md bg-surface-2">
            <span className="text-outline text-4xl font-semibold tracking-wide">OUTLINE</span>
          </div>
        </div>

        <div className="card card-hover card-volumetric card-refract space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Glitch</h3>
            <button className="btn" onClick={() => setGlitchActive((prev) => !prev)}>
              {glitchActive ? "Pause" : "Play"}
            </button>
          </div>
          <p className="text-sm text-muted">Digital distortion for tech/cyber UI.</p>
          <div className="flex h-24 items-center justify-center rounded-md bg-surface-2">
            <span className={`text-4xl font-semibold tracking-wide ${glitchActive ? "text-glitch" : ""}`}>
              GLITCH
            </span>
          </div>
        </div>

        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Highlight sweep</h3>
            <button className="btn" onClick={() => setHighlightActive((prev) => !prev)}>
              {highlightActive ? "Pause" : "Play"}
            </button>
          </div>
          <p className="text-sm text-muted">Animated highlight for hero keywords.</p>
          <div className="flex h-24 items-center justify-center rounded-md bg-surface-2">
            <span className={`text-3xl font-semibold ${highlightActive ? "text-highlight-scan" : ""}`}>
              HIGHLIGHT
            </span>
          </div>
        </div>

        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Kinetic underline</h3>
            <button className="btn" onClick={() => setUnderlineActive((prev) => !prev)}>
              {underlineActive ? "Pause" : "Play"}
            </button>
          </div>
          <p className="text-sm text-muted">Animated underline for key phrases.</p>
          <div className="flex h-24 items-center justify-center rounded-md bg-surface-2">
            <span className={`text-3xl font-semibold ${underlineActive ? "text-underline-sweep" : ""}`}>
              UNDERLINE
            </span>
          </div>
        </div>

        <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Shadow stack</h3>
          <p className="text-sm text-muted">Layered shadows for dramatic headlines.</p>
          <div className="flex h-24 items-center justify-center rounded-md bg-surface-2">
            <span className="text-3xl font-semibold text-shadow-stack">STACKED</span>
          </div>
        </div>

        <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Blur Reveal</h3>
            <button className="btn" onClick={() => setBlurRevealActive((prev) => !prev)}>
              {blurRevealActive ? "Pause" : "Play"}
            </button>
          </div>
          <p className="text-sm text-muted">Text blurs in from behind a foggy layer.</p>
          <div className="flex h-24 items-center justify-center rounded-md bg-surface-2 overflow-hidden">
            <span className={`text-3xl font-semibold ${blurRevealActive ? "animate-blur-reveal" : "blur-md"}`}>
              REVEAL
            </span>
          </div>
        </div>

        <div className="card card-hover card-holo card-refract space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Wave</h3>
            <button className="btn" onClick={() => setWaveActive((prev) => !prev)}>
              {waveActive ? "Pause" : "Play"}
            </button>
          </div>
          <p className="text-sm text-muted">Letter-by-letter wave motion.</p>
          <div className="flex h-24 items-center justify-center rounded-md bg-surface-2">
            <span className="text-2xl font-semibold tracking-wider">
              {"WAVE".split("").map((char, i) => (
                <span
                  key={i}
                  className={`inline-block ${waveActive ? "animate-text-wave" : ""}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="card card-hover card-streak card-refract space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Elastic</h3>
            <button className="btn" onClick={() => setElasticActive((prev) => !prev)}>
              {elasticActive ? "Pause" : "Play"}
            </button>
          </div>
          <p className="text-sm text-muted">Bouncy spring entrance.</p>
          <div className="flex h-24 items-center justify-center rounded-md bg-surface-2">
            <span className={`text-3xl font-semibold ${elasticActive ? "animate-elastic" : ""}`}>
              ELASTIC
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
