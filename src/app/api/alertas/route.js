import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const alerta = await prisma.alerta.create({
      data: {
        origen: body.origen,
        destino: body.destino,
        fecha: body.fecha,
        precioObjetivo: body.precioObjetivo,
        email: body.email,
      },
    });

    return Response.json(alerta);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error creando alerta" }, { status: 500 });
  }
}