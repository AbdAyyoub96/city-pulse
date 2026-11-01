import { Brand } from "@/components/Logo";
import { LeadForm } from "@/components/LeadForm";

const SERVICES = [
  {
    title: "المواقع الإلكترونية",
    lead: "مواقع احترافية سريعة، مصممة لتعكس هوية علامتك وتحوّل الزوار إلى عملاء.",
    items: ["مواقع الشركات والمؤسسات", "المتاجر الإلكترونية", "صفحات الهبوط للحملات", "تحسين الأداء ومحركات البحث"],
    icon: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></>,
  },
  {
    title: "التسويق الإلكتروني",
    lead: "حملات مدروسة تستهدف جمهورك بدقة، وتُقاس نتائجها بالمبيعات لا بالإعجابات.",
    items: ["إدارة الإعلانات على ميتا وجوجل وتيك توك", "إدارة منصات التواصل الاجتماعي", "صناعة المحتوى والهوية البصرية", "تتبع التحويلات وتقارير الأداء"],
    icon: <><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" /><path d="M16 8.5a5 5 0 0 1 0 7M19 5.5a9 9 0 0 1 0 13" /></>,
  },
  {
    title: "التسويق عبر الذكاء الاصطناعي",
    lead: "نوظّف أدوات الذكاء الاصطناعي لرفع كفاءة الحملات وخفض تكلفة اكتساب العميل.",
    items: ["إنتاج المحتوى الإعلاني بالذكاء الاصطناعي", "استهداف وتحليل ذكي للجمهور", "مساعدون آليون للرد على العملاء", "تخصيص العروض حسب سلوك العميل"],
    icon: <><path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></>,
  },
  {
    title: "تطبيقات الجوال",
    lead: "تطبيقات لنظامي iOS وAndroid بتجربة استخدام سلسة وأداء موثوق.",
    items: ["تصميم واجهات وتجربة المستخدم", "تطوير التطبيقات ونشرها على المتاجر", "ربط التطبيق بأنظمة الإدارة والدفع", "الدعم الفني والتحديثات المستمرة"],
    icon: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
    wide: true,
  },
  {
    title: "أتمتة الأنظمة",
    lead: "نحوّل المهام اليدوية المتكررة إلى عمليات آلية، لتتفرغ فرق عملك لما يصنع الفرق.",
    items: ["ربط الأنظمة والمنصات ببعضها (CRM، المتجر، المحاسبة)", "أتمتة متابعة العملاء المحتملين والمبيعات", "تطوير أنظمة إدارة داخلية حسب الطلب", "لوحات تحكم وتقارير تلقائية"],
    icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
    wide: true,
  },
];

const METHOD = [
  { letter: "P", en: "Probe", title: "التشخيص", text: "ندرس مشروعك وسوقك ومنافسيك، ونحدد العوائق التي تحدّ من مبيعاتك." },
  { letter: "U", en: "Unify", title: "بناء الأساس", text: "نجهّز الموقع وأدوات التتبع والأنظمة، ونربطها معاً قبل أي إنفاق إعلاني." },
  { letter: "L", en: "Launch", title: "الإطلاق", text: "نطلق الحملات والمحتوى بعروض ورسائل مصممة خصيصاً لجمهورك." },
  { letter: "S", en: "Scale", title: "التوسع", text: "نضاعف الاستثمار فيما أثبت نجاحه، ونوقف كل إنفاق لا يحقق عائداً." },
  { letter: "E", en: "Evolve", title: "التطوير المستمر", text: "نحلل النتائج شهرياً، ونحسّن ونؤتمت للحفاظ على وتيرة النمو." },
];

const CASES = [
  { tag: "تسويق إلكتروني", kpis: [["[0X]", "العائد على الإعلان"], ["[+0%]", "نمو المبيعات"]] },
  { tag: "أتمتة الأنظمة", kpis: [["[00]", "ساعة عمل موفّرة شهرياً"], ["[+0%]", "سرعة الاستجابة"]] },
  { tag: "موقع إلكتروني", kpis: [["[+0%]", "معدل التحويل"], ["[0s]", "زمن التحميل"]] },
];

const STATS = [
  ["[+00]", "مبيعات حققها عملاؤنا (د.أ)"],
  ["[+00]", "عميل محتمل تم استقطابه"],
  ["[0X]", "متوسط العائد على الإنفاق الإعلاني (ROAS)"],
  ["[00]", "مشروعاً تم إطلاقه"],
];

const TOOLS = ["Next.js", "Supabase", "React", "Flutter", "Meta Ads", "Google Ads", "TikTok Ads", "OpenAI", "Claude", "n8n", "Shopify", "WordPress"];

const PULSE_POINTS = "0,70 380,70 404,70 420,34 444,104 462,70 700,70 716,52 732,88 746,70 1200,70";

