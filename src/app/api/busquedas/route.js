import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const body = await req.json();

    const { error } = await supabase
      .from("busquedas")
      .insert([
        {
          origen: body.origen,
          destino: body.destino,
          fecha: body.fecha,
          precio: body.precio || null,
        },
      ]);

    if (error) throw error;

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error guardando" }, { status: 500 });
  }
}