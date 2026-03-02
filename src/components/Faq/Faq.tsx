"use client";

import { useState } from "react";

type Item = { q: string; a: string };

export function Faq({ title, items }: { title: string; items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-xs uppercase tracking-[0.35em] text-zinc-500">FAQ</div>
      <h2 className="mt-4 text-4xl font-medium md:text-6xl">{title}</h2>

      <div className="mt-10 divide-y divide-zinc-200">
        {items.map((it, idx) => {
          const isOpen = open === idx;
          return (
            <button
              key={it.q}
              type="button"
              className="w-full py-7 text-left"
              onClick={() => setOpen((cur) => (cur === idx ? null : idx))}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="text-xl font-medium md:text-2xl">{it.q}</div>
                <div className="text-2xl text-zinc-500">{isOpen ? "−" : "+"}</div>
              </div>
              {isOpen && (
                <div className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">
                  {it.a}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}