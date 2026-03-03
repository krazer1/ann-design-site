"use client";

import React, { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme"); // "light" | "dark" | null
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

    const shouldDark = saved ? saved === "dark" : Boolean(prefersDark);
    if (shouldDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    setMounted(true);
  }, []);

  // Не убиваем дерево (иначе могут сбрасываться эффекты/состояния),
  // просто прячем до применения темы — без мигания
  if (!mounted) return <div style={{ visibility: "hidden" }}>{children}</div>;

  return <>{children}</>;
}