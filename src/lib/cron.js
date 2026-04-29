import cron from "node-cron";
import { connectDB } from "@/lib/mongodb";
import Alerta from "@/models/Alerta";

export const startCron = () => {
  console.log("🕒 Cron iniciado");

  // cada 1 minuto (para test)
  cron.schedule("* * * * *", async () => {
    console.log("🔍 Revisando precios...");

    await connectDB();

    const alertas = await Alerta.find();

    for (const alerta of alertas) {
      // 🔥 SIMULACIÓN (después conectamos API real)
      const precioActual = Math.floor(Math.random() * 1000);

      console.log(
        `✈️ ${alerta.origen}-${alerta.destino} | actual: ${precioActual} | objetivo: ${alerta.precioObjetivo}`
      );

      if (precioActual <= alerta.precioObjetivo) {
        console.log("💰 BAJÓ DE PRECIO!!!");

        // acá después mandamos email
      }
    }
  });
};