# City Pulse Solutions: الموقع (Next.js + Supabase)

موقع الشركة مبني بـ **Next.js 15**، وقاعدة البيانات وتسجيل الدخول على **Supabase**.

- `/` الموقع الرئيسي، ونموذج حجز الاستشارة يحفظ الطلبات في Supabase.
- `/admin` لوحة إدارة الطلبات (تتطلب تسجيل الدخول وصلاحية مشرف).

## الإعداد لأول مرة (10 دقائق)

### 1. أنشئ مشروع Supabase
1. ادخل إلى [supabase.com](https://supabase.com) وأنشئ مشروعاً جديداً (اختر المنطقة الأقرب، مثل Frankfurt).
2. من **SQL Editor › New query** الصق محتوى الملف `supabase/migrations/0001_leads.sql` واضغط **Run**.

### 2. اربط المشروع
1. من **Project Settings › API** انسخ: `Project URL`، و`anon public`، و`service_role`.
2. انسخ الملف `.env.example` إلى `.env.local` وضع القيم فيه.

> مفتاح `service_role` سري جداً: لا تضعه في أي ملف يُرفع إلى GitHub، ولا تضف له البادئة `NEXT_PUBLIC_`.

### 3. أنشئ حساب المشرف
1. من **Authentication › Users › Add user** أنشئ مستخدماً بالبريد وكلمة المرور.
2. انسخ الـ `User UID` ثم نفّذ في **SQL Editor**:
   ```sql
   insert into public.admins (user_id) values ('ضع-الـ-UID-هنا');
   ```
3. يُنصح بإيقاف التسجيل العام: **Authentication › Sign In / Providers › Allow new users to sign up** (أوقفه).

### 4. شغّل الموقع
يتطلب Node.js 20 أو أحدث.
```bash
npm install
npm run dev
```
- الموقع: http://localhost:3000
- لوحة الإدارة: http://localhost:3000/admin

## النشر على Vercel
1. ارفع المشروع إلى GitHub.
2. من [vercel.com](https://vercel.com) اختر **Add New › Project** واستورد المستودع.
3. أضف متغيرات البيئة الثلاثة من `.env.local` في إعدادات المشروع، ثم **Deploy**.

## الحماية
- الموقع لا يكتب في قاعدة البيانات مباشرة من المتصفح؛ الطلبات تمر بالخادم (`app/api/leads`) للتحقق قبل الحفظ.
- سياسات RLS: فقط المستخدمون المضافون في جدول `admins` يقرؤون الطلبات ويعدّلونها.
- حد أقصى 5 طلبات في الدقيقة لكل زائر، وحقل مخفي لصد الرسائل الآلية.

## هيكل المشروع
```
app/
  page.tsx              الصفحة الرئيسية
  api/leads/route.ts    استقبال طلبات الاستشارة
  admin/                لوحة الإدارة وتسجيل الدخول
components/             الشعار، نموذج التواصل، قائمة الحالة
lib/                    عملاء Supabase، التحقق من البيانات
middleware.ts           حماية صفحات /admin
supabase/migrations/    مخطط قاعدة البيانات
```
