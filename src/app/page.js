"use client";

import { useState } from "react";

export default function Home() {
  const [destino, setDestino] = useState("");

  const buscar = () => {
    if (!destino) return;
    const url = `https://www.google.com/search?q=vuelos+a+${destino}`;
    window.open(url, "_blank");
  };

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "white",
      fontFamily: "Arial",
      textAlign: "center",
      padding: "20px"
    }}>
      
      <h1 style={{fontSize: "48px", marginBottom: "10px"}}>
        ✈️ Govuelia
      </h1>

      <h2 style={{fontSize: "22px", color: "#cbd5f5", marginBottom: "30px"}}>
        Encontrá vuelos baratos y viajá al mejor precio
      </h2>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Ej: Madrid, Brasil, Miami..."
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          width: "250px",
          marginBottom: "15px",
          fontSize: "16px"
        }}
      />

      {/* BOTÓN */}
      <button 
        onClick={buscar}
        style={{
          padding: "14px 28px",
          fontSize: "16px",
          background: "#3b82f6",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
          boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
        }}
      >
        🔍 Buscar vuelos
      </button>

      <p style={{marginTop: "40px", color: "#94a3b8"}}>
        Compará precios de cientos de aerolíneas en segundos
      </p>

    </main>
  );
}
