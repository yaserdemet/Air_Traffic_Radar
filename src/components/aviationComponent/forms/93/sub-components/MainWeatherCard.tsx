import { Cloud, Thermometer, Droplets, Wind, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface MainWeatherCardProps {
  data: any;
}

export const MainWeatherCard = ({ data }: MainWeatherCardProps) => {
  return (
    <Card className="lg:col-span-2 overflow-hidden border-none shadow-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="p-8 relative h-full flex flex-col justify-between min-h-[300px]">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <Cloud className="w-48 h-48" />
        </div>

        <div className="relative flex justify-between items-start">
          <div>
            <Badge
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-none mb-4 backdrop-blur-md"
            >
              Şu Anki Durum
            </Badge>
            <h2 className="text-5xl font-extrabold tracking-tighter">
              {Math.round(data?.main?.temp)}°C
            </h2>
            <p className="text-xl font-medium mt-2 capitalize text-blue-50">
              {data?.weather?.[0]?.description}
            </p>
          </div>
          {data?.weather?.[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt="Weather Icon"
              className="w-32 h-32 -mt-4 drop-shadow-2xl"
            />
          )}
        </div>

        <div className="relative mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-blue-100 text-xs font-semibold uppercase tracking-wider">
              <Thermometer className="w-3.5 h-3.5" /> Hissedilen
            </div>
            <span className="text-xl font-bold">
              {Math.round(data?.main?.feels_like)}°C
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-blue-100 text-xs font-semibold uppercase tracking-wider">
              <Droplets className="w-3.5 h-3.5" /> Nem
            </div>
            <span className="text-xl font-bold">%{data?.main?.humidity}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-blue-100 text-xs font-semibold uppercase tracking-wider">
              <Wind className="w-3.5 h-3.5" /> Rüzgar
            </div>
            <span className="text-xl font-bold">{data?.wind?.speed} km/s</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-blue-100 text-xs font-semibold uppercase tracking-wider">
              <RefreshCw className="w-3.5 h-3.5" /> Basınç
            </div>
            <span className="text-xl font-bold">{data?.main?.pressure} hPa</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
