"use client";

import { useState } from "react";

export default function CrearAlerta() {
  const [email, setEmail] = useState("");

  const crearAlerta = async () => {
    await fetch("/api/alertas", {
      method: "POST",
      body: JSON.stringify({
        origen: "EZE",
        destino: "MAD",
        fecha: "2026-04-24",
        precioObjetivo: 800,
        email,
      }),
    });

    alert("Alerta creada 🚀");
  };

  return (
    <div style={{ marginTop: 20 }}>
      <input
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={crearAlerta}>
        Crear alerta
      </button>
    </div>
  );
}