export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const origen = searchParams.get("origen");
    const destino = searchParams.get("destino");
    const fecha = searchParams.get("ida");

    // 🧪 TEST SIMPLE (para verificar API online)
    if (!origen || !destino) {
      return Response.json({
        ok: true,
        message: "API funcionando",
      });
    }

    const API_KEY = process.env.AVIATIONSTACK_KEY;

    if (!API_KEY) {
      return Response.json({
        vuelos: [],
        error: "Falta API KEY",
      });
    }

    // 🔥 REQUEST A AVIATIONSTACK
    const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${origen}&arr_iata=${destino}`;

    const res = await fetch(url);
    const data = await res.json();

    // 🔍 NORMALIZACIÓN SEGURA
    const vuelos =
      data?.data?.slice(0, 10).map((v, i) => ({
        id: i,
        aerolinea: v.airline?.name || "Aerolínea",
        vuelo: v.flight?.iata || "N/A",
        salida: v.departure?.iata || origen,
        llegada: v.arrival?.iata || destino,
        horaSalida: v.departure?.scheduled
          ? v.departure.scheduled.slice(11, 16)
          : "--:--",
        horaLlegada: v.arrival?.scheduled
          ? v.arrival.scheduled.slice(11, 16)
          : "--:--",

        // 💰 precio mock (aviationstack no trae precios)
        precio: Math.floor(Math.random() * 900) + 100,
      })) || [];

    return Response.json({ vuelos });

  } catch (error) {
    console.error("ERROR API VUELOS:", error);

    return Response.json({
      vuelos: [],
      error: "Error en servidor",
    });
  }
}