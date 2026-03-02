import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

type Locale = "ru" | "en";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = params.locale === "en" ? "en" : "ru";

  return (
    <>
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  );
}