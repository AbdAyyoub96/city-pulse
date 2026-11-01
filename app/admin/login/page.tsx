import { LogoMark } from "@/components/Logo";
import { signIn } from "../actions";

export const metadata = {
  title: "تسجيل الدخول | City Pulse",
  robots: { index: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="admin-login">
      <form action={signIn} className="admin-card">
        <LogoMark size={48} />
        <h1>لوحة إدارة الطلبات</h1>
        <div className="field">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            required
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor="password">كلمة المرور</label>
          <input
            id="password"
            name="password"
            type="password"
            dir="ltr"
            required
            autoComplete="current-password"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          تسجيل الدخول
        </button>
        {error && (
          <p className="form-msg" role="alert">
            البريد الإلكتروني أو كلمة المرور غير صحيحة.
          </p>
        )}
      </form>
    </main>
  );
}
