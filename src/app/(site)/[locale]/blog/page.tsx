import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/blog";
import { tinyBlurDataURL } from "@/lib/blur";

type Locale = "ru" | "en";

function formatDate(dateISO: string, locale: Locale) {
  const d = new Date(dateISO);
  return d.toLocaleDateString(locale === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const ru = locale === "ru";

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div>
      {/* HERO как на других страницах */}
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div
            className="text-xs uppercase tracking-[0.35em]"
            style={{ color: "var(--muted)" }}
          >
            {ru ? "Блог" : "Blog"}
          </div>

          <h1 className="mt-6 text-5xl font-medium leading-[0.95] md:text-7xl">
            {ru ? (
              <>
                Полезные
                <br />
                советы
              </>
            ) : (
              <>
                Notes &
                <br />
                insights
              </>
            )}
          </h1>

          <p
            className="mt-10 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--muted)" }}
          >
            {ru
              ? "Короткие статьи про интерьер, архитектуру и детали, которые делают пространство дороже."
              : "Short articles about interior design, architecture and details that make a space feel more premium."}
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {sorted.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/blog/${p.slug}`}
              className={[
                "group overflow-hidden rounded-2xl border transition",
                "hover:-translate-y-[1px]",
              ].join(" ")}
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--surface)",
                boxShadow: "var(--shadow)",
              }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.cover}
                  alt={ru ? p.title_ru : p.title_en}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                  placeholder="blur"
                  blurDataURL={tinyBlurDataURL()}
                />

                {/* мягкая вуаль на hover (в обеих темах) */}
                <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/12" />

                {/* нижний градиент как штрих */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/22 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>

              <div className="p-6 md:p-7">
                <div
                  className="text-xs uppercase tracking-[0.35em]"
                  style={{ color: "var(--muted)" }}
                >
                  {formatDate(p.date, locale)}
                </div>

                <h2 className="mt-3 text-2xl font-medium leading-tight">
                  {ru ? p.title_ru : p.title_en}
                </h2>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {ru ? p.excerpt_ru : p.excerpt_en}
                </p>

                <div
                  className="mt-6 inline-flex items-center gap-2 text-sm"
                  style={{ color: "var(--text)" }}
                >
                  {ru ? "Читать" : "Read"}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}