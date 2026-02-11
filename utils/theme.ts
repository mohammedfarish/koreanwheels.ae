/**
 * Custom theme switch - avoids Preline's setResetStyles which disables transitions.
 * Uses same localStorage key (hs_theme) and html classes for compatibility.
 */

export type ThemeValue = "auto" | "light" | "dark";

function applyThemeToDOM(value: ThemeValue): void {
  const html = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = value === "auto" ? (prefersDark ? "dark" : "light") : value;

  html.classList.remove("light", "dark", "default", "auto");
  if (value === "auto") {
    html.classList.add("auto", resolved);
  } else {
    html.classList.add(resolved);
  }
}

export function setTheme(value: ThemeValue): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("hs_theme", value);
  applyThemeToDOM(value);
  window.dispatchEvent(new CustomEvent("on-hs-appearance-change", { detail: value }));
}

export function getTheme(): ThemeValue {
  if (typeof window === "undefined") return "auto";
  const stored = localStorage.getItem("hs_theme");
  if (stored === "light" || stored === "dark" || stored === "auto") return stored;
  return "auto";
}

/** Call once on app load to listen for system theme changes when "auto" is selected */
export function initThemeObserver(): void {
  if (typeof window === "undefined") return;

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (localStorage.getItem("hs_theme") === "auto") {
      applyThemeToDOM("auto");
    }
  });
}
