import Link from "next/link";
import { SITE, links } from "@/config/site";

// Icons
import { FiInstagram, FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { PiPinterestLogoLight } from "react-icons/pi";
import { FaTelegramPlane } from "react-icons/fa";

export function Footer({ locale }: { locale: "ru" | "en" }) {
  const ru = locale === "ru";

  return (
    <footer className="mt-20 border-t border-zinc-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="text-sm font-medium tracking-wide">{SITE.brand}</div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-600">
            {ru ? SITE.taglineRu : SITE.taglineEn}
          </p>
        </div>

        {/* Contacts */}
        <div>
          <div className="text-sm font-medium uppercase tracking-wider text-zinc-900">
            {ru ? "Контакты" : "Contacts"}
          </div>

          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li className="flex items-start gap-3">
              <FiPhone className="mt-0.5 h-4 w-4 text-zinc-700" />
              <a className="hover:text-zinc-900" href={links.tel}>
                {SITE.phoneDisplay}
              </a>
            </li>

            <li className="flex items-start gap-3">
              <FiMail className="mt-0.5 h-4 w-4 text-zinc-700" />
              <a className="hover:text-zinc-900" href={links.mail}>
                {SITE.email}
              </a>
            </li>

            <li className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 h-4 w-4 text-zinc-700" />
              <span>{ru ? SITE.cityRu : SITE.cityEn}</span>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <div className="text-sm font-medium uppercase tracking-wider text-zinc-900">
            {ru ? "Навигация" : "Navigation"}
          </div>

          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>
              <Link className="hover:text-zinc-900" href={`/${locale}/portfolio`}>
                {ru ? "Портфолио" : "Portfolio"}
              </Link>
            </li>
            <li>
              <Link className="hover:text-zinc-900" href={`/${locale}/about`}>
                {ru ? "О дизайнере" : "About"}
              </Link>
            </li>
            <li>
              <Link className="hover:text-zinc-900" href={`/${locale}/blog`}>
                {ru ? "Блог" : "Blog"}
              </Link>
            </li>
            <li>
              <Link className="hover:text-zinc-900" href={`/${locale}/contacts`}>
                {ru ? "Контакты" : "Contacts"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <div className="text-sm font-medium uppercase tracking-wider text-zinc-900">
            {ru ? "Социальные сети" : "Social"}
          </div>

          <div className="mt-4 flex gap-3">
            <a
              href={links.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center border border-zinc-200 text-zinc-800 transition hover:border-zinc-900 hover:bg-zinc-50"
              aria-label="Instagram"
              title="Instagram"
            >
              <FiInstagram className="h-5 w-5" />
            </a>

            <a
              href={links.pinterest}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center border border-zinc-200 text-zinc-800 transition hover:border-zinc-900 hover:bg-zinc-50"
              aria-label="Pinterest"
              title="Pinterest"
            >
              <PiPinterestLogoLight className="h-6 w-6" />
            </a>

            <a
              href={links.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center border border-zinc-200 text-zinc-800 transition hover:border-zinc-900 hover:bg-zinc-50"
              aria-label="Telegram"
              title="Telegram"
            >
              <FaTelegramPlane className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-zinc-600">
          © {new Date().getFullYear()} Anna Bavykina.{" "}
          {ru ? "Все права защищены." : "All rights reserved."}
        </div>
      </div>
    </footer>
  );
}