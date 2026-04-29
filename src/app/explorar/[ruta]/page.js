"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

/* 🔗 LINKS AFILIADOS (opcionales) */
const getFlightLink = (origen, destino, ida, vuelta) => {
  return `https://www.skyscanner.net/transport/flights/${origen}/${destino}/${ida}/${vuelta || ""}/?affiliateId=TU_ID`;
};

const getHotelLink = (nombre) => {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
    nombre
  )}&aid=TU_ID`;
};

const [orden, setOrden] = useState("mejor");
const [maxDuracion, setMaxDuracion] = useState(2000);

export default function ExplorarPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  /* 🔥 PARAMS */
  const ruta = typeof params?.ruta === "string" ? params.ruta : "";
  const [ori, des] = ruta.split("-");

  const origenCode = (ori || "").toUpperCase();
  const destinoCode = (des || "").toUpperCase();

  const ida = searchParams.get("ida");
  const vuelta = searchParams.get("vuelta");

  /* 🔥 STATE */
  const [vuelos, setVuelos] = useState([]);
  const [hoteles, setHoteles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [maxPrecio, setMaxPrecio] = useState(2000);
  const [tipoAlojamiento, setTipoAlojamiento] = useState("todos");

  /* 🔥 FETCH (SIN LOOP) */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const [resVuelos, resHoteles] = await Promise.all([
          fetch("/api/vuelos"), // 🔥 usa el endpoint que ya probaste
          fetch(`/api/hoteles?destino=${destinoCode}`),
        ]);

        const dataVuelos = await resVuelos.json();
        const dataHoteles = await resHoteles.json();

        console.log("✈️ vuelos 👉", dataVuelos);
        console.log("🏨 hoteles 👉", dataHoteles);

        setVuelos(dataVuelos.vuelos || []);
        setHoteles(dataHoteles.hoteles || []);
      } catch (e) {
        console.error("❌ ERROR FETCH:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []); // ✅ IMPORTANTE: array vacío (evita loop)

  /* 🔥 FILTROS */
  const vuelosFiltrados = vuelos
  .filter((v) => v.precio <= maxPrecio)
  .filter((v) => v.duracion <= maxDuracion)
  .sort((a, b) => {
    if (orden === "barato") return a.precio - b.precio;
    if (orden === "rapido") return a.duracion - b.duracion;

    // mejor (balance)
    return a.precio + a.duracion * 0.5 - (b.precio + b.duracion * 0.5);
  });

  const hotelesFiltrados = hoteles.filter((h) => {
    if (tipoAlojamiento === "todos") return true;
    return (h.tipo || "").toLowerCase().includes(tipoAlojamiento);
  });

  if (loading) {
    return <div style={center}>Cargando viaje...</div>;
  }

  return (
    <div style={page}>
      <div style={container}>
        {/* HEADER */}
        <div style={header}>
          <h1 style={title}>
            ✈️ {origenCode} → {destinoCode}
          </h1>

          <div style={filtros}>
            <input
              type="range"
              min="100"
              max="3000"
              value={maxPrecio}
              onChange={(e) => setMaxPrecio(Number(e.target.value))}
            />
            <span>Hasta USD {maxPrecio}</span>

            <select
              value={tipoAlojamiento}
              onChange={(e) => setTipoAlojamiento(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="hotel">Hotel</option>
              <option value="hostel">Hostel</option>
              <option value="departamento">Departamento</option>
              <option value="posada">Posada</option>
            </select>
          </div>
        </div>
        <select value={orden} onChange={(e) => setOrden(e.target.value)}>
  <option value="mejor">Mejor</option>
  <option value="barato">Más barato</option>
  <option value="rapido">Más rápido</option>
</select>

<input
  type="range"
  min="60"
  max="2000"
  value={maxDuracion}
  onChange={(e) => setMaxDuracion(Number(e.target.value))}
/>
<span>Duración máx: {maxDuracion} min</span>

        {/* ✈️ VUELOS */}
        <h2 style={section}>Vuelos {vuelta && "(Ida y vuelta)"}</h2>

        <div style={list}>
          {vuelosFiltrados.length === 0 && (
            <div>No hay vuelos disponibles</div>
          )}

          {vuelosFiltrados.map((v, i) => (
            <div key={i} style={flightCard}>
              <div>
                <div style={horas}>
                  {v.horaSalida} → {v.horaLlegada}
                </div>
                <div>
                  {v.origen} → {v.destino}
                </div>
                <div style={meta}>{v.aerolinea}</div>
              </div>

              <div style={right}>
                <div style={price}>{v.precio}</div>

                <button
                  style={btn}
                  onClick={() => {
                    const link = getFlightLink(
                      origenCode,
                      destinoCode,
                      ida,
                      vuelta
                    );
                    window.open(link, "_blank");
                  }}
                >
                  Ver vuelo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 🏨 HOSPEDAJES */}
        <h2 style={section}>Hospedajes</h2>

        {hotelesFiltrados.length === 0 && (
          <div>No hay hospedajes disponibles</div>
        )}

        <div style={grid}>
          {hotelesFiltrados.map((h, i) => (
            <div key={i} style={hotelCard}>
              <img src={h.imagen} style={img} alt={h.nombre} />

              <div style={{ padding: 10 }}>
                <div style={hotelName}>{h.nombre}</div>

                <div style={meta}>
                  {h.tipo} • ⭐ {h.rating}
                </div>

                <div style={hotelFooter}>
                  <div style={price}>USD {h.precio}</div>

                  <button
                    style={btn}
                    onClick={() => {
                      const link = getHotelLink(h.nombre);
                      window.open(link, "_blank");
                    }}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 🎨 ESTILOS */

const page = { background: "#f6f7fb", minHeight: "100vh", padding: 30 };
const container = { maxWidth: 1100, margin: "0 auto" };

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
};

const title = { fontSize: 26 };

const filtros = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  background: "white",
  padding: 10,
  borderRadius: 10,
};

const section = { marginTop: 30, marginBottom: 10 };

const list = { display: "flex", flexDirection: "column", gap: 10 };

const flightCard = {
  display: "flex",
  justifyContent: "space-between",
  background: "white",
  padding: 15,
  borderRadius: 10,
};

const horas = { fontWeight: "bold" };
const meta = { fontSize: 12, color: "#666" };

const right = { textAlign: "right" };

const price = { fontWeight: "bold", color: "#1a73e8" };

const btn = {
  marginTop: 5,
  background: "#1a73e8",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: 20,
  cursor: "pointer",
};

/* 🏨 */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 20,
};

const hotelCard = {
  background: "white",
  borderRadius: 10,
  overflow: "hidden",
};

const img = {
  width: "100%",
  height: 140,
  objectFit: "cover",
};

const hotelName = { fontWeight: "bold" };

const hotelFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 10,
};

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};