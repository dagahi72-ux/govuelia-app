export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const origen = searchParams.get("origen");
    const destino = searchParams.get("destino");
    const fecha = searchParams.get("ida");

    // 🔥 TEST: si no hay params → respuesta simple
    if (!origen || !destino || !fecha) {
      return Response.json({
        ok: true,
        message: "API funcionando",
      });
    }

    // 🔑 TU API KEY
    const API_KEY = process.env.AVIATIONSTACK_KEY;

    const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${origen}&arr_iata=${destino}`;

    const res = await fetch(url);
    const data = await res.json();

    const vuelos =
      data?.data?.slice(0, 10).map((v, i) => ({
        id: i,
        aerolinea: v.airline?.name,
        vuelo: v.flight?.iata,
        salida: v.departure?.iata,
        llegada: v.arrival?.iata,
        precio: Math.floor(Math.random() * 900) + 100, // mock precio
        horaSalida: v.departure?.scheduled?.slice(11, 16),
        horaLlegada: v.arrival?.scheduled?.slice(11, 16),
      })) || [];

    return Response.json({ vuelos });

  } catch (error) {
    console.error("ERROR API:", error);

    return Response.json({
      vuelos: [],
      error: "Error en servidor",
    });
  }
}