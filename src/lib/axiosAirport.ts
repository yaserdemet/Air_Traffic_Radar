import axios from "axios";

const airportApi = axios.create({
  baseURL: "https://aerodatabox.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
  },
});

export default airportApi;
