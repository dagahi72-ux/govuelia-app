export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const origen = searchParams.get("origen") || "EZE";
  const destino = searchParams.get("destino") || "MAD";
  const fecha = searchParams.get("ida") || "2026-05-04";

  return Response.json({
    vuelos: [
      {
        id: 1,
        origen,
        destino,
        fecha,
        aerolinea: "Iberia",
        precio: 899,
        duracion: "11h",
        escalas: 0,
      },
      {
        id: 2,
        origen,
        destino,
        fecha,
        aerolinea: "LATAM",
        precio: 940,
        duracion: "12h",
        escalas: 1,
      },
    ],
    source: "FIXED"
  });
}