export const dynamic = "force-dynamic";

export async function GET() {
  console.log("🔥 API VUELOS EJECUTANDO");

  return Response.json({
    test: "VUELOS FUNCIONANDO",
    vuelos: [
      { id: 1, precio: 999 },
      { id: 2, precio: 850 }
    ]
  });
}