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
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="text-xs uppercase tracking-[0.35em] text-zinc-500">
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

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {ru
              ? "Прозрачные этапы, аккуратный дизайн и внимание к деталям. Выберите формат — от полного проекта до отдельных задач."
              : "Clear stages, careful design and attention to details. Choose a format—from full project to individual tasks."}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/contacts`}
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-7 py-4 text-sm text-white transition hover:opacity-90"
            >
              {ru ? "Получить консультацию" : "Get a consultation"}
            </Link>

            <Link
              href={`/${locale}/portfolio`}
              className="inline-flex items-center justify-center rounded-full border border-zinc-900 px-7 py-4 text-sm transition hover:bg-zinc-900 hover:text-white"
            >
              {ru ? "Смотреть проекты" : "View projects"}
            </Link>
          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10">
          {services.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-zinc-200 bg-white p-7 md:p-10"
            >
              <div className="grid gap-10 md:grid-cols-12 md:items-start">
                <div className="md:col-span-7">
                  <h2 className="text-2xl font-medium md:text-3xl">
                    {ru ? s.title_ru : s.title_en}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-zinc-600 md:text-lg">
                    {ru ? s.desc_ru : s.desc_en}
                  </p>

                  <ul className="mt-6 space-y-2 text-sm text-zinc-600">
                    {(ru ? s.includes_ru : s.includes_en).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-5">
                  <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-sm text-zinc-500">
                        {ru ? "Стоимость" : "Price"}
                      </div>
                      <div className="text-sm font-medium text-zinc-900">
                        {ru ? s.price_ru : s.price_en}
                      </div>
                    </div>

                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div className="text-sm text-zinc-500">
                        {ru ? "Сроки" : "Timeline"}
                      </div>
                      <div className="text-sm font-medium text-zinc-900">
                        {ru ? s.timeline_ru : s.timeline_en}
                      </div>
                    </div>

                    <Link
                      href={`/${locale}/contacts`}
                      className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm text-white transition hover:opacity-90"
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