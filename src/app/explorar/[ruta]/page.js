"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";

export default function ExplorarRutaPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const ruta = params?.ruta || "EZE-MAD";
  const [origen, destino] = ruta.split("-");

  const fecha = searchParams.get("ida") || "2026-05-04";

  const [vuelos, setVuelos] = useState([]);
  const [source, setSource] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 🔎 FETCH VUELOS
  useEffect(() => {
    async function fetchVuelos() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/vuelos?origen=${origen}&destino=${destino}&ida=${fecha}`
        );

        const data = await res.json();

        setVuelos(data.vuelos || []);
        setSource(data.source || "unknown");
      } catch (err) {
        console.error("Error cargando vuelos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchVuelos();
  }, [origen, destino, fecha]);

  // 🔔 CREAR ALERTA
  async function crearAlerta() {
    try {
      await fetch("/api/alertas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origen,
          destino,
          precio: 500,
          email: "test@mail.com",
        }),
      });

      alert("✅ Alerta creada");
    } catch (err) {
      alert("❌ Error creando alerta");
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>
        ✈️ {origen} → {destino}
      </h1>
      <p>📅 {fecha}</p>

      {/* 🔄 LOADING */}
      {loading && <p>Buscando vuelos...</p>}

      {/* ❌ ERROR */}
      {error && <p style={{ color: "red" }}>Error cargando vuelos</p>}

      {/* ⚠️ SOURCE */}
      {!loading && source !== "real" && (
        <p style={{ color: "orange" }}>
          Mostrando precios estimados
        </p>
      )}

      {/* ✈️ LISTADO */}
      {!loading && vuelos.length === 0 ? (
        <p>No se encontraron vuelos, probando alternativas...</p>
      ) : (
        <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
          {vuelos.map((vuelo) => (
            <div
              key={vuelo.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                background: "#fafafa",
              }}
            >
              <h3>
                {vuelo.origen} → {vuelo.destino}
              </h3>
              <p>✈️ {vuelo.aerolinea}</p>
              <p>💰 ${vuelo.precio}</p>
              <p>⏱️ {vuelo.duracion}</p>
              <p>
                {vuelo.escalas === 0
                  ? "Directo"
                  : `${vuelo.escalas} escala(s)`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 🔔 BOTÓN ALERTA */}
      <button
        onClick={crearAlerta}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🔔 Crear alerta de precio
      </button>
    </div>
  );
}