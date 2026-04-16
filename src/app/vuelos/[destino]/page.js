"use client";

export default function Home() {
  return (
    <main style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #0f172a, #1e293b)",
      color: "white",
      fontFamily: "Arial"
    }}>
      <h1 style={{fontSize: "48px"}}>✈️ Govuelia</h1>

      <p style={{marginTop: "10px"}}>
        Encontrá vuelos baratos al mejor precio
      </p>

      <a href="/vuelos/madrid">
        <button style={{
          marginTop: "20px",
          padding: "14px 28px",
          background: "#3b82f6",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer"
        }}>
          🔍 Buscar vuelos
        </button>
      </a>
    </main>
  );
}