export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.TRAVELPAYOUTS_API_TOKEN;

  return Response.json({
    tokenEncontrado: !!token,
    longitud: token ? token.length : 0,
  });
}