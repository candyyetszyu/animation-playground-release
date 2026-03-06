"use client";

import { useToast } from "@/components/Toast";

type CopyButtonProps = {
  label?: string;
  value: string;
};

export default function CopyButton({ label = "Copy", value }: CopyButtonProps) {
  const { showToast } = useToast();

  return (
    <button
      type="button"
      className="btn text-sm"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        showToast("Copied to clipboard!");
      }}
    >
      {label}
    </button>
  );
}
