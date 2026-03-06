"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    console.error("404: Page not found");
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 p-8">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-primary">Page Not Found</h2>
        <p className="text-muted max-w-md">
          The page you're looking for doesn't exist or has been moved.
          Explore our motion demos and effects in the playground.
        </p>
      </div>

      <div className="flex gap-4">
        <Link
          href="/"
          className="btn btn-primary"
        >
          Go Home
        </Link>
        <Link
          href="/sections/motion"
          className="btn"
        >
          Motion Demos
        </Link>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3 max-w-2xl">
        <Link
          href="/sections/effects"
          className="card card-hover p-4 text-center space-y-2"
        >
          <h3 className="font-semibold text-primary">Background Effects</h3>
          <p className="text-sm text-muted">Glass, gradients, noise</p>
        </Link>
        <Link
          href="/sections/text-effects"
          className="card card-hover p-4 text-center space-y-2"
        >
          <h3 className="font-semibold text-primary">Text Effects</h3>
          <p className="text-sm text-muted">Typewriter, scramble, glitch</p>
        </Link>
        <Link
          href="/sections/hovers"
          className="card card-hover p-4 text-center space-y-2"
        >
          <h3 className="font-semibold text-primary">Hover Effects</h3>
          <p className="text-sm text-muted">Lift, glow, spotlight</p>
        </Link>
      </div>
    </div>
  );
}
