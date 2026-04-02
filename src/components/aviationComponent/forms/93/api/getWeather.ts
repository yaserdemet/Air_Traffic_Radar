import weatherApi from "@/lib/axiosWeather";

export const weatherService = {
  getByCity: async (city: string) => {
    try {
      const response = await weatherApi.get(`/weather?q=${city}`);
      if (response.status !== 200) {
        throw new Error("Error fetching weather");
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  },
  getByLatLon: async (lat: string, lon: string) => {
    try {
      const response = await weatherApi.get(`/weather?lat=${lat}&lon=${lon}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  },
};
