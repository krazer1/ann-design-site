"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const labels = {
  ru: {
    home: "Главная",
    portfolio: "Портфолио",
    services: "Услуги",
    about: "О дизайнере",
    blog: "Блог",
    contacts: "Контакты",
  },
  en: {
    home: "Home",
    portfolio: "Portfolio",
    services: "Services",
    about: "About",
    blog: "Blog",
    contacts: "Contacts",
  },
} as const;

type Locale = "ru" | "en";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = labels[locale];

  const otherLocale = locale === "ru" ? "en" : "ru";
  const switchHref = pathname?.replace(`/${locale}`, `/${otherLocale}`) ?? "/";

  const items = useMemo(
    () => [
      { key: "home", label: t.home, href: `/${locale}` },
      { key: "portfolio", label: t.portfolio, href: `/${locale}/portfolio` },
      { key: "services", label: t.services, href: `/${locale}/services` },
      { key: "about", label: t.about, href: `/${locale}/about` },
      { key: "blog", label: t.blog, href: `/${locale}/blog` },
      { key: "contacts", label: t.contacts, href: `/${locale}/contacts` },
    ],
    [locale, t]
  );

  const activeKey = useMemo(() => {
    const p = pathname || "";
    if (p === `/${locale}`) return "home";
    if (p.startsWith(`/${locale}/portfolio`)) return "portfolio";
    if (p.startsWith(`/${locale}/services`)) return "services";
    if (p.startsWith(`/${locale}/about`)) return "about";
    if (p.startsWith(`/${locale}/blog`)) return "blog";
    if (p.startsWith(`/${locale}/contacts`)) return "contacts";
    return "home";
  }, [pathname, locale]);

  // Desktop underline
  const navRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  function moveToKey(key: string) {
    const nav = navRef.current;
    const el = linkRefs.current[key];
    if (!nav || !el) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      left: elRect.left - navRect.left,
      width: elRect.width,
      visible: true,
    });
  }

  useEffect(() => {
    const id = window.setTimeout(() => moveToKey(activeKey), 0);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, pathname]);

  useEffect(() => {
    const onResize = () => moveToKey(activeKey);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  // Mobile overlay
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="text-sm font-medium tracking-wide">
          ANNA BAVYKINA
        </Link>

        {/* Desktop nav */}
        <div
          ref={navRef}
          className="relative hidden items-center gap-7 text-sm md:flex"
          onMouseLeave={() => moveToKey(activeKey)}
        >
          <span
            className="pointer-events-none absolute -bottom-2 h-[2px] bg-zinc-900 transition-all duration-300 ease-out"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
              opacity: indicator.visible ? 1 : 0,
            }}
          />

          {items.map((it) => {
            const isActive = it.key === activeKey;
            return (
              <Link
                key={it.key}
                href={it.href}
                ref={(n) => {
                  linkRefs.current[it.key] = n;
                }}
                onMouseEnter={() => moveToKey(it.key)}
                className={
                  isActive
                    ? "text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900 transition-colors duration-200"
                }
              >
                {it.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href={switchHref}
            className="rounded-full border border-zinc-200 px-3 py-2 text-xs uppercase tracking-widest transition hover:border-zinc-900"
          >
            {otherLocale}
          </Link>

          {/* Burger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-5 bg-zinc-900 transition-transform duration-300 ease-out ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[2px] w-5 bg-zinc-900 transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-[2px] w-5 bg-zinc-900 transition-transform duration-300 ease-out ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile overlay меню поверх */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ease-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Panel (под шапкой) */}
        <div
          className={`absolute left-0 right-0 top-[72px] border-t border-zinc-200 bg-white shadow-[0_24px_70px_-40px_rgba(0,0,0,0.45)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <nav className="px-4 py-4">
            {items.map((it) => {
              const isActive = it.key === activeKey;
              return (
                <Link
                  key={it.key}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "block px-2 py-4 text-base transition-colors duration-200",
                    "text-zinc-700 hover:text-zinc-900",
                    isActive ? "font-medium text-zinc-900" : "font-normal",
                  ].join(" ")}
                >
                  {it.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}