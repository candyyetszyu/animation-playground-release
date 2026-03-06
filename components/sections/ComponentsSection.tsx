"use client";

import SectionHeader from "@/components/SectionHeader";
import { useMemo, useState } from "react";

export default function ComponentsSection() {
  const [buttonVariant, setButtonVariant] = useState<"primary" | "secondary" | "ghost">("primary");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [inputState, setInputState] = useState<"default" | "error" | "success">("default");
  const [toastType, setToastType] = useState<"success" | "warn" | "danger">("success");
  const [activeTab, setActiveTab] = useState("Overview");
  const [segment, setSegment] = useState("Month");

  const buttonClass = useMemo(() => {
    if (buttonVariant === "primary") return "btn btn-primary";
    if (buttonVariant === "ghost") return "btn btn-ghost";
    return "btn";
  }, [buttonVariant]);

  const inputClass = useMemo(() => {
    if (inputState === "error") return "control-input w-full border-danger";
    if (inputState === "success") return "control-input w-full border-success";
    return "control-input w-full";
  }, [inputState]);

  const toastClass = useMemo(() => {
    if (toastType === "warn") return "border-warn text-warn";
    if (toastType === "danger") return "border-danger text-danger";
    return "border-success text-success";
  }, [toastType]);

  return (
    <section id="components" className="space-y-6">
      <SectionHeader title="Components + States" subtitle="Buttons, inputs, cards" />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card card-hover card-prism-border card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <button className={buttonClass} disabled={buttonDisabled}>
                {buttonLoading ? "Loading..." : "Primary CTA"}
              </button>
              <button className="btn">Secondary</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn" disabled>
                Disabled
              </button>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-muted">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={buttonLoading}
                  onChange={(event) => setButtonLoading(event.target.checked)}
                />
                Loading
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={buttonDisabled}
                  onChange={(event) => setButtonDisabled(event.target.checked)}
                />
                Disabled
              </label>
            </div>
          </div>
          <div className="card card-hover card-glass-luxe card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Inputs</h3>
            <div className="space-y-3">
              <input className={inputClass} placeholder="Input state preview" />
              <select className="control-input w-full">
                <option>Dropdown</option>
                <option>Option two</option>
              </select>
              <p className="text-xs text-muted">State: {inputState}</p>
            </div>
          </div>
          <div className="card card-hover card-holo card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Cards + Toasts</h3>
            <div className="space-y-3">
              <div className="rounded-md border border-border bg-surface-2 p-4">
                <p className="text-sm font-medium">Card title</p>
                <p className="text-xs text-muted">Card body text to show elevation.</p>
              </div>
              <div className={`rounded-md border bg-surface-2 p-3 text-sm ${toastClass}`}>
                {toastType === "success" && "Success toast: saved."}
                {toastType === "warn" && "Warning toast: review needed."}
                {toastType === "danger" && "Error toast: failed."}
              </div>
            </div>
          </div>
          <div className="card card-hover card-streak card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Checkboxes + Radios</h3>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Checked
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Unchecked
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="radio" defaultChecked />
                Radio on
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="radio" />
                Radio off
              </label>
            </div>
          </div>

          <div className="card card-hover card-volumetric card-refract space-y-4 p-6">
            <h3 className="text-base font-semibold">Tabs + Segments</h3>
            <div className="flex flex-wrap gap-2">
              {["Overview", "Activity", "Settings"].map((tab) => (
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
            <div className="rounded-md border border-border bg-surface-2 p-3 text-xs text-muted">
              {activeTab} content preview.
            </div>
            <div className="flex gap-2 rounded-full border border-border bg-surface-2 p-1">
              {["Day", "Week", "Month"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`px-3 py-1 text-xs rounded-full ${
                    segment === item ? "bg-primary text-white" : "text-muted"
                  }`}
                  onClick={() => setSegment(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card card-hover card-aurora-border card-refract space-y-4 p-6">
          <h3 className="text-base font-semibold">State controls</h3>
          <label className="flex flex-col gap-2 text-sm">
            Button variant
            <select
              className="control-input"
              value={buttonVariant}
              onChange={(event) =>
                setButtonVariant(event.target.value as "primary" | "secondary" | "ghost")
              }
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="ghost">Ghost</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Input state
            <select
              className="control-input"
              value={inputState}
              onChange={(event) =>
                setInputState(event.target.value as "default" | "error" | "success")
              }
            >
              <option value="default">Default</option>
              <option value="error">Error</option>
              <option value="success">Success</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm">
            Toast type
            <select
              className="control-input"
              value={toastType}
              onChange={(event) =>
                setToastType(event.target.value as "success" | "warn" | "danger")
              }
            >
              <option value="success">Success</option>
              <option value="warn">Warning</option>
              <option value="danger">Error</option>
            </select>
          </label>
          <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-muted">
            Adjust states to preview system consistency across components.
          </div>
        </div>
      </div>
    </section>
  );
}
