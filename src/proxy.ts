import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ru", "en"] as const;
const defaultLocale = "ru";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // пропускаем системные пути
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // если уже есть /ru или /en — ок
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // иначе редирект на /ru
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};