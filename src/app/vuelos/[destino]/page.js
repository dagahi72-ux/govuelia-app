export default async function Page({ params }) {
  const destino = params.destino;

  return (
    <main>
      <h1>Vuelos a {destino}</h1>
    </main>
  );
}