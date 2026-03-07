import Link from "next/link";
import { services } from "@/data/services";

type Locale = "ru" | "en";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const ru = locale === "ru";

  return (
    <div>
      {/* HERO */}
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "var(--muted)" }}
          >
            {ru ? "Услуги" : "Services"}
          </div>

          <h1 className="mt-6 text-5xl font-medium leading-[0.95] md:text-7xl">
            {ru ? (
              <>
                Что я могу
                <br />
                сделать для вас
              </>
            ) : (
              <>
                How I can
                <br />
                help you
              </>
            )}
          </h1>

          <p
            className="mt-10 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--muted)" }}
          >
            {ru
              ? "Прозрачные этапы, аккуратный дизайн и внимание к деталям. Выберите формат — от полного проекта до отдельных задач."
              : "Clear stages, careful design and attention to details. Choose a format—from full project to individual tasks."}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/contacts`} className="btn-cta">
              {ru ? "Получить консультацию" : "Get a consultation"}
            </Link>

            <Link
              href={`/${locale}/portfolio`}
              className="btn-cta-outline inline-flex items-center justify-center"
            >
              {ru ? "Смотреть проекты" : "View projects"}
            </Link>
          </div>
        </div>
      </section>

      {/* WORK PROCESS */}
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 py-20">

          <div
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "var(--muted)" }}
          >
            {ru ? "Этапы работы" : "Work process"}
          </div>

          <h2 className="mt-6 text-4xl font-medium md:text-6xl">
            {ru ? "Как проходит создание проекта" : "How the project is created"}
          </h2>

          <div className="mt-16 grid gap-14 md:grid-cols-2">

            {/* 01 */}
            <div className="flex gap-6">
              <div className="text-4xl font-medium" style={{ color: "var(--accent)" }}>
                01
              </div>
              <div>
                <h3 className="text-xl font-medium">
                  {ru ? "Первичная консультация" : "Initial consultation"}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {ru
                    ? "Знакомство и обсуждение задач проекта. Определяем пожелания к интерьеру, сроки реализации и ориентировочный бюджет. После согласования заключается договор."
                    : "Introduction and discussion of the project goals. We define interior preferences, timeline and approximate budget before signing the agreement."}
                </p>
              </div>
            </div>

            {/* 02 */}
            <div className="flex gap-6">
              <div className="text-4xl font-medium" style={{ color: "var(--accent)" }}>
                02
              </div>
              <div>
                <h3 className="text-xl font-medium">
                  {ru
                    ? "Сбор информации и техническое задание"
                    : "Research and technical brief"}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {ru
                    ? "Проводятся обмеры и фотофиксация объекта. Формируется подробное техническое задание: функциональные зоны, стиль интерьера и ориентировочный бюджет."
                    : "Measurements and photo documentation of the space. A detailed technical brief is created including functionality, style preferences and budget."}
                </p>
              </div>
            </div>

            {/* 03 */}
            <div className="flex gap-6">
              <div className="text-4xl font-medium" style={{ color: "var(--accent)" }}>
                03
              </div>
              <div>
                <h3 className="text-xl font-medium">
                  {ru ? "Планировочное решение" : "Planning solution"}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {ru
                    ? "Разрабатываются варианты планировки с учетом эргономики и архитектуры пространства. После обсуждения утверждается финальный вариант."
                    : "Several layout options are developed based on ergonomics and architecture. After discussion the final layout is approved."}
                </p>
              </div>
            </div>

            {/* 04 */}
            <div className="flex gap-6">
              <div className="text-4xl font-medium" style={{ color: "var(--accent)" }}>
                04
              </div>
              <div>
                <h3 className="text-xl font-medium">
                  {ru ? "3D-визуализация интерьера" : "3D visualization"}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {ru
                    ? "Создаются фотореалистичные визуализации будущего интерьера на основе утвержденной планировки, референсов и выбранной стилистики."
                    : "Photorealistic 3D visuals are created based on the approved layout, references and chosen style."}
                </p>
              </div>
            </div>

            {/* 05 */}
            <div className="flex gap-6">
              <div className="text-4xl font-medium" style={{ color: "var(--accent)" }}>
                05
              </div>
              <div>
                <h3 className="text-xl font-medium">
                  {ru ? "Рабочая документация" : "Working documentation"}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {ru
                    ? "Подготавливается полный комплект рабочих чертежей и спецификаций материалов, мебели, освещения и оборудования для точной реализации проекта."
                    : "A full set of drawings and specifications is prepared for contractors to accurately implement the project."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10">
          {services.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border p-7 md:p-10"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface)",
                boxShadow: "var(--shadow)",
              }}
            >
              <div className="grid gap-10 md:grid-cols-12 md:items-start">
                {/* TEXT */}
                <div className="md:col-span-7">
                  <h2 className="text-2xl font-medium md:text-3xl">
                    {ru ? s.title_ru : s.title_en}
                  </h2>

                  <p
                    className="mt-4 text-base leading-relaxed md:text-lg"
                    style={{ color: "var(--muted)" }}
                  >
                    {ru ? s.desc_ru : s.desc_en}
                  </p>

                  <ul
                    className="mt-6 space-y-2 text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    {(ru ? s.includes_ru : s.includes_en).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: "var(--text)" }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PRICE */}
                <div className="md:col-span-5">
                  <div
                    className="rounded-2xl border p-6"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "var(--surface-2)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="text-sm"
                        style={{ color: "var(--muted)" }}
                      >
                        {ru ? "Стоимость" : "Price"}
                      </div>
                      <div className="text-sm font-medium">
                        {ru ? s.price_ru : s.price_en}
                      </div>
                    </div>

                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div
                        className="text-sm"
                        style={{ color: "var(--muted)" }}
                      >
                        {ru ? "Сроки" : "Timeline"}
                      </div>
                      <div className="text-sm font-medium">
                        {ru ? s.timeline_ru : s.timeline_en}
                      </div>
                    </div>

                    <Link
                      href={`/${locale}/contacts`}
                      className="btn-cta mt-6 w-full justify-center"
                    >
                      {ru ? "Оставить заявку" : "Request"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}