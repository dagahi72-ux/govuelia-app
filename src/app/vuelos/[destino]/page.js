"use client";

import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();

  const destino = pathname.split("/vuelos/")[1];

  return (
    <main>
      <h1>Vuelos a {destino}</h1>
    </main>
  );
}