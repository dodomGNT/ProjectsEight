import {
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";

/* Gaya dasar yang sama untuk Input, Textarea, dan Select */
const control =
  "w-full rounded-lg border border-border bg-background px-3 text-body-sm text-foreground transition-colors placeholder:text-muted-foreground hover:border-muted-foreground focus:border-primary focus:outline-2 focus:-outline-offset-1 focus:outline-primary/30 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 aria-invalid:border-destructive aria-invalid:focus:outline-destructive/30";

export function Label({ className = "", ...props }: ComponentProps<"label">) {
  return <label className={`text-body-sm font-medium ${className}`} {...props} />;
}

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return <input className={`${control} h-10 ${className}`} {...props} />;
}

export function Textarea({ className = "", ...props }: ComponentProps<"textarea">) {
  return <textarea className={`${control} min-h-24 py-2 ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={`${control} h-10 cursor-pointer appearance-none pr-10 ${className}`} {...props}>
        {children}
      </select>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      >
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Checkbox atau radio dengan label di sebelahnya */
function Choice({
  type,
  label,
  description,
  className = "",
  ...props
}: ComponentProps<"input"> & { type: "checkbox" | "radio"; label: ReactNode; description?: ReactNode }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-60 ${className}`}>
      <input
        type={type}
        className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed"
        {...props}
      />
      <span className="grid gap-0.5">
        <span className="text-body-sm">{label}</span>
        {description && <span className="text-caption text-muted-foreground">{description}</span>}
      </span>
    </label>
  );
}

type ChoiceProps = Omit<ComponentProps<typeof Choice>, "type">;

export function Checkbox(props: ChoiceProps) {
  return <Choice type="checkbox" {...props} />;
}

export function Radio(props: ChoiceProps) {
  return <Choice type="radio" {...props} />;
}

/** Saklar on/off. Di balik layar tetap checkbox, jadi bisa dipakai di <form> biasa. */
export function Switch({
  label,
  className = "",
  ...props
}: Omit<ComponentProps<"input">, "type"> & { label: ReactNode }) {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-60 ${className}`}>
      <input type="checkbox" role="switch" className="peer sr-only" {...props} />
      <span className="relative h-6 w-11 shrink-0 rounded-full bg-border transition-colors peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:bg-background after:shadow-sm after:transition-transform peer-checked:after:translate-x-5" />
      <span className="text-body-sm">{label}</span>
    </label>
  );
}

/**
 * Membungkus satu input dengan label, teks bantuan, dan pesan error.
 * `id`, `aria-describedby`, dan `aria-invalid` otomatis dipasang ke input di dalamnya.
 */
export function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
  className = "",
}: {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  children: ReactElement<Record<string, unknown>>;
  className?: string;
}) {
  // Kalau ada error, hint disembunyikan dan diganti pesan error
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={`grid content-start gap-1.5 ${className}`}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {isValidElement(children)
        ? cloneElement(children, {
            id,
            required,
            "aria-describedby": describedBy,
            "aria-invalid": error ? true : undefined,
          })
        : children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-caption font-normal text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-caption text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
