"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Komponen untuk halaman dokumentasi design system.
 * Nilai (px, rem, warna) dibaca langsung dari CSS yang sedang aktif,
 * jadi selalu sama dengan token di src/app/globals.css.
 */

function useComputedStyle<T>(read: (style: CSSStyleDeclaration) => T) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    const el = ref.current?.firstElementChild;
    if (!el) return;
    const update = () => setValue(read(getComputedStyle(el)));
    update();

    // Hitung ulang saat ukuran layar atau tema (light/dark) berubah
    window.addEventListener("resize", update);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      media.removeEventListener("change", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, value] as const;
}

const px = (value: string) => Math.round(parseFloat(value) * 100) / 100;
const rem = (value: string) => Math.round((parseFloat(value) / 16) * 1000) / 1000;

function readType(style: CSSStyleDeclaration) {
  const lineHeight =
    style.lineHeight === "normal"
      ? "normal"
      : `${px(style.lineHeight)}px (${Math.round((parseFloat(style.lineHeight) / parseFloat(style.fontSize)) * 100) / 100})`;
  const letterSpacing =
    style.letterSpacing === "normal"
      ? "0"
      : `${Math.round((parseFloat(style.letterSpacing) / parseFloat(style.fontSize)) * 1000) / 1000}em`;

  return [
    ["Size", `${px(style.fontSize)}px / ${rem(style.fontSize)}rem`],
    ["Line height", lineHeight],
    ["Weight", style.fontWeight],
    ["Tracking", letterSpacing],
  ];
}

export function TypeRow({
  token,
  className,
  usage,
  sample,
}: {
  token: string;
  className: string;
  usage: string;
  sample: string;
}) {
  const [ref, specs] = useComputedStyle(readType);

  return (
    <div className="grid gap-4 border-b border-border py-8 md:grid-cols-[260px_1fr] md:gap-10">
      <div className="space-y-3">
        <div>
          <p className="text-h4">{token}</p>
          <p className="text-body-sm text-muted-foreground">{usage}</p>
        </div>
        <code className="inline-block rounded-md bg-muted px-2 py-1 font-mono text-caption text-primary">
          {className}
        </code>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-caption">
          {(specs ?? [["Size", "…"]]).map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="font-mono tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div ref={ref} className="min-w-0 self-center">
        <p className={`${className} break-words`}>{sample}</p>
      </div>
    </div>
  );
}

function toHex(color: string) {
  const m = color.match(/\d+(\.\d+)?/g);
  if (!color.startsWith("rgb") || !m) return color;
  return (
    "#" +
    m
      .slice(0, 3)
      .map((n) => Math.round(Number(n)).toString(16).padStart(2, "0"))
      .join("")
  );
}

export function ColorSwatch({
  name,
  className,
  usage,
}: {
  name: string;
  className: string;
  usage: string;
}) {
  const [ref, hex] = useComputedStyle((style) => toHex(style.backgroundColor));

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div ref={ref}>
        <div className={`h-20 ${className}`} />
      </div>
      <div className="space-y-1 p-4">
        <p className="text-body-sm font-semibold">{name}</p>
        <p className="font-mono text-caption text-muted-foreground">
          {className} · {hex ?? "…"}
        </p>
        <p className="text-caption text-muted-foreground">{usage}</p>
      </div>
    </div>
  );
}
