import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ANNA BAVYKINA",
  description: "Interior designer portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}