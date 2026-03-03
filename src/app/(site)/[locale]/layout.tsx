import type { ReactNode } from "react";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";

type Locale = "ru" | "en";

function toLocale(raw: string): Locale {
  return raw === "ru" || raw === "en" ? raw : "ru";
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);

  return (
    <ThemeProvider>
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </ThemeProvider>
  );
}