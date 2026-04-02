import React from "react";
import { createContext, useContext, useState } from "react";
import { dataFlight } from "@/components/aviationComponent/forms/92/data";
type FlightData = {
  id: number;
  callSign: string;
  aircraftType: string;
  squawk: string;
  departure: string;
  arrival: string;
  inAir: boolean;
  flightPurpose: string;
  flightType: string;
};

type FlightContextType = {
  data: FlightData[];
  setData: React.Dispatch<React.SetStateAction<FlightData[]>>;
};

const CreatedFlightContext = createContext<FlightContextType | null>(null);
export const useConsumeFlightContext = () => {
  const context = useContext(CreatedFlightContext);
  if (!context) {
    throw new Error(
      "useConsumeFlightContext must be used within a FlightContextProvider",
    );
  }
  return context;
};

const FlightContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<FlightData[]>(dataFlight);
  return (
    <CreatedFlightContext value={{ data, setData }}>
      {children}
    </CreatedFlightContext>
  );
};

export default FlightContextProvider;
