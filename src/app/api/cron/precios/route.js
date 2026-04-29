import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const alertas = await prisma.alerta.findMany();

    for (const alerta of alertas) {
      // 🔥 Acá después conectamos tu API de vuelos
      const precioActual = await obtenerPrecio(alerta);

      if (precioActual <= alerta.precioObjetivo) {
        console.log("Enviar alerta a:", alerta.email);
        // await enviarEmail(...)
      }
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error en cron" }, { status: 500 });
  }
}