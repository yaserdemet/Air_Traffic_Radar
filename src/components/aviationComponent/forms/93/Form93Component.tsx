import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { weatherService } from "./api/getWeather";
import LoadingPage from "@/pages/LoadingPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WeatherHeader } from "./sub-components/WeatherHeader";
import { MainWeatherCard } from "./sub-components/MainWeatherCard";
import { WeatherDetailsSidebar } from "./sub-components/WeatherDetailsSidebar";

const AIRPORTS = [
  { icao: "LTFM", name: "İstanbul Havalimanı", search: "Istanbul" },
  { icao: "LTFJ", name: "Sabiha Gökçen", search: "Istanbul" },
  { icao: "LTAC", name: "Ankara Esenboğa", search: "Ankara" },
  { icao: "LTBJ", name: "İzmir Adnan Menderes", search: "Izmir" },
  { icao: "LTAI", name: "Antalya Havalimanı", search: "Antalya" },
  { icao: "LTFE", name: "Muğla Milas-Bodrum", search: "Bodrum" },
  { icao: "LTBS", name: "Muğla Dalaman", search: "Dalaman" },
  { icao: "LTCG", name: "Trabzon Havalimanı", search: "Trabzon" },
  { icao: "LTAF", name: "Adana Şakirpaşa", search: "Adana" },
];

const Form93Component = () => {
  const [selectedIcao, setSelectedIcao] = useState(AIRPORTS[0].icao);
    
  const currentAirport = AIRPORTS.find(a => a.icao === selectedIcao) || AIRPORTS[0];
  const searchCity = currentAirport.search;

  const { data, isError, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["getWeatherInfo", searchCity],
    queryFn: () => weatherService.getByCity(searchCity),
    enabled: !!searchCity,
    staleTime: 1000 * 60 * 10,
  });

  const formatTime = (timestamp: number, symbol: "+" | "-") => {
    if (!timestamp) return "--:--";
    const offsetInSeconds = 30 * 60;
    let finalTimestamp = timestamp;

    if (symbol === "+") {
      finalTimestamp += offsetInSeconds;
    } else {
      finalTimestamp -= offsetInSeconds;
    }

    return new Date(finalTimestamp * 1000).toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
      <WeatherHeader
        currentAirport={currentAirport}
        airports={AIRPORTS}
        selectedIcao={selectedIcao}
        onIcaoChange={setSelectedIcao}
        onRefresh={refetch}
        isFetching={isFetching}
      />

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingPage />
        </div>
      ) : isError ? (
        <Card className="p-12 text-center border-dashed border-2">
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-full">
              <RefreshCw className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold">Veri Alınamadı</h3>
            <p className="text-muted-foreground max-w-xs mx-auto">
              Hava durumu bilgileri şu an yüklenemiyor. Lütfen bağlantınızı kontrol edin.
            </p>
            <Button onClick={() => refetch()} variant="secondary" className="mt-2">
              Tekrar Dene
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MainWeatherCard data={data} />
          <WeatherDetailsSidebar data={data} formatTime={formatTime} />
        </div>
      )}
    </div>
  );
};

export default Form93Component;
