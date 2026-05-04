import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("alertas")
      .insert([
        {
          origen: body.origen,
          destino: body.destino,
          precio_objetivo: body.precio,
          email: body.email,
        },
      ])
      .select();

    if (error) throw error;

    return Response.json({ ok: true, alerta: data[0] });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: err.message });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("alertas")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ ok: false });
  }

  return Response.json({ alertas: data });
}