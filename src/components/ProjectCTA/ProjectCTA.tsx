"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Locale = "ru" | "en";

export function ProjectCTA({ locale }: { locale: Locale }) {
  const ru = locale === "ru";
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "mt-16 rounded-2xl border border-zinc-200 bg-white px-6 py-10 md:px-10 md:py-12",
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      ].join(" ")}
    >
      <div className="grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-8">
          <div className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            {ru ? "Следующий шаг" : "Next step"}
          </div>

          <h3 className="mt-4 text-2xl font-medium leading-tight md:text-3xl">
            {ru ? "Понравился этот проект?" : "Like this project?"}
          </h3>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600">
            {ru
              ? "Давайте создадим интерьер, который отражает ваш стиль и образ жизни. Первая консультация бесплатна."
              : "Let’s create an interior that reflects your style and lifestyle. The first consultation is free."}
          </p>
        </div>

        <div className="md:col-span-4 md:flex md:justify-end">
          <Link
            href={`/${locale}/contacts`}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-zinc-900 px-7 py-4 text-sm text-white transition hover:opacity-90 md:w-auto"
          >
            {ru ? "Обсудить проект" : "Discuss a project"}
            <span className="text-lg transition-transform group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}