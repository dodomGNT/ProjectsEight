/**
 * Aturan ESLint lokal: memastikan class Tailwind mengikuti design system
 * (lihat apps/web/CLAUDE.md dan src/app/globals.css).
 *
 * Mengecek setiap string di file .tsx/.ts, dipecah per class, lalu mencocokkan
 * dengan daftar pola yang dilarang di bawah.
 */

const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const COLOR_UTILS =
  "bg|text|border(?:-[trblxy])?|ring|ring-offset|outline|fill|stroke|from|via|to|divide|placeholder|decoration|caret|shadow|accent";

const checks = [
  {
    pattern: /^text-(xs|sm|base|lg|[2-9]?xl)$/,
    message:
      "Ukuran teks `{{cls}}` bukan bagian dari design system. Pakai text-display, text-h1–h4, text-body-lg, text-body, text-body-sm, text-caption, text-overline, atau text-code.",
  },
  {
    pattern: /^text-\[(?:[\d.]|clamp|calc|var\(--text)/,
    message:
      "Ukuran teks arbitrary `{{cls}}` tidak boleh. Pakai class skala teks (text-h1, text-body, dst.) atau tambahkan token baru di globals.css.",
  },
  {
    pattern: /^(leading|tracking)-/,
    message:
      "`{{cls}}` menimpa line-height/letter-spacing. Class skala teks (text-h1, text-body, dst.) sudah mengaturnya.",
  },
  {
    pattern: /^font-(thin|extralight|light|extrabold|black)$/,
    message: "Ketebalan `{{cls}}` tidak dipakai. Pilih font-normal, font-medium, font-semibold, atau font-bold.",
  },
  {
    pattern: new RegExp(`^(${COLOR_UTILS})-((${PALETTE})-\\d{2,3}|black|white)(\\/\\d+)?$`),
    message:
      "Warna `{{cls}}` bukan token. Pakai warna token: background, foreground, muted, muted-foreground, border, primary, accent, destructive.",
  },
  {
    pattern: new RegExp(`^(${COLOR_UTILS})-\\[(#|rgb|hsl|oklch|color)`),
    message: "Warna arbitrary `{{cls}}` tidak boleh. Pakai warna token, atau tambahkan token baru di globals.css.",
  },
  {
    pattern: /^-?(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y)-\[/,
    message: "Spasi arbitrary `{{cls}}` tidak boleh. Pakai skala spasi Tailwind (mis. p-4 = 16px).",
  },
];

// Prefix varian (hover:, md:, aria-invalid:, [&_svg]:, ...) dibuang sebelum dicek,
// kecuali `dark:` yang dilarang untuk warna karena token sudah mengikuti tema.
function splitVariants(cls) {
  const parts = [];
  let depth = 0;
  let current = "";
  for (const ch of cls) {
    if (ch === "[") depth++;
    if (ch === "]") depth--;
    if (ch === ":" && depth === 0) {
      parts.push(current);
      current = "";
    } else current += ch;
  }
  parts.push(current);
  return { variants: parts.slice(0, -1), utility: parts.at(-1).replace(/^!/, "") };
}

function findViolations(text) {
  const found = [];
  for (const cls of text.split(/\s+/)) {
    if (!cls) continue;
    const { variants, utility } = splitVariants(cls);
    if (variants.includes("dark") && new RegExp(`^(${COLOR_UTILS})-`).test(utility)) {
      found.push({
        cls,
        message:
          "`{{cls}}`: jangan pakai dark: untuk warna. Warna token sudah otomatis berganti di tema gelap.",
      });
      continue;
    }
    const hit = checks.find((c) => c.pattern.test(utility));
    if (hit) found.push({ cls, message: hit.message });
  }
  return found;
}

const rule = {
  meta: {
    type: "problem",
    docs: { description: "Class Tailwind harus memakai token design system" },
    schema: [],
  },
  create(context) {
    const report = (node, text) => {
      for (const v of findViolations(text)) {
        context.report({ node, message: v.message, data: { cls: v.cls } });
      }
    };
    return {
      Literal(node) {
        if (typeof node.value === "string") report(node, node.value);
      },
      TemplateElement(node) {
        report(node, node.value.cooked ?? node.value.raw);
      },
    };
  },
};

const plugin = {
  meta: { name: "design" },
  rules: { tokens: rule },
};

export default plugin;
