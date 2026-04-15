"use client";

export default function Page({ params }) {
  const destino = params.destino;

  return (
    <main>
      <h1>Vuelos a {destino}</h1>

      <button onClick={() => 
        window.open(`https://www.google.com/search?q=vuelos+a+${destino}`, "_blank")
      }>
        Buscar vuelos
      </button>
    </main>
  );
}
