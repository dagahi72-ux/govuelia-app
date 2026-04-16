export default function Page({ params }) {
  return (
    <main>
      <h1>Vuelos a {params.destino}</h1>
    </main>
  );
}