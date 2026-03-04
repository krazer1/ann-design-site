import Link from "next/link";
import { projects } from "@/data/projects";
import { PortfolioGrid } from "@/components/PortfolioGrid/PortfolioGrid";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: "ru" | "en" }>;
}) {
  const { locale } = await params;
  const ru = locale === "ru";

  return (
    <div>
      {/* HERO (как на Contacts) */}
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <div
                className="text-xs uppercase tracking-[0.35em]"
                style={{ color: "var(--muted)" }}
              >
                {ru ? "Портфолио" : "Portfolio"}
              </div>

              <h1 className="mt-6 text-5xl font-medium leading-[0.95] md:text-7xl">
                {ru ? (
                  <>
                    Реализованные
                    <br />
                    проекты
                  </>
                ) : (
                  <>
                    Completed
                    <br />
                    projects
                  </>
                )}
              </h1>

              <p
                className="mt-10 max-w-2xl text-base leading-relaxed md:text-lg"
                style={{ color: "var(--muted)" }}
              >
                {ru
                  ? "Коллекция реализованных интерьеров: квартиры, дома и коммерческие пространства."
                  : "A curated collection of completed interiors: apartments, houses and commercial spaces."}
              </p>
            </div>

            <Link href={`/${locale}/contacts`} className="btn-cta">
              {ru ? "Обсудить проект" : "Discuss a project"}
            </Link>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <PortfolioGrid locale={locale} items={projects} />
      </section>
    </div>
  );
}