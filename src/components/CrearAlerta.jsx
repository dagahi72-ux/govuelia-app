"use client";

import { useState } from "react";

export default function CrearAlerta() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const crearAlerta = async () => {
    if (!email) {
      alert("Ingresá un email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/alertas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origen: "EZE",
          destino: "MAD",
          fecha: "2026-04-24",
          precioObjetivo: 800,
          email,
        }),
      });

      if (!res.ok) throw new Error("Error al crear alerta");

      alert("Alerta creada 🚀");
      setEmail("");
    } catch (error) {
      console.error(error);
      alert("Hubo un error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <input
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={crearAlerta} disabled={loading}>
        {loading ? "Creando..." : "Crear alerta"}
      </button>
    </div>
  );
}