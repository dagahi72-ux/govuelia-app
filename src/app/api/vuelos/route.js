export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);

  const origen = url.searchParams.get("origen") || "EZE";
  const destino = url.searchParams.get("destino") || "MAD";

  const token = process.env.TRAVELPAYOUTS_API_TOKEN;

  const apiUrl =
    `https://api.travelpayouts.com/v1/prices/direct` +
    `?origin=${origen}` +
    `&destination=${destino}` +
    `&currency=usd` +
    `&token=${token}`;

  const response = await fetch(apiUrl);

  const text = await response.text();

  return Response.json({
    status: response.status,
    respuesta: text,
  });
}