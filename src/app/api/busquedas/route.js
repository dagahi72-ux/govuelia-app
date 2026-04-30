import { prisma } from "../../../lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const busqueda = await prisma.busqueda.create({
      data: {
        origen: body.origen,
        destino: body.destino,
        fecha: body.fecha,
        precio: body.precio || null,
      },
    });

    return Response.json(busqueda);
  } catch (error) {
    return Response.json({ error: "Error guardando" }, { status: 500 });
  }
}