"use client";

export default function Page({ params }) {
  const destino = params.destino;

  return (
    <main style={{padding: "40px"}}>
      <h1>Vuelos baratos a {destino}</h1>

      <p>Encontrá vuelos al mejor precio</p>

      <button onClick={() => 
        window.open(`https://www.google.com/search?q=vuelos+a+${destino}`, "_blank")
      }>
        Buscar vuelos
      </button>
    </main>
  );
}