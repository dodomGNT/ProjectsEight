"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, Input } from "@/components/ui/form";

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
      <Field id="email" label="Email" error={errors.email} required>
        <Input name="email" type="email" autoComplete="email" placeholder="nama@email.com" />
      </Field>
      <Field id="password" label="Password" error={errors.password} required>
        <Input name="password" type="password" autoComplete="current-password" />
      </Field>
      <Checkbox name="remember" label="Ingat saya" />

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
