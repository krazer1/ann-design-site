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
type Theme = "light" | "dark";

function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(next: Theme) {
  const root = document.documentElement;

  // Включаем плавность ТОЛЬКО на время переключения
  root.classList.add("theme-transition");
  window.setTimeout(() => root.classList.remove("theme-transition"), 260);

  if (next === "dark") root.classList.add("dark");
  else root.classList.remove("dark");

  localStorage.setItem("theme", next);
}

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

  // Theme UI state
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  const isDark = theme === "dark";

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "color-mix(in srgb, var(--bg) 80%, transparent)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium tracking-wide"
          style={{ color: "var(--text)" }}
        >
          ANNA BAVYKINA
        </Link>

        {/* Desktop nav */}
        <div
          ref={navRef}
          className="relative hidden items-center gap-7 text-sm md:flex"
          onMouseLeave={() => moveToKey(activeKey)}
        >
          <span
            className="pointer-events-none absolute -bottom-2 h-[2px] transition-all duration-300 ease-out"
            style={{
              backgroundColor: "var(--accent)",
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
              opacity: indicator.visible ? 1 : 0,
            }}
          />

          {items.map((it) => {
            const isActiveLink = it.key === activeKey;
            return (
              <Link
                key={it.key}
                href={it.href}
                ref={(n) => {
                  linkRefs.current[it.key] = n;
                }}
                onMouseEnter={() => moveToKey(it.key)}
                className="transition-colors duration-200"
                style={{ color: isActiveLink ? "var(--text)" : "var(--muted)" }}
              >
                {it.label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            type="button"
            aria-label="Toggle theme"
            title={isDark ? "Light theme" : "Dark theme"}
            onClick={() => {
              const next: Theme = isDark ? "light" : "dark";
              applyTheme(next);
              setTheme(next);
            }}
            className="rounded-full border px-3 py-2 text-xs uppercase tracking-widest transition-colors duration-200"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            }}
          >
            {isDark ? "☀" : "☾"}
          </button>

          <Link
            href={switchHref}
            className="rounded-full border px-3 py-2 text-xs uppercase tracking-widest transition-colors duration-200"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--hover)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
            }}
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
                className={`absolute left-0 top-0 h-[2px] w-5 transition-transform duration-300 ease-out ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
                style={{ backgroundColor: "var(--text)" }}
              />
              <span
                className={`absolute left-0 top-[7px] h-[2px] w-5 transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
                style={{ backgroundColor: "var(--text)" }}
              />
              <span
                className={`absolute left-0 bottom-0 h-[2px] w-5 transition-transform duration-300 ease-out ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
                style={{ backgroundColor: "var(--text)" }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* 
          Backdrop:
          - закрывает меню по тапу/клику в “пустую область”
          - стоит ПОД панелью, но НАД страницей
        */}
        <button
          type="button"
          aria-label="Close menu"
          className={`absolute inset-0 transition-opacity duration-500 ease-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "color-mix(in srgb, #000 35%, transparent)" }}
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute left-0 right-0 top-[72px] border-t transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg)",
            boxShadow: "var(--shadow)",
          }}
        >
          {/* 
            Делегирование клика:
            Если нажали на любой пункт (или внутри него) — закрываем меню.
            Это надёжнее, чем onClick на каждом Link, и не ломается от вложенных span и т.п.
          */}
          <nav
            className="px-2 py-2"
            onClick={(e) => {
              const target = e.target as HTMLElement | null;
              if (!target) return;
              const a = target.closest("a");
              if (a) setOpen(false);
            }}
          >
            {items.map((it) => {
              const isActiveLink = it.key === activeKey;

              return (
                <Link
                  key={it.key}
                  href={it.href}
                  className={[
                    "block rounded-xl px-4 py-4 text-base transition-colors duration-200",
                    "focus-visible:outline-none",
                  ].join(" ")}
                  style={{
                    color: isActiveLink ? "var(--text)" : "var(--muted)",
                    fontWeight: isActiveLink ? 500 : 400,
                  }}
                >
                  {it.label}
                </Link>
              );
            })}
          </nav>

          {/* Hover/focus подсветка пунктов без JS */}
          <style jsx>{`
            nav :global(a:hover) {
              background: var(--hover);
              color: var(--text) !important;
            }
            nav :global(a:active) {
              background: color-mix(in srgb, var(--hover) 70%, transparent);
            }
            nav :global(a:focus-visible) {
              background: var(--hover);
              outline: 2px solid color-mix(in srgb, var(--accent) 45%, transparent);
              outline-offset: 2px;
            }
          `}</style>
        </div>
      </div>
    </header>
  );
}