"use client";

import { useState } from "react";

export default function Home() {
  const [destino, setDestino] = useState("");

  const buscar = () => {
  const limpio = destino.trim().toLowerCase();

  if (limpio !== "") {
    window.location.href = `/vuelos/${limpio}`;
  }
};

  return (
    <main style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #0f172a, #1e293b)",
      color: "white",
      fontFamily: "Arial"
    }}>
      <div style={{ textAlign: "center" }}>
        
        <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
          ✈️ Govuelia
        </h1>

        <p style={{ marginBottom: "30px", color: "#cbd5f5" }}>
          Encontrá vuelos baratos en segundos
        </p>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Ej: Madrid, Miami, Roma..."
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          style={{
            padding: "12px",
            width: "250px",
            borderRadius: "8px",
            border: "none",
            marginRight: "10px"
          }}
        />

        {/* BOTÓN */}
        <button
          onClick={buscar}
          style={{
            padding: "12px 20px",
            background: "#3b82f6",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer"
          }}
        >
          🔍 Buscar
        </button>

      </div>
    </main>
  );
}