export default function Home() {
  return (
    <>
      <header>
        <div className="wrap nav">
          <Brand />
          <ul className="links">
            <li><a href="#services">خدماتنا</a></li>
            <li><a href="#method">منهجيتنا</a></li>
            <li><a href="#work">أعمالنا</a></li>
            <li><a href="#contact">تواصل معنا</a></li>
          </ul>
          <a className="btn btn-primary" href="#contact">احجز استشارة</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <span className="eyebrow">AI · Marketing · Development</span>
              <h1>نمنح مشروعك <em>نبضاً</em> ينمو كل يوم</h1>
              <p className="lead">
                نجمع في فريق واحد خبرات التسويق الرقمي والذكاء الاصطناعي وتطوير المواقع والتطبيقات، لنبني لمشروعك منظومة
                نمو متكاملة تمتد من أول إعلان حتى إتمام عملية البيع، مع قياس دقيق لكل خطوة.
              </p>
              <div className="cta-row">
                <a className="btn btn-primary" href="#contact">ابدأ خطة النمو</a>
                <a className="btn btn-ghost" href="#work">استعرض أعمالنا</a>
              </div>
              <ul className="pillars">
                {SERVICES.map((s) => <li key={s.title}>{s.title}</li>)}
              </ul>
            </div>
          </div>
          <svg className="pulse" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline className="base" strokeWidth="2" points={PULSE_POINTS} />
            <polyline className="run" strokeWidth="4" points={PULSE_POINTS} />
          </svg>
        </section>

        <section id="results" aria-labelledby="results-h">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Results</span>
              <h2 id="results-h">نقيس نجاحنا بنتائج عملائنا</h2>
              <p>لا نكتفي بعدد المشاهدات؛ فمعيارنا الحقيقي هو حجم المبيعات، وعدد العملاء المحتملين، والعائد المتحقق من كل دينار يُنفق على الإعلان.</p>
            </div>
            <div className="stats">
              {STATS.map(([value, label]) => (
                <div className="stat" key={label}><b>{value}</b><span>{label}</span></div>
              ))}
            </div>
            <p className="note">الأرقام بين الأقواس مخصصة لإنجازاتكم الفعلية.</p>
          </div>
        </section>

        <div className="wrap"><div className="divider" /></div>

        <section id="services" aria-labelledby="services-h">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Services</span>
              <h2 id="services-h">خدماتنا</h2>
              <p>خمس خدمات متكاملة يقدمها فريق واحد يعمل نحو هدف واحد: نمو أعمالك.</p>
            </div>
            <div className="services">
              {SERVICES.map((s) => (
                <article className={s.wide ? "svc wide" : "svc"} key={s.title}>
                  <div className="svc-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5A36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.lead}</p>
                  <ul>{s.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="wrap"><div className="divider" /></div>

        <section id="method" aria-labelledby="method-h">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">The PULSE Method</span>
              <h2 id="method-h">منهجية PULSE: خمس مراحل من التشخيص إلى النمو المستدام</h2>
              <p>يسير كل مشروع وفق مسار واضح، لتعرف في كل مرحلة أين وصلنا، وما الخطوة التالية، وما النتيجة المتوقعة.</p>
            </div>
            <ol className="method" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {METHOD.map((m) => (
                <li className="step" key={m.letter}>
                  <span className="letter lat"><i>{m.letter}</i></span>
                  <span className="en">{m.en}</span>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="wrap"><div className="divider" /></div>

        <section id="work" aria-labelledby="work-h">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Case Studies</span>
              <h2 id="work-h">قصص نجاح بالأرقام</h2>
              <p>نماذج من مشاريع نفذناها، والنتائج التي حققناها لعملائنا.</p>
            </div>
            <div className="work">
              {CASES.map((c) => (
                <article className="case" key={c.tag}>
                  <div className="thumb">[صورة المشروع]</div>
                  <span className="tag">{c.tag}</span>
                  <h3>[اسم العميل]: [عبارة تلخّص الإنجاز]</h3>
                  <div className="kpis">
                    {c.kpis.map(([value, label]) => (
                      <div key={label}><b className="ph">{value}</b><span>{label}</span></div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="tools-h" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head" style={{ marginBottom: 20 }}>
              <span className="eyebrow">Stack</span>
              <h2 id="tools-h" style={{ fontSize: "var(--step-2)" }}>التقنيات والأدوات التي نعتمدها</h2>
            </div>
            <ul className="tools" dir="ltr">
              {TOOLS.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </section>

        <div className="wrap"><div className="divider" /></div>

        <section id="contact" aria-labelledby="contact-h">
          <div className="wrap contact">
            <div className="contact-info">
              <div className="sec-head" style={{ margin: 0 }}>
                <span className="eyebrow">Contact</span>
                <h2 id="contact-h">هل أنت مستعد لمنح مشروعك نبضاً جديداً؟</h2>
                <p>احجز جلسة تشخيص مجانية نناقش فيها وضع مشروعك الحالي، والعوائق التي تحدّ من نموه، ونقطة الانطلاق الأنسب.</p>
              </div>
              <div className="info-item"><span>البريد الإلكتروني</span><b className="lat ph" dir="ltr" style={{ textAlign: "right" }}>[citypulse.solutions@gmail.com]</b></div>
              <div className="info-item"><span>الهاتف وواتساب</span><b className="lat ph" dir="ltr" style={{ textAlign: "right" }}>[+962 7X XXX XXXX]</b></div>
              <div className="info-item"><span>العنوان</span><b className="ph">[عمّان، الأردن]</b></div>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <span className="lat" dir="ltr">© {new Date().getFullYear()} City Pulse Solutions</span>
          <span>نبض المدينة للأعمال الرقمية</span>
        </div>
      </footer>
    </>
  );
}
