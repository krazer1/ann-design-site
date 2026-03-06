import Link from "next/link";

type Locale = "ru" | "en";

const labels = {
  ru: {
    aboutText:
      "Премиальный дизайн интерьера в Санкт-Петербурге. Пространства, отражающие вашу индивидуальность.",
    contacts: "Контакты",
    navigation: "Навигация",
    social: "Соцсети",
    nav: {
      portfolio: "Портфолио",
      about: "О дизайнере",
      blog: "Блог",
      contacts: "Контакты",
    },
    copyright: "Все права защищены.",
    location: "Санкт-Петербург, Россия",
  },
  en: {
    aboutText:
      "Premium interior design in Saint Petersburg. Creating spaces that reflect your individuality.",
    contacts: "Contacts",
    navigation: "Navigation",
    social: "Social",
    nav: {
      portfolio: "Portfolio",
      about: "About",
      blog: "Blog",
      contacts: "Contacts",
    },
    copyright: "All rights reserved.",
    location: "Saint Petersburg, Russia",
  },
} as const;

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.85 21 3 13.15 3 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M12 2a6.5 6.5 0 00-2.7 12.4c-.05-.94-.1-2.38.02-3.4.11-.87.7-5.55.7-5.55s-.18-.37-.18-.92c0-.86.5-1.5 1.12-1.5.53 0 .79.4.79.88 0 .54-.34 1.34-.52 2.08-.15.62.31 1.12.92 1.12 1.1 0 1.95-1.16 1.95-2.84 0-1.48-1.07-2.52-2.6-2.52-1.77 0-2.8 1.33-2.8 2.71 0 .54.21 1.12.47 1.44.05.06.06.12.04.19-.04.21-.14.62-.16.71-.02.12-.09.15-.2.09-.75-.35-1.22-1.46-1.22-2.35 0-1.91 1.39-3.67 4.01-3.67 2.1 0 3.74 1.5 3.74 3.5 0 2.08-1.31 3.76-3.13 3.76-.61 0-1.18-.31-1.37-.69l-.38 1.45c-.14.55-.52 1.24-.77 1.67A6.5 6.5 0 1012 2z"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm10 2H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-5 3.5A4.5 4.5 0 1112 16a4.5 4.5 0 010-9zm0 2A2.5 2.5 0 1014.5 12 2.5 2.5 0 0012 9.5zM17.75 6.6a1 1 0 110 2 1 1 0 010-2z"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M21.9 4.6l-3.6 17.2c-.27 1.2-1 1.5-2 1l-5.5-4.1-2.7 2.6c-.3.3-.55.55-1.1.55l.4-6 10.9-9.8c.48-.43-.1-.67-.74-.24L4 14.1l-5.6-1.8c-1.22-.38-1.25-1.22.26-1.8L20 2.7c1.1-.4 2.06.26 1.9 1.9z"
      />
    </svg>
  );
}

export function Footer({ locale }: { locale: Locale }) {
  const t = labels[locale];

  const phoneText = "+7 (923) 614-48-64";
  const phoneHref = "tel:+79236144864";

  const emailText = "fedortsova.ann@gmail.com";
  const emailHref = "mailto:fedortsova.ann@gmail.com";

  const locationText = t.location;

  const instagramHref = "https://www.instagram.com/anny_fedortsova";
  const pinterestHref = "https://pinterest.com/";
  const telegramHref = "https://t.me/anny_bavykina";

  return (
    <footer className="mt-20 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-12 md:grid-cols-12">
          {/* BRAND */}
          <div className="md:col-span-4">
            <div className="text-sm font-medium tracking-wide" style={{ color: "var(--text)" }}>
              ANNA BAVYKINA
            </div>
            <p className="mt-6 max-w-sm text-sm leading-7" style={{ color: "var(--muted)" }}>
              {t.aboutText}
            </p>
          </div>

          {/* CONTACTS */}
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest" style={{ color: "var(--text)" }}>
              {t.contacts}
            </div>
              <div
                className="mt-6 flex flex-col gap-4 text-sm"
                style={{ color: "var(--muted)" }}
              >
                <a
                  href={phoneHref}
                  className="footer-row flex items-start gap-3 break-words"
                >
                  <span className="footer-ico shrink-0" aria-hidden="true">
                    <PhoneIcon />
                  </span>
                  <span>{phoneText}</span>
                </a>

                <a
                  href={emailHref}
                  className="footer-row flex items-start gap-3 break-all"
                >
                  <span className="footer-ico shrink-0" aria-hidden="true">
                    <MailIcon />
                  </span>
                  <span>{emailText}</span>
                </a>

                <div className="flex items-start gap-3">
                  <span className="footer-ico shrink-0" aria-hidden="true">
                    <LocationIcon />
                  </span>
                  <span>{locationText}</span>
                </div>
              </div>
          </div>

          {/* NAV */}
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest" style={{ color: "var(--text)" }}>
              {t.navigation}
            </div>

            <nav className="mt-6 flex flex-col gap-3 text-sm">
              <Link className="footer-link" href={`/${locale}/portfolio`}>
                {t.nav.portfolio}
              </Link>
              <Link className="footer-link" href={`/${locale}/about`}>
                {t.nav.about}
              </Link>
              <Link className="footer-link" href={`/${locale}/blog`}>
                {t.nav.blog}
              </Link>
              <Link className="footer-link" href={`/${locale}/contacts`}>
                {t.nav.contacts}
              </Link>
            </nav>
          </div>

          {/* SOCIAL */}
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest" style={{ color: "var(--text)" }}>
              {t.social}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <a
                className="footer-social"
                href={instagramHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>

              <a
                className="footer-social"
                href={pinterestHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
              >
                <PinIcon />
              </a>

              <a
                className="footer-social"
                href={telegramHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
              >
                <TelegramIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* bottom line */}
      <div className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="text-center text-sm" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} Anna Bavykina. {t.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}