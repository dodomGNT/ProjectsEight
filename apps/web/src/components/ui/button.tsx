import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-muted text-foreground hover:bg-border",
  outline: "border border-border bg-background hover:bg-muted",
  ghost: "hover:bg-muted",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizes = {
  sm: "h-8 gap-1.5 px-3 text-body-sm",
  md: "h-10 gap-2 px-4 text-body-sm",
  lg: "h-12 gap-2 px-6 text-body",
  icon: "size-10",
};

const base =
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

type StyleProps = { variant?: keyof typeof variants; size?: keyof typeof sizes };

/** Class tombol, untuk elemen lain yang harus tampil seperti tombol */
export function buttonStyles({ variant = "primary", size = "md" }: StyleProps = {}) {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

export type ButtonProps = ComponentProps<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Tampilkan spinner dan nonaktifkan tombol */
  loading?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`${buttonStyles({ variant, size })} ${className}`}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

/** Link yang tampil seperti tombol (navigasi ke halaman lain). Untuk aksi, pakai `Button`. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={`${buttonStyles({ variant, size })} ${className}`} {...props} />;
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
