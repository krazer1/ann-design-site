"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const imgs = useMemo(() => (images || []).filter(Boolean), [images]);

  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef<{ startX: number; dx: number; isDown: boolean }>({
    startX: 0,
    dx: 0,
    isDown: false,
  });

  const count = imgs.length;

  function prev() {
    setIndex((i) => Math.max(0, i - 1));
  }
  function next() {
    setIndex((i) => Math.min(count - 1, i + 1));
  }

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open !== null) {
        if (e.key === "Escape") setOpen(null);
        if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : Math.min(count - 1, i + 1)));
        if (e.key === "ArrowLeft") setOpen((i) => (i === null ? null : Math.max(0, i - 1)));
      } else {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, count]);

  // lock scroll for lightbox
  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // drag/swipe only on image area
  function onPointerDown(e: React.PointerEvent) {
    drag.current = { startX: e.clientX, dx: 0, isDown: true };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.isDown) return;
    drag.current.dx = e.clientX - drag.current.startX;

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(calc(${-index * 100}% + ${drag.current.dx}px))`;
      trackRef.current.style.transition = "none";
    }
  }
  function onPointerUp() {
    if (!drag.current.isDown) return;
    const dx = drag.current.dx;
    drag.current.isDown = false;

    if (trackRef.current) {
      trackRef.current.style.transition = "";
      trackRef.current.style.transform = `translateX(${-index * 100}%)`;
    }

    const threshold = 60;
    if (dx > threshold) prev();
    if (dx < -threshold) next();
  }

  return (
    <>
      {/* Slider */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        {/* draggable image area */}
        <div
          className="relative select-none touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            ref={trackRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${-index * 100}%)` }}
          >
            {imgs.map((src, i) => (
              <button
                key={src + i}
                type="button"
                className="relative w-full shrink-0"
                onClick={() => setOpen(i)}
                aria-label={`Open image ${i + 1}`}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={src}
                    alt={`${title} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1100px"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI1IiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              disabled={index === 0}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-900 transition hover:border-zinc-900 disabled:opacity-40"
              aria-label="Previous"
            >
              ←
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              disabled={index === count - 1}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-900 transition hover:border-zinc-900 disabled:opacity-40"
              aria-label="Next"
            >
              →
            </button>
          </div>

          {/* Counter */}
          <div className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white">
            {index + 1} / {count}
          </div>
        </div>
      </div>

      {/* Thumbs */}
      <div className="mt-5 grid grid-cols-3 gap-3 md:grid-cols-6">
        {imgs.map((src, i) => (
          <button
            key={"thumb" + src + i}
            type="button"
            onClick={() => setIndex(i)}
            className={[
              "relative overflow-hidden rounded-xl border bg-white",
              i === index ? "border-zinc-900" : "border-zinc-200 hover:border-zinc-400",
            ].join(" ")}
          >
            <div className="relative aspect-[4/3]">
              <Image src={src} alt={`${title} thumb ${i + 1}`} fill className="object-cover" sizes="200px" loading="lazy" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open !== null ? (
        <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm">
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            onClick={() => setOpen(null)}
            aria-label="Close"
          />

          <div className="absolute left-1/2 top-1/2 w-[min(1100px,92vw)] -translate-x-1/2 -translate-y-1/2">
            <div className="relative overflow-hidden rounded-2xl bg-black">
              <div className="relative aspect-[16/10]">
                <Image src={imgs[open]} alt={title} fill className="object-contain" sizes="92vw" />
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-sm text-white/80">
                <div>
                  {open + 1} / {count}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-white/20 px-4 py-2 text-white/90 hover:bg-white/10 disabled:opacity-40"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen((i) => Math.max(0, (i ?? 0) - 1));
                    }}
                    disabled={open === 0}
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    className="rounded-full border border-white/20 px-4 py-2 text-white/90 hover:bg-white/10 disabled:opacity-40"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen((i) => Math.min(count - 1, (i ?? 0) + 1));
                    }}
                    disabled={open === count - 1}
                  >
                    →
                  </button>

                  <button
                    type="button"
                    className="rounded-full border border-white/20 px-4 py-2 text-white/90 hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(null);
                    }}
                  >
                    Esc
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