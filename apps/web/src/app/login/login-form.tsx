"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/form";

type Errors = { email?: string; password?: string };

function validate(data: FormData): Errors {
  const email = String(data.get("email") ?? "").trim();
  const password = String(data.get("password") ?? "");
  const errors: Errors = {};
  if (!email) errors.email = "Email wajib diisi.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Format email tidak valid.";
  if (!password) errors.password = "Password wajib diisi.";
  return errors;
}

export function LoginForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(new FormData(form));
    setErrors(found);
    setNotice(null);

    if (found.email || found.password) {
      // Fokus ke input pertama yang salah
      const first = found.email ? "email" : "password";
      (form.elements.namedItem(first) as HTMLInputElement | null)?.focus();
      return;
    }

    // TODO: kirim ke endpoint login di apps/api setelah autentikasi dibuat
    setNotice("Login belum tersedia: backend autentikasi belum dibuat.");
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5">
      <Field id="email" label="Email" error={errors.email} errorClassName="text-foreground" required>
        <Input name="email" type="email" autoComplete="email" placeholder="nama@email.com" />
      </Field>
      <Field id="password" label="Password" error={errors.password} errorClassName="text-foreground" required>
        <div className="relative">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            aria-pressed={showPassword}
            className="absolute top-1/2 right-1 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
              {showPassword && <path d="m3 3 18 18" />}
            </svg>
          </button>
        </div>
      </Field>

      <Button type="submit" size="lg" className="w-full">
        Masuk
      </Button>

      {notice && (
        <p role="status" className="rounded-lg bg-muted px-4 py-3 text-body-sm text-muted-foreground">
          {notice}
        </p>
      )}
    </form>
  );
}
