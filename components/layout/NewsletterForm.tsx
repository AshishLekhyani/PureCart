"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type Status = "idle" | "invalid" | "signed-up";

// Deliberately permissive: something@something.tld, no attempt at RFC 5322.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(EMAIL.test(email.trim()) ? "signed-up" : "invalid");
  };

  if (status === "signed-up") {
    return (
      <div className="mt-8 max-w-xs" role="status">
        <p className="label-sm text-muted">Join the list</p>
        <p className="mt-3 flex items-start gap-2">
          <Check className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
          <span className="text-ink-soft">
            You are on the list. Nothing is actually sent — this is a portfolio build.
          </span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 max-w-xs">
      <label htmlFor="newsletter" className="label-sm text-muted">
        Join the list
      </label>

      <div className="mt-2 flex items-end gap-3">
        <input
          id="newsletter"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus("idle");
          }}
          placeholder="Email address"
          autoComplete="email"
          aria-invalid={status === "invalid"}
          aria-describedby={status === "invalid" ? "newsletter-error" : undefined}
          className="field flex-1"
        />
        <button type="submit" className="label link-underline pb-3">
          Sign up
        </button>
      </div>

      {status === "invalid" && (
        <p id="newsletter-error" role="alert" className="label-sm text-sale mt-3">
          Enter a valid email address
        </p>
      )}
    </form>
  );
}
