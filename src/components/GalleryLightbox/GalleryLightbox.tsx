"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export function GalleryLightbox({ images, title }: { images: string[]; title: string }) {
  const imgs = useMemo(() => (images || []).filter(Boolean), [images]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isOpen = openIndex !== null;
  const current = isOpen ? imgs[openIndex!] : null;

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? null : (i + 1) % imgs.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? null : (i - 1 + imgs.length) % imgs.length));
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, imgs.length]);

  return (
    <>
      {/* Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {imgs.map((src, idx) => (
          <button
            key={src + idx}
            type="button"
            onClick={() => setOpenIndex(idx)}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={src}
                alt={`${title} ${idx + 1}`}
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/10" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && current ? (
        <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
          />

          <div className="absolute left-1/2 top-1/2 w-[min(1100px,92vw)] -translate-x-1/2 -translate-y-1/2">
            <div className="relative overflow-hidden rounded-2xl bg-black">
              <div className="relative aspect-[16/10]">
                <Image src={current} alt={title} fill className="object-contain" sizes="92vw" />
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-sm text-white/80">
                <div>
                  {openIndex! + 1} / {imgs.length}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-white/20 px-4 py-2 text-white/90 hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenIndex((i) => (i === null ? null : (i - 1 + imgs.length) % imgs.length));
                    }}
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    className="rounded-full border border-white/20 px-4 py-2 text-white/90 hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenIndex((i) => (i === null ? null : (i + 1) % imgs.length));
                    }}
                  >
                    →
                  </button>

                  <button
                    type="button"
                    className="rounded-full border border-white/20 px-4 py-2 text-white/90 hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenIndex(null);
                    }}
                  >
                    {`Esc`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}