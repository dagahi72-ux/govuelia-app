import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarEmail({ to, origen, destino, precio }) {
  try {
    await resend.emails.send({
      from: "Vuelia <onboarding@resend.dev>",
      to,
      subject: `🔥 Vuelo barato ${origen} → ${destino}`,
      html: `
        <h2>Encontramos un vuelo barato ✈️</h2>
        <p>${origen} → ${destino}</p>
        <p><strong>USD ${precio}</strong></p>
        <p>Entrá a la app y reservá antes que suba 👇</p>
      `,
    });
  } catch (error) {
    console.error("Error enviando email:", error);
  }
}