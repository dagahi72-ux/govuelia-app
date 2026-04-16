export default function Page(props) {
  const destino = props.params.destino;

  return (
    <main>
      <h1>Vuelos a {destino}</h1>
    </main>
  );
}