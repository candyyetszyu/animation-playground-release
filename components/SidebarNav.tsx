"use client";

import { sectionGroups, sectionMeta } from "@/data/sections";
import { motionDemos } from "@/data/motionDemos";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo, useRef, useEffect } from "react";

type SearchResult = {
  type: "section" | "motion";
  id: string;
  label: string;
  href: string;
  description: string;
  tags: string[];
};

export default function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const allSearchData = useMemo<SearchResult[]>(() => {
    const sectionResults: SearchResult[] = Object.entries(sectionMeta).map(([id, meta]) => ({
      type: "section",
      id,
      label: meta.title,
      href: id === "overview" ? "/" : `/sections/${id}`,
      description: meta.description,
      tags: meta.tags
    }));

    const motionResults: SearchResult[] = motionDemos.map((demo) => ({
      type: "motion",
      id: demo.type,
      label: demo.name,
      href: "/sections/motion",
      description: demo.description,
      tags: demo.tags
    }));

    return [...sectionResults, ...motionResults];
  }, []);

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allSearchData.filter(
      (item) =>
        item.label.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
    ).slice(0, 8);
  }, [searchQuery, allSearchData]);

  const handleRandomEffect = () => {
    const randomIndex = Math.floor(Math.random() * motionDemos.length);
    router.push("/sections/motion");
    setTimeout(() => {
      const demoElement = document.getElementById(`demo-${motionDemos[randomIndex].type}`);
      if (demoElement) {
        demoElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="sidebar sticky top-0 self-stretch min-h-screen w-64 p-6 overflow-y-auto">
      <div className="mb-8 space-y-1">
        <h1 className="text-xl font-semibold text-primary">Animation Playground</h1>
        <p className="text-xs text-soft">Interactive demos of web presentation effects</p>
      </div>

      <div ref={searchRef} className="relative mb-6" role="search">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soft"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search effects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            aria-label="Search effects and sections"
            aria-expanded={isSearchFocused && filteredResults.length > 0}
            aria-autocomplete="list"
            aria-controls="search-results"
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-3 py-2 text-sm text-primary placeholder:text-soft focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-soft hover:text-primary"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {isSearchFocused && filteredResults.length > 0 && (
          <div id="search-results" role="listbox" className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
            {filteredResults.map((result, index) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={result.href}
                role="option"
                aria-selected={false}
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchFocused(false);
                }}
                className="block px-4 py-3 hover:bg-surface-hover border-b border-border last:border-0 focus-visible:bg-surface-hover focus-visible:outline-none"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    result.type === "motion" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                  }`}>
                    {result.type === "motion" ? "Motion" : "Section"}
                  </span>
                  <span className="font-medium text-primary">{result.label}</span>
                </div>
                <p className="text-xs text-soft mt-1 line-clamp-1">{result.description}</p>
              </Link>
            ))}
          </div>
        )}

        {isSearchFocused && searchQuery && filteredResults.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-xl z-50 p-4 text-center text-sm text-soft">
            No results found for "{searchQuery}"
          </div>
        )}

        <button
          type="button"
          onClick={handleRandomEffect}
          className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border border-dashed border-border text-secondary hover:bg-surface-hover hover:border-secondary/50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Surprise Me
        </button>
      </div>

      <nav className="space-y-6 text-sm">
        {sectionGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            <div className="nav-label">{group.label}</div>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`nav-item block rounded-md px-3 py-2 ${
                    (item.href === "/" && pathname === "/") ||
                    (item.href !== "/" && pathname.startsWith(item.href))
                      ? "nav-item-active"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
