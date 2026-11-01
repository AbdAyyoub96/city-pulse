export const SERVICES = {
  websites: "المواقع الإلكترونية",
  marketing: "التسويق الإلكتروني",
  "ai-marketing": "التسويق عبر الذكاء الاصطناعي",
  "mobile-apps": "تطبيقات الجوال",
  automation: "أتمتة الأنظمة",
} as const;

export type ServiceKey = keyof typeof SERVICES;

export const STATUSES = {
  new: "جديد",
  contacted: "تم التواصل",
  won: "تم التعاقد",
  lost: "لم يتم",
} as const;

export type LeadStatus = keyof typeof STATUSES;

export type Lead = {
  id: string;
  full_name: string;
  company: string | null;
  phone: string;
  email: string | null;
  service: ServiceKey;
  message: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string | null;
};

export type LeadInput = {
  fullName?: unknown;
  company?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
};

const PHONE = /^\+?[0-9\s\-()]{7,20}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const optional = (v: unknown) => str(v) || null;

export function isSpam(input: LeadInput) {
  return str(input.website).length > 0;
}

/** Returns field → Arabic error message; empty when valid. Mirrors the database constraints. */
export function validateLead(input: LeadInput): Record<string, string> {
  const errors: Record<string, string> = {};
  const name = str(input.fullName);
  if (name.length < 2 || name.length > 100) errors.fullName = "يرجى إدخال الاسم الكامل (من 2 إلى 100 حرف).";
  if (!PHONE.test(str(input.phone))) errors.phone = "يرجى إدخال رقم هاتف صحيح.";
  const email = str(input.email);
  if (email && (email.length > 150 || !EMAIL.test(email))) errors.email = "يرجى إدخال بريد إلكتروني صحيح.";
  if (!(str(input.service) in SERVICES)) errors.service = "يرجى اختيار الخدمة المطلوبة.";
  if (str(input.company).length > 120) errors.company = "اسم الشركة طويل جداً.";
  if (str(input.message).length > 2000) errors.message = "الرسالة طويلة جداً (الحد الأقصى 2000 حرف).";
  return errors;
}

export function toRow(input: LeadInput, ip: string | null) {
  return {
    full_name: str(input.fullName),
    company: optional(input.company),
    phone: str(input.phone),
    email: optional(input.email),
    service: str(input.service) as ServiceKey,
    message: optional(input.message),
    ip_address: ip,
  };
}
