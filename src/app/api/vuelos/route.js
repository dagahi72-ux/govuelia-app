export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    timestamp: Date.now(),
    commitTest: "NUEVO-CODIGO-2026",
    token: process.env.TRAVELPAYOUTS_API_TOKEN || null,
  });
}