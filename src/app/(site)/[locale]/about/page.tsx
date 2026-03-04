import Image from "next/image";
import Link from "next/link";

type Locale = "ru" | "en";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const ru = locale === "ru";

  const values = ru
    ? [
        { k: "Подход", v: "Минимализм, функциональность, сценарии жизни." },
        { k: "Фокус", v: "Качество планировки, свет, материалы, детали." },
        {
          k: "Коммуникация",
          v: "Прозрачные этапы, регулярные созвоны, фиксация решений.",
        },
      ]
    : [
        { k: "Approach", v: "Minimalism, functionality, lifestyle scenarios." },
        { k: "Focus", v: "Layout quality, light, materials, details." },
        {
          k: "Communication",
          v: "Clear stages, regular updates, decisions documented.",
        },
      ];

  const steps = ru
    ? [
        { t: "Бриф и задача", d: "Созвон, сбор референсов, анализ потребностей и бюджета." },
        { t: "Концепция", d: "Планировка, стилистика, подбор материалов и решений." },
        { t: "Визуализация", d: "3D-визуализации ключевых зон, корректировки." },
        { t: "Чертежи", d: "Полный пакет для реализации и подрядчиков." },
        { t: "Сопровождение", d: "Авторский надзор и комплектация (по запросу)." },
      ]
    : [
        { t: "Brief", d: "Call, references, needs & budget." },
        { t: "Concept", d: "Layout, style direction, materials & key decisions." },
        { t: "Visualization", d: "3D visuals of main areas, iterations." },
        { t: "Drawings", d: "Full set for implementation and contractors." },
        { t: "Supervision", d: "Author supervision & procurement (optional)." },
      ];

  return (
    <div>
      {/* HERO */}
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "var(--muted)" }}
          >
            {ru ? "О дизайнере" : "About"}
          </div>

          <div className="mt-6 grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <h1 className="text-5xl font-medium leading-[0.95] md:text-7xl">
                {ru ? (
                  <>
                    Анна
                    <br />
                    Бавыкина
                  </>
                ) : (
                  <>
                    Anna
                    <br />
                    Bavykina
                  </>
                )}
              </h1>

              <p
                className="mt-10 max-w-2xl text-base leading-relaxed md:text-lg"
                style={{ color: "var(--muted)" }}
              >
                {ru
                  ? "Дизайн интерьера и архитектура в Санкт-Петербурге. Создаю спокойные, тёплые и функциональные пространства — от концепции до реализации."
                  : "Interior design & architecture in Saint Petersburg. I create calm, warm and functional spaces — from concept to implementation."}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href={`/${locale}/portfolio`} className="btn-cta-outline">
                  {ru ? "Смотреть портфолио" : "View portfolio"}
                </Link>

                <Link href={`/${locale}/contacts`} className="btn-cta">
                  {ru ? "Обсудить проект" : "Discuss a project"}
                </Link>
              </div>
            </div>

            {/* Photo */}
            <div className="md:col-span-5">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-2xl border"
                style={{ borderColor: "var(--border)" }}
              >
                <Image
                  src="/images/about.jpg"
                  alt={ru ? "Анна Бавыкина" : "Anna Bavykina"}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
                {ru ? "Санкт-Петербург" : "Saint Petersburg"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div
              className="text-xs uppercase tracking-[0.35em]"
              style={{ color: "var(--muted)" }}
            >
              {ru ? "Принципы" : "Principles"}
            </div>
            <h2 className="mt-4 text-3xl font-medium leading-tight md:text-4xl">
              {ru ? "Делаю дизайн понятным" : "I make design clear"}
            </h2>
            <p
              className="mt-6 text-base leading-relaxed md:text-lg"
              style={{ color: "var(--muted)" }}
            >
              {ru
                ? "Хороший интерьер — это логика, комфорт и атмосфера. Я проектирую под вашу жизнь: маршруты, хранение, световые сценарии и материалы."
                : "A good interior is logic, comfort and mood. I design around your life: routes, storage, lighting scenarios and materials."}
            </p>
          </div>

          <div className="md:col-span-7">
            <div
              className="rounded-2xl border p-8"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface)",
                boxShadow: "var(--shadow)",
              }}
            >
              <div className="space-y-6">
                {values.map((x) => (
                  <div
                    key={x.k}
                    className="grid gap-2 border-b pb-6 last:border-b-0 last:pb-0"
                    style={{ borderColor: "color-mix(in srgb, var(--border) 60%, transparent)" }}
                  >
                    <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
                      {x.k}
                    </div>
                    <div className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {x.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "var(--muted)" }}
          >
            {ru ? "Процесс" : "Process"}
          </div>
          <h2 className="mt-4 text-3xl font-medium md:text-4xl">
            {ru ? "Как мы будем работать" : "How we’ll work"}
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {steps.map((s, i) => (
              <div
                key={s.t}
                className="rounded-2xl border p-7"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div
                  className="text-xs uppercase tracking-[0.35em]"
                  style={{ color: "var(--muted)" }}
                >
                  {ru ? `Этап ${i + 1}` : `Step ${i + 1}`}
                </div>
                <div className="mt-3 text-lg font-medium" style={{ color: "var(--text)" }}>
                  {s.t}
                </div>
                <div className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {s.d}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href={`/${locale}/services`} className="btn-cta-outline">
              {ru ? "Посмотреть услуги" : "View services"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}