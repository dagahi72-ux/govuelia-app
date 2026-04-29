"use client";

import { useState } from "react";
import { aeropuertos } from "./vuelos/data/aeropuertos";

/* 🌍 FLAGS */
const getFlag = (country) => {
  const map = {
    Argentina: "🇦🇷",
    España: "🇪🇸",
    Mexico: "🇲🇽",
    USA: "🇺🇸",
    Brasil: "🇧🇷",
    Chile: "🇨🇱",
  };

  return map[country] || "🌍";
};

export default function Home() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  const [sugOri, setSugOri] = useState([]);
  const [sugDes, setSugDes] = useState([]);

  /* 🔍 FILTRO SEGURO (FIX ERROR) */
  const filtrar = (valor) => {
    if (!valor) return [];

    return aeropuertos
      .filter((a) => {
        if (!a) return false;

        const code = (a.code || "").toLowerCase();
        const name = (a.name || "").toLowerCase();

        return (
          code.includes(valor.toLowerCase()) ||
          name.includes(valor.toLowerCase())
        );
      })
      .slice(0, 5);
  };

  /* ✍️ INPUT HANDLERS */
  const handleOrigen = (e) => {
    const valor = e.target.value;
    setOrigen(valor);
    setSugOri(filtrar(valor));
  };

  const handleDestino = (e) => {
    const valor = e.target.value;
    setDestino(valor);
    setSugDes(filtrar(valor));
  };

  /* 🚀 BUSCAR */
  const buscar = () => {
    if (!origen || !destino) return;

    const o = origen.slice(0, 3).toUpperCase();
    const d = destino.slice(0, 3).toUpperCase();

    window.location.href = `/explorar/${o}-${d}?ida=2026-04-22`;
  };

  return (
    <div style={page}>
      <div style={box}>
        <h1 style={title}>✈️ Buscar vuelos</h1>

        {/* ORIGEN */}
        <div style={inputBox}>
          <input
            value={origen}
            onChange={handleOrigen}
            placeholder="Origen"
            style={input}
          />

          {sugOri.length > 0 && (
            <div style={dropdown}>
              {sugOri.map((a, i) => (
                <div
                  key={i}
                  style={item}
                  onClick={() => {
                    setOrigen(a.code);
                    setSugOri([]);
                  }}
                >
                  <span>{getFlag(a.country)}</span>
                  <span style={{ marginLeft: 8 }}>
                    {a.code} - {a.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DESTINO */}
        <div style={inputBox}>
          <input
            value={destino}
            onChange={handleDestino}
            placeholder="Destino"
            style={input}
          />

          {sugDes.length > 0 && (
            <div style={dropdown}>
              {sugDes.map((a, i) => (
                <div
                  key={i}
                  style={item}
                  onClick={() => {
                    setDestino(a.code);
                    setSugDes([]);
                  }}
                >
                  <span>{getFlag(a.country)}</span>
                  <span style={{ marginLeft: 8 }}>
                    {a.code} - {a.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTÓN */}
        <button style={btn} onClick={buscar}>
          Buscar vuelos
        </button>
      </div>
    </div>
  );
}

/* 🎨 ESTILOS */

const page = {
  background: "#f6f7fb",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const box = {
  background: "white",
  padding: 30,
  borderRadius: 16,
  width: 400,
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
};

const title = {
  marginBottom: 20,
};

const inputBox = {
  position: "relative",
  marginBottom: 15,
};

const input = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
};

const dropdown = {
  position: "absolute",
  top: 40,
  width: "100%",
  background: "white",
  borderRadius: 8,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  zIndex: 10,
};

const item = {
  padding: 10,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

const btn = {
  marginTop: 10,
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "none",
  background: "#1a73e8",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};