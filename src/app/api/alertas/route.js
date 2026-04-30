import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const alertas = await prisma.alerta.findMany();
    return Response.json(alertas);
  } catch (error) {
    console.error("ERROR GET ALERTAS:", error);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const alerta = await prisma.alerta.create({
      data: body,
    });

    return Response.json(alerta);
  } catch (error) {
    console.error("ERROR POST ALERTA:", error);
    return Response.json({ error: "Error creando alerta" }, { status: 500 });
  }
}