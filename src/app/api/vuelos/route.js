export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const origen = searchParams.get("origen") || "EZE";
    const destino = searchParams.get("destino") || "MAD";
    const fecha = searchParams.get("ida");

    const token = process.env.TRAVELPAYOUTS_API_TOKEN;

    if (!token) {
      return Response.json({
        error: "Token no encontrado"
      });
    }

    let apiUrl =
      `https://api.travelpayouts.com/aviasales/v3/prices_for_dates` +
      `?origin=${origen}` +
      `&destination=${destino}` +
      `&currency=usd` +
      `&sorting=price` +
      `&direct=false` +
      `&limit=20`;

    if (fecha) {
      apiUrl += `&departure_at=${fecha}`;
    }

    apiUrl += `&token=${token}`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    return Response.json({
      source: "AVIASALES",
      data
    });

  } catch (error) {
    return Response.json({
      error: error.message
    });
  }
}