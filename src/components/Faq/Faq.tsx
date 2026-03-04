"use client";

import { useId, useState } from "react";

type Item = { q: string; a: string };

export function Faq({ title, items }: { title: string; items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-xs uppercase tracking-[0.35em]" style={{ color: "var(--muted)" }}>
        FAQ
      </div>

      <h2 className="mt-4 text-4xl font-medium md:text-6xl">{title}</h2>

      <div
        className="mt-10 overflow-hidden rounded-2xl border"
        style={{ borderColor: "var(--border)", backgroundColor: "color-mix(in srgb, var(--surface) 60%, transparent)" }}
      >
        {items.map((it, idx) => {
          const isOpen = open === idx;
          const qId = `${baseId}-q-${idx}`;
          const aId = `${baseId}-a-${idx}`;

          return (
            <div
              key={it.q}
              className="border-b last:border-b-0"
              style={{ borderColor: "var(--border)" }}
            >
              <button
                id={qId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={aId}
                onClick={() => setOpen((cur) => (cur === idx ? null : idx))}
                className={[
                  "faq-row w-full text-left",
                  "px-6 py-6 md:px-8 md:py-7",
                  "transition",
                  "focus-visible:outline-none",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="text-lg font-medium md:text-2xl">{it.q}</div>

                  {/* plus/minus icon (animated) */}
                  <span
                    className="relative h-6 w-6 shrink-0"
                    aria-hidden
                    style={{ color: "var(--muted)" }}
                  >
                    <span
                      className={[
                        "absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 rounded-full transition-transform duration-300",
                        isOpen ? "scale-x-100" : "scale-x-100",
                      ].join(" ")}
                      style={{ backgroundColor: "currentColor" }}
                    />
                    <span
                      className={[
                        "absolute left-1/2 top-0 h-6 w-[2px] -translate-x-1/2 rounded-full transition-transform duration-300",
                        isOpen ? "scale-y-0" : "scale-y-100",
                      ].join(" ")}
                      style={{ backgroundColor: "currentColor" }}
                    />
                  </span>
                </div>

                {/* Answer wrapper (animated height via grid trick) */}
                <div
                  id={aId}
                  role="region"
                  aria-labelledby={qId}
                  className={[
                    "grid transition-[grid-template-rows,opacity] duration-400 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <div
                      className="mt-4 max-w-3xl text-base leading-relaxed"
                      style={{ color: "var(--muted)" }}
                    >
                      {it.a}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* styles for hover/tap without JS */}
      <style jsx>{`
        .faq-row {
          -webkit-tap-highlight-color: color-mix(in srgb, var(--accent) 18%, transparent);
        }
        /* desktop hover */
        @media (hover: hover) {
          .faq-row:hover {
            background: var(--hover);
          }
        }
        /* keyboard focus */
        .faq-row:focus-visible {
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 28%, transparent);
        }
      `}</style>
    </section>
  );
}