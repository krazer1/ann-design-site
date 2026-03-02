import Image from "next/image";
import Link from "next/link";

import { projects } from "@/data/projects";
import { PortfolioGrid } from "@/components/PortfolioGrid/PortfolioGrid";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "ru" | "en" }>;
}) {
  const { locale } = await params;
  const ru = locale === "ru";

  return (
    <div>
      {/* HERO full-bleed */}
      <section className="relative h-[calc(100vh-72px)] min-h-[680px] w-full overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero.jpg"
          alt="Interior"
          fill
          priority
          className="object-cover"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-6xl px-4">
          <div className="flex max-w-3xl flex-col justify-end pb-14 md:pb-16">
            <p className="mb-5 text-xs tracking-[0.35em] text-white/80 uppercase">
              {ru ? "Премиальный дизайн интерьера" : "Premium interior design"}
            </p>

            <h1 className="text-5xl font-medium leading-[0.95] text-white md:text-7xl">
              {ru ? (
                <>
                  Пространства,
                  <br />
                  которые
                  <br />
                  вдохновляют
                </>
              ) : (
                <>
                  Spaces that inspire
                </>
              )}
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              {ru
                ? "Создаю уникальные интерьеры премиум-класса, отражающие индивидуальность и стиль жизни моих клиентов."
                : "I create premium interiors that reflect the individuality and lifestyle of my clients."}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/portfolio`}
                className="inline-flex items-center justify-center gap-3 rounded-none bg-white px-6 py-4 text-sm text-zinc-900 transition hover:bg-white/90"
              >
                {ru ? "Смотреть портфолио" : "View portfolio"}
                <span aria-hidden className="text-lg">
                  →
                </span>
              </Link>

              <Link
                href={`/${locale}/contacts`}
                className="inline-flex items-center justify-center rounded-none border border-white/70 bg-transparent px-6 py-4 text-sm text-white transition hover:bg-white/10"
              >
                {ru ? "Обсудить проект" : "Discuss a project"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-2xl md:text-3xl">
            {ru ? "Избранные проекты" : "Selected projects"}
          </h2>

          <Link
            href={`/${locale}/portfolio`}
            className="text-sm text-zinc-600 hover:text-zinc-900"
          >
            {ru ? "Все проекты" : "All projects"}
          </Link>
        </div>

        <div className="mt-8">
          <PortfolioGrid locale={locale} items={projects} />
        </div>
      </section>
    </div>
  );
}