export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
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

    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    const data = await response.json();

    return Response.json({
      source: "travelpayouts",
      data,
    });
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}