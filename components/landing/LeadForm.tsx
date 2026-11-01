"use client";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/i18n/types";
import { validateLead } from "@/lib/leads";
import { Icon } from "../Icon";

type Field = keyof Dictionary["contact"]["errors"];
export function LeadForm({
  d,
}: {
  d: Pick<Dictionary, "contact" | "services">;
}) {
  const t = d.contact;
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<{
    kind: "success" | "error";
    text: string;
  } | null>(null);
  const [sending, setSending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const invalid = validateLead(payload);
    setErrors(
      Object.fromEntries(
        Object.keys(invalid).map((key) => [key, t.errors[key as Field]]),
      ),
    );
    setStatus(null);
    if (Object.keys(invalid).length) {
      setStatus({ kind: "error", text: t.invalid });
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(invalid)[0]}"]`)
        ?.focus();
      return;
    }
    setSending(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        form.reset();
        setStatus({ kind: "success", text: t.success });
      } else {
        if (response.status === 400) {
          const body = (await response.json().catch(() => ({}))) as {
            errors?: Record<string, string>;
          };
          const serverErrors = Object.keys(body.errors ?? {}).filter((key) =>
            Object.hasOwn(t.errors, key),
          );
          setErrors(
            Object.fromEntries(
              serverErrors.map((key) => [key, t.errors[key as Field]]),
            ),
          );
          if (serverErrors[0])
            form
              .querySelector<HTMLElement>(`[name="${serverErrors[0]}"]`)
              ?.focus();
        }
        setStatus({
          kind: "error",
          text:
            response.status === 429
              ? t.rateLimit
              : response.status === 400
                ? t.invalid
                : t.error,
        });
      }
    } catch {
      setStatus({ kind: "error", text: t.network });
    } finally {
      setSending(false);
    }
  }
  const props = (name: Field) => ({
    id: `lead-${name}`,
    name,
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `error-${name}` : undefined,
  });
  const error = (name: Field) =>
    errors[name] && (
      <span className="field-error" id={`error-${name}`}>
        {errors[name]}
      </span>
    );
  return (
    <form
      className="lead-form"
      onSubmit={submit}
      noValidate
      aria-busy={sending}
    >
      <div className="form-heading">
        <h3>{t.formTitle}</h3>
        <p>{t.formDescription}</p>
      </div>
      <p className="required-note">{t.required}</p>
      <div className="form-row">
        <div className="field">
          <label htmlFor="lead-fullName">
            {t.fullName} <span>*</span>
          </label>
          <input
            {...props("fullName")}
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder={t.namePlaceholder}
          />
          {error("fullName")}
        </div>
        <div className="field">
          <label htmlFor="lead-company">{t.company}</label>
          <input
            {...props("company")}
            maxLength={120}
            autoComplete="organization"
            placeholder={t.companyPlaceholder}
          />
          {error("company")}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="lead-phone">
            {t.phoneField} <span>*</span>
          </label>
          <input
            {...props("phone")}
            required
            type="tel"
            dir="ltr"
            maxLength={20}
            autoComplete="tel"
            placeholder={t.phonePlaceholder}
          />
          {error("phone")}
        </div>
        <div className="field">
          <label htmlFor="lead-email">{t.emailField}</label>
          <input
            {...props("email")}
            type="email"
            dir="ltr"
            maxLength={150}
            autoComplete="email"
            placeholder={t.emailPlaceholder}
          />
          {error("email")}
        </div>
      </div>
      <div className="field">
        <label htmlFor="lead-service">
          {t.service} <span>*</span>
        </label>
        <select {...props("service")} required defaultValue="">
          <option value="" disabled>
            {t.select}
          </option>
          {d.services.items.map((item) => (
            <option key={item.key} value={item.key}>
              {item.title}
            </option>
          ))}
        </select>
        {error("service")}
      </div>
      <div className="field">
        <label htmlFor="lead-message">{t.message}</label>
        <textarea
          {...props("message")}
          rows={4}
          maxLength={2000}
          placeholder={t.messagePlaceholder}
        />
        {error("message")}
      </div>
      <div className="honeypot" aria-hidden="true">
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-label="website"
        />
      </div>
      <button
        className="btn btn-primary submit-button"
        type="submit"
        disabled={sending}
      >
        {sending ? t.sending : t.submit}
        <Icon name="arrow" />
      </button>
      <p className="privacy-note">{t.privacy}</p>
      <div aria-live="polite" aria-atomic="true">
        {status && (
          <p
            className={`form-message ${status.kind}`}
            role={status.kind === "error" ? "alert" : "status"}
          >
            {status.text}
          </p>
        )}
      </div>
    </form>
  );
}
