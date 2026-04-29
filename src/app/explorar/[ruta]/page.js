"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function ExplorarPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // 🧠 RUTA SEGURA
  const ruta = params?.ruta || "";
  const partes = ruta.split("-");

  const origenCode = partes[0]?.toUpperCase() || "";
  const destinoCode = partes[1]?.toUpperCase() || "";

  const ida = searchParams.get("ida") || "";

  // 🔥 STATE
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 FETCH SEGURO
  useEffect(() => {
    if (!origenCode || !destinoCode) return;

    const fetchVuelos = async () => {
      try {
        const res = await fetch(
          `/api/vuelos?origen=${origenCode}&destino=${destinoCode}&ida=${ida}`
        );

        const data = await res.json();

        setVuelos(data?.vuelos || []);
      } catch (error) {
        console.error("Error cargando vuelos:", error);
        setVuelos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVuelos();
  }, [origenCode, destinoCode, ida]);

  // ⏳ LOADING
  if (loading) {
    return <div style={center}>Cargando vuelos...</div>;
  }

  // ❌ RUTA INVÁLIDA
  if (!origenCode || !destinoCode) {
    return <div style={center}>Ruta inválida</div>;
  }

  return (
    <div style={page}>
      <div style={container}>
        <h1 style={title}>
          ✈️ {origenCode} → {destinoCode}
        </h1>

        <div style={list}>
          {vuelos.length > 0 ? (
            vuelos.map((v, i) => (
              <div key={i} style={card}>
                <div>
                  <div style={horas}>
                    {v.horaSalida || "--:--"} →{" "}
                    {v.horaLlegada || "--:--"}
                  </div>

                  <div style={meta}>
                    {v.salida || origenCode} →{" "}
                    {v.llegada || destinoCode}
                  </div>

                  <div style={meta}>
                    {v.aerolinea || "Aerolínea"}
                  </div>
                </div>

                <div style={right}>
                  <div style={price}>USD {v.precio || 0}</div>

                  <button
                    style={btn}
                    onClick={() => {
                      const link = `https://www.skyscanner.net/transport/flights/${origenCode}/${destinoCode}/${ida}`;
                      window.open(link, "_blank");
                    }}
                  >
                    Ver oferta
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No hay vuelos disponibles</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* 🎨 ESTILOS */

const page = {
  background: "#f6f7fb",
  minHeight: "100vh",
  padding: 30,
};

const container = {
  maxWidth: 900,
  margin: "0 auto",
};

const title = {
  fontSize: 26,
  marginBottom: 20,
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const card = {
  display: "flex",
  justifyContent: "space-between",
  background: "white",
  padding: 15,
  borderRadius: 10,
};

const horas = {
  fontWeight: "bold",
};

const meta = {
  fontSize: 12,
  color: "#666",
};

const right = {
  textAlign: "right",
};

const price = {
  fontWeight: "bold",
  color: "#1a73e8",
};

const btn = {
  marginTop: 5,
  background: "#1a73e8",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: 20,
  cursor: "pointer",
};

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};