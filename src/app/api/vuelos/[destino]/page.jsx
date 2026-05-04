{loading ? (
  <p>Buscando vuelos...</p>
) : (
  <div>
    {source !== "real" && (
      <p style={{ color: "orange" }}>
        Mostrando precios estimados
      </p>
    )}

    {vuelos.map((vuelo) => (
      <div key={vuelo.id}>
        ✈️ {vuelo.origen} → {vuelo.destino}
        <p>{vuelo.aerolinea}</p>
        <p>${vuelo.precio}</p>
      </div>
    ))}
  </div>
)}