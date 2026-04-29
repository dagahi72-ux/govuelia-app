const res = await fetch(
  `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?originSkyId=${origen}-sky&destinationSkyId=${destino}-sky&date=${fecha}`,
  {
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
    },
  }
);