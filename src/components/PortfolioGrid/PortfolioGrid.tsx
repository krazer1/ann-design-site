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
            className="group relative block overflow-hidden rounded-2xl border border-zinc-200 bg-white"
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

              {/* overlay on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

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
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-zinc-900 transition hover:bg-zinc-900 hover:text-white">
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
              <div className="text-sm text-zinc-500">
                {ru ? "Реализованный интерьер" : "Completed interior"}
              </div>
              <div className="mt-1 text-base font-medium text-zinc-900">{title}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}