export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);

  const origen = url.searchParams.get("origen") || "EZE";
  const destino = url.searchParams.get("destino") || "MAD";
  const fecha = url.searchParams.get("ida") || "2026-05-04";

  return Response.json({
    vuelos: [
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
    ],
    source: "FIXED",
  });
}