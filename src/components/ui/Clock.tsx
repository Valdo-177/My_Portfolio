"use client";

import { useEffect, useState } from "react";

/** Hora local de Barranquilla (America/Bogota) en tipografía pixel. */
export default function Clock({ className }: { className?: string }) {
  const [now, setNow] = useState<string>("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-CO", {
      timeZone: "America/Bogota",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {now}
    </span>
  );
}
