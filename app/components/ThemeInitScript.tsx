"use client";

import Script from "next/script";

/**
 * Runs before first paint to prevent flash of incorrect theme.
 * Reads hs_theme from localStorage (used by Preline theme switch) and applies dark/light to html.
 */
const themeInitScript = `
(function() {
  var html = document.documentElement;
  var theme = localStorage.getItem('hs_theme');
  if (!theme) {
    theme = 'auto';
    localStorage.setItem('hs_theme', 'auto');
  }
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = theme === 'dark' || (theme === 'auto' && prefersDark);
  var isLight = theme === 'light' || theme === 'default' || (theme === 'auto' && !prefersDark);
  if (isDark) {
    html.classList.add('dark');
    html.classList.remove('light');
    if (theme === 'auto') html.classList.add('auto');
  } else if (isLight) {
    html.classList.add('light');
    html.classList.remove('dark');
    if (theme === 'auto') html.classList.add('auto');
  }
})();
`;

export default function ThemeInitScript() {
  return <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
