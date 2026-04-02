import axios from "axios";

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API,
    units: "metric", // celsius için
    lang: "tr",      // türkçe açıklama
  },
});

export default weatherApi;