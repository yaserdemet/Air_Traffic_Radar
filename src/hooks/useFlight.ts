import api from "@/lib/axios";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const useFlight = (options?: Partial<UseQueryOptions<any, Error>>) => {
  return useQuery({
    queryKey: ["getFlights"],
    queryFn: async () => {
      try {
        const response = await api.get("/states/all");
        if (response.status !== 200) {
          throw new Error("Error fetching flights");
        }
        return response.data;
      } catch (error) {
        console.error("Error fetching flights:", error);
        throw error;
      }
    },
    staleTime: 60000,
    ...options
  });
};
