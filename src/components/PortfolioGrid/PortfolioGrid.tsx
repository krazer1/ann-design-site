import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type Locale = "ru" | "en";

export function PortfolioGrid({ locale, items }: { locale: Locale; items: Project[] }) {
  const ru = locale === "ru";

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {items.map((p) => {
        const title = ru ? p.title_ru : p.title_en;
        const meta = ru ? p.meta_ru : p.meta_en;

        return (
          <Link
            key={p.slug}
            href={`/${locale}/portfolio/${p.slug}`}
            className="group relative block overflow-hidden rounded-2xl border transition-colors"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "color-mix(in srgb, var(--surface) 80%, transparent)",
            }}
          >
            {/* image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={p.cover}
                alt={title}
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* BASE readability overlay (always, subtle) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

              {/* Extra corner vignette (helps on bright mobile shots) */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_10%_90%,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0)_70%)]" />

              {/* Premium overlay on hover (extra, not the only one) */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0.10), rgba(0,0,0,0))",
                }}
              />

              {/* content */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="translate-y-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/80">
                    {meta}
                  </div>
                </div>

                <div className="mt-2 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-lg font-medium text-white drop-shadow-sm">
                      {title}
                    </div>
                    <div className="mt-1 text-sm text-white/80">
                      {ru ? "Смотреть проект" : "View project"}
                    </div>
                  </div>

                  {/* arrow button */}
                  <div className="translate-y-1 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="arrow-pill flex h-11 w-11 items-center justify-center rounded-full">
                      <span className="text-lg" aria-hidden>
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* bottom */}
            <div className="px-5 py-4">
              <div className="text-sm" style={{ color: "var(--muted)" }}>
                {ru ? "Реализованный интерьер" : "Completed interior"}
              </div>
              <div className="mt-1 text-base font-medium" style={{ color: "var(--text)" }}>
                {title}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}