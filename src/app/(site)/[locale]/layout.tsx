import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { PageTransition } from "@/components/PageTransition/PageTransition";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "ru" | "en" }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale} />

      <main>
        <PageTransition>{children}</PageTransition>
      </main>

      <Footer locale={locale} />
    </>
  );
}