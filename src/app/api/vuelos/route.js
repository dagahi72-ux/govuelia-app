export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const origen = searchParams.get("origen");
  const destino = searchParams.get("destino");
  const fecha = searchParams.get("ida");

  return Response.json({
    vuelos: generarVuelosFake(origen, destino, fecha),
    source: "fake"
  });
}

function generarVuelosFake(origen, destino, fecha) {
  const aerolineas = ["Iberia", "Air Europa", "LATAM", "Level"];

  return Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    origen,
    destino,
    fecha,
    aerolinea: aerolineas[Math.floor(Math.random() * aerolineas.length)],
    precio: 700 + Math.floor(Math.random() * 300),
    duracion: `${10 + Math.floor(Math.random() * 3)}h`,
    escalas: Math.random() > 0.5 ? 0 : 1,
  }));
}