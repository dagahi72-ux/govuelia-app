export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const origen = searchParams.get("origen") || "EZE";
  const destino = searchParams.get("destino") || "MAD";
  const fecha = searchParams.get("ida") || "2026-05-04";

  const vuelos = [
    {
      id: 1,
      aerolinea: "Iberia",
      vuelo: "IB6844",
      salida: origen,
      llegada: destino,
      horaSalida: "22:30",
      horaLlegada: "14:10",
      precio: 899,
      fecha,
    },
    {
      id: 2,
      aerolinea: "LATAM",
      vuelo: "LA705",
      salida: origen,
      llegada: destino,
      horaSalida: "18:45",
      horaLlegada: "09:20",
      precio: 940,
      fecha,
    },
  ];

  return Response.json({
    vuelos,
    source: "FIXED"
  });
}