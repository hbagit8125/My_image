"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

export type Theme = "dark" | "light";
const THEME_EVENT = "themechange";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Switch theme, remember the choice and tell listening components. */
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function toggleTheme() {
  setTheme(readTheme() === "light" ? "dark" : "light");
}

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "dark");
}

export default function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "light" ? "dark" : "light";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="grid size-11 place-items-center rounded-full border border-line text-haze transition-colors hover:border-glow/60 hover:text-moon"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

/**
 * Runs before the page paints so a saved light theme never flashes dark first.
 * Dark is the default when nothing is saved.
 */
export const themeInitScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
