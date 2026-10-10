import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Mono, Atkinson_Hyperlegible_Next } from "next/font/google";
import { themeScript } from "@/lib/theme";
import "./globals.css";

// Font utama: dirancang Braille Institute agar setiap huruf mudah dibedakan (I l 1, O 0)
const fontSans = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  // Next.js belum punya data metrik font ini untuk membuat font cadangan otomatis.
  // Turbopack tetap mencetak peringatan "Failed to find font override values" saat build; aman diabaikan.
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

// Font kode: pasangan mono dari Atkinson Hyperlegible
const fontMono = Atkinson_Hyperlegible_Mono({
  variable: "--font-atkinson-mono",
  subsets: ["latin", "latin-ext"],
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  title: "ProjectsEight · Design System",
  description: "Panduan tipografi, warna, dan spasi untuk ProjectsEight.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-theme="light"
      // Script tema mengubah data-theme sebelum React hydrate
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased motion-safe:scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
