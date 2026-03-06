"use client";

import SectionHeader from "@/components/SectionHeader";
import { useMemo, useState } from "react";

export default function FormsSection() {
  const [formState, setFormState] = useState<"default" | "error" | "success">("default");
  const [disabled, setDisabled] = useState(false);
  const [toggleOn, setToggleOn] = useState(true);
  const [sliderValue, setSliderValue] = useState(48);
  const [notes, setNotes] = useState("Add optional context for reviewers.");

  const inputClass = useMemo(() => {
    if (formState === "error") return "control-input w-full border-danger";
    if (formState === "success") return "control-input w-full border-success";
    return "control-input w-full";
  }, [formState]);

  const helperText = useMemo(() => {
    if (formState === "error") return "This field needs attention.";
    if (formState === "success") return "Looks good!";
    return "We’ll never share your email.";
  }, [formState]);

  const helperClass = useMemo(() => {
    if (formState === "error") return "text-danger";
    if (formState === "success") return "text-success";
    return "text-muted";
  }, [formState]);

  return (
    <section id="forms" className="space-y-6">
      <SectionHeader title="Form States" subtitle="Validation + helper text" />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card card-hover card-glass-luxe card-refract space-y-3 p-6">
            <label className="text-sm font-medium">Email</label>
            <input className={inputClass} placeholder="you@domain.com" disabled={disabled} />
            <p className={`text-xs ${helperClass}`}>{helperText}</p>
          </div>
          <div className="card card-hover card-prism-border card-refract space-y-3 p-6">
            <label className="text-sm font-medium">Password</label>
            <input className={inputClass} placeholder="••••••••" disabled={disabled} />
            <p className={`text-xs ${helperClass}`}>{helperText}</p>
          </div>
          <div className="card card-hover card-holo card-refract space-y-3 p-6">
            <label className="text-sm font-medium">Username</label>
            <input className={inputClass} placeholder="confirmed" disabled={disabled} />
            <p className={`text-xs ${helperClass}`}>{helperText}</p>
          </div>
          <div className="card card-hover card-streak card-refract space-y-3 p-6">
            <label className="text-sm font-medium">Select</label>
            <select className={inputClass} disabled={disabled}>
              <option>Option A</option>
              <option>Option B</option>
            </select>
            <p className={`text-xs ${helperClass}`}>{helperText}</p>
          </div>
          <div className="card card-hover card-volumetric card-refract space-y-3 p-6">
            <label className="text-sm font-medium">Textarea</label>
            <textarea
              className={`${inputClass} min-h-[120px]`}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              disabled={disabled}
            />
            <p className={`text-xs ${helperClass}`}>{helperText}</p>
          </div>
          <div className="card card-hover card-aurora-border card-refract space-y-3 p-6">
            <label className="text-sm font-medium">Controls</label>
            <div className="flex items-center justify-between rounded-md border border-border bg-surface-2 p-3">
              <span className="text-xs text-muted">Enable alerts</span>
              <button
                type="button"
                className={`h-6 w-12 rounded-full border border-border p-1 ${
                  toggleOn ? "bg-primary/40" : "bg-surface-3"
                }`}
                onClick={() => setToggleOn((prev) => !prev)}
              >
                <span
                  className="block h-4 w-4 rounded-full bg-white transition"
                  style={{ transform: toggleOn ? "translateX(20px)" : "translateX(0px)" }}
                />
              </button>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-muted">Confidence ({sliderValue}%)</div>
              <input
                type="range"
                min={20}
                max={100}
                step={1}
                value={sliderValue}
                onChange={(event) => setSliderValue(Number(event.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">Validation controls</h3>
          <label className="flex flex-col gap-2 text-sm">
            Field state
            <select
              className="control-input"
              value={formState}
              onChange={(event) =>
                setFormState(event.target.value as "default" | "error" | "success")
              }
            >
              <option value="default">Default</option>
              <option value="error">Error</option>
              <option value="success">Success</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
            />
            Disable inputs
          </label>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            Toggle validation modes to preview helper text and border treatment.
          </div>
        </div>
      </div>
    </section>
  );
}
