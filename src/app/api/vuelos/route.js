export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.TRAVELPAYOUTS_API_TOKEN;

  return Response.json({
    tokenPrimeros5: token?.substring(0, 5),
    tokenUltimos5: token?.slice(-5),
    longitud: token?.length,
  });
}