"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // при смене пути увеличиваем key, чтобы перезапустить CSS-анимацию
    setKey((k) => k + 1);
  }, [pathname]);

  return (
    <div key={key} className="page-enter">
      {children}
    </div>
  );
}