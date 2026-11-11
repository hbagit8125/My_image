"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CornerDownLeft, Download, FileText, Hash, Mail, Search } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { navItems, profile } from "@/data/content";

type Command = { id: string; label: string; group: string; icon: React.ReactNode; run: () => void };

/** Dispatch this event from anywhere to open the palette. */
export const OPEN_PALETTE_EVENT = "open-command-palette";

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const commands = useMemo<Command[]>(
    () => [
      ...navItems.map((n) => ({
        id: `go-${n.id}`,
        label: `Go to ${n.label}`,
        group: "Sections",
        icon: <Hash size={18} />,
        run: () => router.push(`/#${n.id}`),
      })),
      {
        id: "blog",
        label: "Read all blog posts",
        group: "Pages",
        icon: <FileText size={18} />,
        run: () => router.push("/blog"),
      },
      {
        id: "resume",
        label: "Download resume",
        group: "Actions",
        icon: <Download size={18} />,
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resume;
          a.download = "";
          a.click();
        },
      },
      {
        id: "email",
        label: "Send an email",
        group: "Actions",
        icon: <Mail size={18} />,
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        group: "Links",
        icon: <LinkedinIcon size={18} />,
        run: () => window.open(profile.linkedin, "_blank", "noreferrer"),
      },
      {
        id: "github",
        label: "Open GitHub",
        group: "Links",
        icon: <GithubIcon size={18} />,
        run: () => window.open(profile.github, "_blank", "noreferrer"),
      },
    ],
    [router],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.label} ${c.group}`.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  useEffect(() => {
    // Start from a blank search every time the palette opens.
    const show = () => {
      setQuery("");
      setIndex(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (openRef.current) setOpen(false);
        else show();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    // Wait a frame so the input exists before focusing it.
    const t = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(t);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const run = (c?: Command) => {
    if (!c) return;
    setOpen(false);
    c.run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-night/80 px-4 pt-[14svh] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="surface w-full max-w-xl overflow-hidden shadow-glow"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search size={18} className="shrink-0 text-haze" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIndex((i) => (results.length ? (i + 1) % results.length : 0));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    run(results[index]);
                  } else if (e.key === "Escape") {
                    setOpen(false);
                  }
                }}
                placeholder="Where do you want to go?"
                aria-label="Search sections and actions"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                className="h-14 w-full bg-transparent text-moon placeholder:text-haze/70 outline-none focus-visible:outline-none"
              />
              <kbd className="hidden rounded-md border border-line px-2 py-0.5 font-mono text-xs text-haze sm:block">
                Esc
              </kbd>
            </div>

            <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50svh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-haze">
                  Nothing matches &ldquo;{query}&rdquo;. Try a section name like Projects.
                </li>
              )}
              {results.map((c, i) => (
                <li key={c.id} role="option" aria-selected={i === index}>
                  <button
                    type="button"
                    tabIndex={-1}
                    onPointerMove={() => setIndex(i)}
                    onClick={() => run(c)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                      i === index ? "bg-signal/15 text-moon" : "text-haze"
                    }`}
                  >
                    <span className={i === index ? "text-glow" : ""}>{c.icon}</span>
                    <span className="flex-1">{c.label}</span>
                    <span className="text-xs text-haze">{c.group}</span>
                    {i === index && <CornerDownLeft size={14} className="text-glow" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
