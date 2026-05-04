export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    mensaje: "SI VES ESTO, YA FUNCIONA"
  });
}