import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectGallery } from "@/components/ProjectGallery/ProjectGallery";
import { ProjectCTA } from "@/components/ProjectCTA/ProjectCTA";

type Locale = "ru" | "en";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const ru = locale === "ru";

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h1 className="text-3xl font-medium">
          {ru ? "Проект не найден" : "Project not found"}
        </h1>
        <Link
          className="mt-6 inline-block link-premium"
          href={`/${locale}/portfolio`}
        >
          ← {ru ? "Вернуться в портфолио" : "Back to portfolio"}
        </Link>
      </div>
    );
  }

  const title = ru ? project.title_ru : project.title_en;
  const meta = ru ? project.meta_ru : project.meta_en;

  const about = ru ? project.about_ru : project.about_en;
  const details = ru ? project.details_ru : project.details_en;

  const images = project.images?.length ? project.images : [project.cover];

  return (
    <div>
      {/* HERO */}
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "var(--muted)" }}
          >
            {ru ? "Проект" : "Project"}
          </div>

          <div className="mt-4 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-medium leading-[0.95] md:text-6xl">
                {title}
              </h1>
              <div className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
                {meta}
              </div>
            </div>

            <Link
              href={`/${locale}/portfolio`}
              className="btn-cta"
            >
              {ru ? "К портфолио" : "Back to portfolio"}
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <ProjectGallery title={title} images={images} />

        {/* About project */}
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div
              className="text-xs uppercase tracking-[0.35em]"
              style={{ color: "var(--muted)" }}
            >
              {ru ? "О проекте" : "About the project"}
            </div>

            <h2 className="mt-4 text-2xl font-medium md:text-3xl">
              {ru ? "Идея, материалы и атмосфера" : "Concept, materials and mood"}
            </h2>

            <p
              className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
              style={{ color: "var(--muted)" }}
            >
              {about ||
                (ru
                  ? "Скоро здесь появится подробное описание: задачи, планировка, материалы, световые сценарии и итог."
                  : "A detailed description will appear here soon: goals, layout, materials, lighting and final result.")}
            </p>
          </div>

          <div className="md:col-span-5">
            <div
              className="rounded-2xl border p-6"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface)",
                boxShadow: "var(--shadow)",
              }}
            >
              <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
                {ru ? "Параметры" : "Details"}
              </div>

              <div className="mt-5 space-y-3">
                {(details?.length ? details : fallbackDetails(meta, ru)).map(
                  (row, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="text-sm" style={{ color: "var(--muted)" }}>
                        {row.label}
                      </div>
                      <div className="text-sm" style={{ color: "var(--text)" }}>
                        {row.value}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Premium CTA below */}
        <ProjectCTA locale={locale} />
      </section>
    </div>
  );
}

function fallbackDetails(meta: string, ru: boolean) {
  return [
    { label: ru ? "Описание" : "Meta", value: meta },
    { label: ru ? "Статус" : "Status", value: ru ? "Реализовано" : "Completed" },
  ];
}