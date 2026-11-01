import { Brand } from "@/components/Logo";
import { StatusSelect } from "@/components/StatusSelect";
import { createClient } from "@/lib/supabase/server";
import { SERVICES, STATUSES, type Lead, type LeadStatus } from "@/lib/leads";
import { signOut } from "./actions";

export const metadata = { title: "طلبات العملاء | City Pulse", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const filter = status && status in STATUSES ? (status as LeadStatus) : null;

  const supabase = await createClient();
  const { data: admin } = await supabase.from("admins").select("user_id").maybeSingle();

  let query = supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(500);
  if (filter) query = query.eq("status", filter);
  const { data: leads, error } = await query;

  return (
    <>
      <header>
        <div className="wrap nav">
          <Brand />
          <form action={signOut}>
            <button className="btn btn-ghost" type="submit">تسجيل الخروج</button>
          </form>
        </div>
      </header>
      <main className="wrap admin">
        <div className="admin-bar">
          <div>
            <h1>طلبات العملاء</h1>
            {leads && <span className="note">{leads.length} طلب</span>}
          </div>
          <nav className="filters" aria-label="تصفية حسب الحالة">
            <a href="/admin" aria-current={!filter ? "page" : undefined}>الكل</a>
            {Object.entries(STATUSES).map(([key, label]) => (
              <a key={key} href={`/admin?status=${key}`} aria-current={filter === key ? "page" : undefined}>{label}</a>
            ))}
          </nav>
        </div>

        {!admin ? (
          <p className="admin-empty">
            حسابك مسجّل، لكنه غير مضاف إلى قائمة المشرفين بعد. أضف معرّف المستخدم إلى جدول admins في Supabase.
          </p>
        ) : error ? (
          <p className="admin-empty">تعذّر تحميل الطلبات: {error.message}</p>
        ) : !leads?.length ? (
          <p className="admin-empty">لا توجد طلبات بعد. ستظهر هنا طلبات الاستشارة فور إرسالها من الموقع.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>التاريخ</th>
                  <th>العميل</th>
                  <th>التواصل</th>
                  <th>الخدمة</th>
                  <th>الرسالة</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {(leads as Lead[]).map((lead) => (
                  <tr key={lead.id}>
                    <td className="nowrap">{new Date(lead.created_at).toLocaleString("ar-JO", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Amman" })}</td>
                    <td>{lead.full_name}<small>{lead.company}</small></td>
                    <td dir="ltr" style={{ textAlign: "right" }}>{lead.phone}<small>{lead.email}</small></td>
                    <td>{SERVICES[lead.service] ?? lead.service}</td>
                    <td className="msg">{lead.message}</td>
                    <td><StatusSelect id={lead.id} status={lead.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
