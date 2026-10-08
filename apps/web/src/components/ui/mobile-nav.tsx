"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export type NavLink = { href: string; label: string };

/**
 * Menu hamburger untuk layar kecil.
 * Taruh di dalam <header> yang `sticky`/`relative`: panel menu muncul tepat di bawah header.
 * Sembunyikan di layar lebar dengan membungkusnya: <div className="md:hidden"><MobileNav … /></div>
 */
export function MobileNav({
  links,
  footer,
  label = "Menu",
}: {
  links: NavLink[];
  /** Isi tambahan di bawah daftar link, mis. tombol GitHub */
  footer?: ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Fokus pindah ke link pertama saat menu dibuka
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const close = (returnFocus: boolean) => {
      setOpen(false);
      if (returnFocus) buttonRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close(true);
    const onPointer = (e: PointerEvent) => {
      const header = rootRef.current?.closest("header") ?? rootRef.current;
      if (header && !header.contains(e.target as Node)) close(false);
    };
    // Tutup otomatis kalau layar melebar sampai navigasi desktop tampil
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && close(false);

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div ref={rootRef}>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        aria-label={open ? `Tutup ${label.toLowerCase()}` : `Buka ${label.toLowerCase()}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </Button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-background shadow-sm"
      >
        <nav aria-label={label} className="mx-auto max-w-6xl px-4 py-2 md:px-8">
          <ul className="divide-y divide-border">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-body font-medium transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {footer && (
            <div className="border-t border-border py-4" onClick={() => setOpen(false)}>
              {footer}
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
