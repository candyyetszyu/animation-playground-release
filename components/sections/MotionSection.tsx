import SectionHeader from "@/components/SectionHeader";
import DemoCard from "@/components/DemoCard";
import { motionDemos } from "@/data/motionDemos";
import type { MotionSettings } from "@/components/MotionDemo";

type MotionSectionProps = {
  duration: number;
  delay: number;
  ease: string;
  stiffness: number;
  damping: number;
  mass: number;
  stagger: number;
  repeat: number;
  direction: "normal" | "reverse" | "alternate";
  search: string;
  isPlaying: boolean;
  onDurationChange: (value: number) => void;
  onDelayChange: (value: number) => void;
  onEaseChange: (value: string) => void;
  onStiffnessChange: (value: number) => void;
  onDampingChange: (value: number) => void;
  onMassChange: (value: number) => void;
  onStaggerChange: (value: number) => void;
  onRepeatChange: (value: number) => void;
  onDirectionChange: (value: "normal" | "reverse" | "alternate") => void;
  onSearchChange: (value: string) => void;
  onTogglePlay: () => void;
  onRestart: () => void;
  settings: MotionSettings;
  filteredDemos: typeof motionDemos;
};

export default function MotionSection({
  duration,
  delay,
  ease,
  stiffness,
  damping,
  mass,
  stagger,
  repeat,
  direction,
  search,
  isPlaying,
  onDurationChange,
  onDelayChange,
  onEaseChange,
  onStiffnessChange,
  onDampingChange,
  onMassChange,
  onStaggerChange,
  onRepeatChange,
  onDirectionChange,
  onSearchChange,
  onTogglePlay,
  onRestart,
  settings,
  filteredDemos
}: MotionSectionProps) {
  return (
    <section id="motion" className="space-y-6">
      <SectionHeader title="Motion Library" subtitle={`${filteredDemos.length} demos`} />
      <div className="card card-hover card-aurora-border card-refract grid gap-4 p-6 lg:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          Duration ({duration}s)
          <input
            type="range"
            min={0.1}
            max={1.5}
            step={0.05}
            value={duration}
            onChange={(event) => onDurationChange(Number(event.target.value))}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Delay ({delay}s)
          <input
            type="range"
            min={0}
            max={0.6}
            step={0.05}
            value={delay}
            onChange={(event) => onDelayChange(Number(event.target.value))}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Stagger ({stagger}s)
          <input
            type="range"
            min={0}
            max={0.3}
            step={0.02}
            value={stagger}
            onChange={(event) => onStaggerChange(Number(event.target.value))}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Repeat ({repeat})
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={repeat}
            onChange={(event) => onRepeatChange(Number(event.target.value))}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Stiffness ({stiffness})
          <input
            type="range"
            min={80}
            max={400}
            step={10}
            value={stiffness}
            onChange={(event) => onStiffnessChange(Number(event.target.value))}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Damping ({damping})
          <input
            type="range"
            min={10}
            max={40}
            step={2}
            value={damping}
            onChange={(event) => onDampingChange(Number(event.target.value))}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Mass ({mass})
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={mass}
            onChange={(event) => onMassChange(Number(event.target.value))}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Ease
          <select className="control-input" value={ease} onChange={(event) => onEaseChange(event.target.value)}>
            <option value="easeInOut">easeInOut</option>
            <option value="easeOut">easeOut</option>
            <option value="easeIn">easeIn</option>
            <option value="linear">linear</option>
            <option value="circOut">circOut</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Direction
          <select
            className="control-input"
            value={direction}
            onChange={(event) => onDirectionChange(event.target.value as "normal" | "reverse" | "alternate")}
          >
            <option value="normal">normal</option>
            <option value="reverse">reverse</option>
            <option value="alternate">alternate</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Search demos
          <input
            className="control-input"
            placeholder="fade, hover, loading..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn" onClick={onTogglePlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button type="button" className="btn" onClick={onRestart}>
            Restart
          </button>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-2">
        {filteredDemos.map((demo) => (
          <DemoCard key={demo.type} {...demo} settings={settings} />
        ))}
      </div>
    </section>
  );
}
