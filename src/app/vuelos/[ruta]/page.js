"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function VuelosPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  /* 🔥 PARAMS */
  const ruta = typeof params?.ruta === "string" ? params.ruta : "";
  const partes = ruta.includes("-") ? ruta.split("-") : [];

  const origen = partes[0] || "";
  const destino = partes[1] || "";

  const origenCode = origen.toUpperCase().slice(0, 3);
  const destinoCode = destino.toUpperCase().slice(0, 3);

  const ida = searchParams.get("ida");

  /* 🔥 STATE */
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [maxPrecio, setMaxPrecio] = useState(2000);
  const [orden, setOrden] = useState("precio");

  /* 🔥 FETCH */
  useEffect(() => {
    if (!origenCode || !destinoCode || !ida) return;

    const fetchVuelos = async () => {
      try {
        const res = await fetch(
          `/api/vuelos?origen=${origenCode}&destino=${destinoCode}&ida=${ida}`
        );

        const data = await res.json();

        let lista = [];

        if (Array.isArray(data)) lista = data;
        else if (Array.isArray(data.data)) lista = data.data;
        else if (Array.isArray(data.results)) lista = data.results;
        else if (Array.isArray(data.vuelos)) lista = data.vuelos;

        setVuelos(lista);
      } catch (e) {
        console.error("ERROR FETCH:", e);
        setVuelos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVuelos();
  }, [origenCode, destinoCode, ida]);

  /* 🔥 FILTRAR */
  let vuelosFiltrados = Array.isArray(vuelos)
    ? vuelos.filter((v) => {
        const precio = Number(v.precio || 0);
        return precio <= maxPrecio;
      })
    : [];

  /* 🔥 ORDEN */
  vuelosFiltrados.sort((a, b) => {
    if (orden === "precio") {
      return Number(a.precio || 0) - Number(b.precio || 0);
    }
    return 0;
  });

  if (loading) {
    return <div style={center}>Buscando vuelos...</div>;
  }

  return (
    <div style={page}>
      <div style={container}>
        <h2 style={title}>
          {origenCode} → {destinoCode}
        </h2>

        {/* FILTROS */}
        <div style={filtros}>
          <div>
            <input
              type="range"
              min="100"
              max="3000"
              value={maxPrecio}
              onChange={(e) => setMaxPrecio(Number(e.target.value))}
            />
            <div>Hasta USD {maxPrecio}</div>
          </div>

          <select onChange={(e) => setOrden(e.target.value)}>
            <option value="precio">Más barato</option>
          </select>
        </div>

        {/* RESULTADOS */}
        <div style={list}>
          {vuelosFiltrados.length === 0 && (
            <div>No se encontraron vuelos</div>
          )}

          {vuelosFiltrados.map((v, i) => {
            const precio = v.precio;
            const aerolinea = v.aerolinea;
            const salida = v.salida;
            const llegada = v.llegada;

            return (
              <div key={i} style={card}>
                <div style={left}>
                  <div style={horas}>--:-- → --:--</div>

                  <div style={rutaTxt}>
                    {salida} → {llegada}
                  </div>

                  <div style={meta}>
                    {aerolinea} • {v.vuelo}
                  </div>
                </div>

                <div style={right}>
                  <div style={price}>USD {precio}</div>
                  <button style={btn}>Seleccionar</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* 🎨 ESTILOS */

const page = {
  background: "#f1f3f4",
  minHeight: "100vh",
  padding: 40,
};

const container = {
  maxWidth: 900,
  margin: "0 auto",
};

const title = {
  fontSize: 32,
  marginBottom: 20,
};

const filtros = {
  display: "flex",
  gap: 20,
  marginBottom: 30,
  background: "white",
  padding: 15,
  borderRadius: 12,
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: 15,
};

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 20,
  borderRadius: 12,
  background: "white",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
};

const left = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const horas = {
  fontSize: 20,
  fontWeight: "bold",
};

const rutaTxt = {
  fontSize: 14,
  color: "#555",
};

const meta = {
  fontSize: 13,
  color: "#666",
};

const right = {
  textAlign: "right",
};

const price = {
  fontSize: 24,
  fontWeight: "bold",
  color: "#1a73e8",
};

const btn = {
  marginTop: 8,
  background: "#1a73e8",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: 20,
  cursor: "pointer",
};

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};