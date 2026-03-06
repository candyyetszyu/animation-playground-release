"use client";

import SidebarNav from "@/components/SidebarNav";
import { PlaygroundProvider, usePlayground } from "@/components/PlaygroundProvider";
import { ToastProvider } from "@/components/Toast";

function ShellContent({ children }: { children: React.ReactNode }) {
  const { density } = usePlayground();
  return (
    <div className={`min-h-screen app-bg ${density === "compact" ? "text-sm" : "text-base"}`}>
      <div className="flex min-h-screen items-stretch app-content">
        <SidebarNav />
        <main id="main-content" className="flex-1 space-y-12 p-10">{children}</main>
      </div>
    </div>
  );
}

export default function PlaygroundShell({ children }: { children: React.ReactNode }) {
  return (
    <PlaygroundProvider>
      <ToastProvider>
        <ShellContent>{children}</ShellContent>
      </ToastProvider>
    </PlaygroundProvider>
  );
}
