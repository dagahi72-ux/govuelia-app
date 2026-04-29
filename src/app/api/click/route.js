import { NextResponse } from "next/server";

let clicks = []; // después lo pasamos a Mongo

export async function POST(req) {
  const body = await req.json();

  const click = {
    ...body,
    fecha: new Date(),
  };

  clicks.push(click);

  console.log("💰 CLICK:", click);

  return NextResponse.json({ ok: true });
}