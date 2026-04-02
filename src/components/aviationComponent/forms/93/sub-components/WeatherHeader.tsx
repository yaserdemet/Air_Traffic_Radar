import { MapPin, Cloud, RefreshCw, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Airport {
  icao: string;
  name: string;
  search: string;
}

interface WeatherHeaderProps {
  currentAirport: Airport;
  airports: Airport[];
  selectedIcao: string;
  onIcaoChange: (value: string) => void;
  onRefresh: () => void;
  isFetching: boolean;
}

export const WeatherHeader = ({
  currentAirport,
  airports,
  selectedIcao,
  onIcaoChange,
  onRefresh,
  isFetching,
}: WeatherHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-1">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl">
            <Cloud className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground/90">
              Hava Durumu Raporu
            </h1>
            <p className="text-muted-foreground text-sm font-medium flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5" /> {currentAirport.name}, Türkiye • Form 93
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-64">
          <Select value={selectedIcao} onValueChange={onIcaoChange}>
            <SelectTrigger className="rounded-full bg-background border-muted-foreground/20">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Havalimanı Seçin" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {airports.map((airport) => (
                <SelectItem key={airport.icao} value={airport.icao}>
                  {airport.name} ({airport.icao})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={isFetching}
          className="rounded-full border-muted-foreground/20 hover:bg-muted"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </div>
  );
};
