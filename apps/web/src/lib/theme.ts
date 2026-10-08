export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "themechange";

/**
 * Dijalankan di <head> sebelum halaman tampil (lihat src/app/layout.tsx):
 * baca pilihan tema dari localStorage, lalu pasang data-theme="light" | "dark" di <html>.
 * Kalau pilihannya "system" (atau belum pernah memilih), ikut setting OS,
 * termasuk saat setting OS berubah ketika halaman sedang terbuka.
 */
export const themeScript = `(function(){
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  function apply() {
    var pref = null;
    try { pref = localStorage.getItem("${THEME_STORAGE_KEY}"); } catch (e) {}
    var dark = pref === "dark" || (pref !== "light" && media.matches);
    root.setAttribute("data-theme", dark ? "dark" : "light");
  }
  apply();
  media.addEventListener("change", apply);
  window.addEventListener("${THEME_CHANGE_EVENT}", apply);
  window.addEventListener("storage", apply);
})()`;
