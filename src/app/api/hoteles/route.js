export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const destino = searchParams.get("destino");

  // 🔥 mock + listo para afiliados
  const hoteles = [
    {
      id: 1,
      nombre: "Hotel Gran Madrid",
      tipo: "Hotel",
      rating: 4.5,
      precio: 120,
      imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      link: `https://www.booking.com/searchresults.html?ss=${destino}`,
    },
    {
      id: 2,
      nombre: "Apartamento Centro",
      tipo: "Departamento",
      rating: 4.2,
      precio: 90,
      imagen: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      link: `https://www.airbnb.com/s/${destino}/homes`,
    },
    {
      id: 3,
      nombre: "Hostel Low Cost",
      tipo: "Hostel",
      rating: 3.8,
      precio: 45,
      imagen: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
      link: `https://www.booking.com/searchresults.html?ss=${destino}`,
    },
  ];

  return Response.json({ hoteles });
}