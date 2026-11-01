"use client";

import { useState, type FormEvent } from "react";
import { SERVICES } from "@/lib/leads";

export function LeadForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (!data.fullName?.trim() || !data.phone?.trim()) {
      setMessage("يرجى إدخال الاسم الكامل ورقم الهاتف لنتمكن من التواصل معك.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      if (res.ok) {
        form.reset();
        setMessage("تم استلام طلبك بنجاح، وسيتواصل معك فريقنا خلال يوم عمل.");
      } else {
        setMessage(body.message ?? "تعذّر إرسال الطلب، يرجى التحقق من البيانات والمحاولة مرة أخرى.");
      }
    } catch {
      setMessage("تعذّر الاتصال بالخادم، يرجى المحاولة لاحقاً أو التواصل معنا هاتفياً.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="row">
        <div className="field">
          <label htmlFor="f-name">الاسم الكامل</label>
          <input id="f-name" name="fullName" required maxLength={100} autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="f-company">اسم الشركة</label>
          <input id="f-company" name="company" maxLength={120} autoComplete="organization" />
        </div>
      </div>
      <div className="row">
        <div className="field">
          <label htmlFor="f-phone">رقم الهاتف</label>
          <input id="f-phone" name="phone" type="tel" dir="ltr" placeholder="+962" required maxLength={20} autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="f-email">البريد الإلكتروني</label>
          <input id="f-email" name="email" type="email" dir="ltr" maxLength={150} autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-service">الخدمة المطلوبة</label>
        <select id="f-service" name="service" defaultValue="websites">
          {Object.entries(SERVICES).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-msg">ما أبرز التحديات التي تواجه مشروعك؟</label>
        <textarea id="f-msg" name="message" maxLength={2000} />
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
      />
      <button className="btn btn-primary" type="submit" disabled={sending}>
        {sending ? "جارٍ الإرسال…" : "احجز جلسة التشخيص"}
      </button>
      {message && (
        <p className="form-msg" role="status">
          {message}
        </p>
      )}
    </form>
  );
}
