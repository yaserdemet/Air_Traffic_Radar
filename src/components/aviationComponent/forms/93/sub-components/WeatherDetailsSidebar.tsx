import { Wind, Sunrise, Sunset } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WeatherDetailsSidebarProps {
  data: any;
  formatTime: (timestamp: number, symbol: "+" | "-") => string;
}

export const WeatherDetailsSidebar = ({
  data,
  formatTime,
}: WeatherDetailsSidebarProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 border-muted-foreground/10 shadow-lg bg-card/50 backdrop-blur-sm">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Wind className="w-5 h-5 text-indigo-500" /> Visual Details
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-muted">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Sunrise className="w-4 h-4 text-orange-400" /> VFR Başlangıç
            </div>
            <span className="font-semibold">
              {formatTime(data?.sys?.sunrise, "-")}
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-muted">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Sunset className="w-4 h-4 text-orange-600" /> VFR Bitiş
            </div>
            <span className="font-semibold">
              {formatTime(data?.sys?.sunset, "+")}
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-muted">
            <span className="text-muted-foreground text-sm">Görünürlük</span>
            <span className="font-semibold">
              {(data?.visibility / 1000).toFixed(1)} km
            </span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-muted">
            <span className="text-muted-foreground text-sm">Bulutlanma</span>
            <span className="font-semibold">%{data?.clouds?.all}</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-muted">
            <span className="text-muted-foreground text-sm">Max / Min</span>
            <span className="font-semibold text-xs">
              {Math.round(data?.main?.temp_max)}° /{" "}
              {Math.round(data?.main?.temp_min)}°
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm text-xs opacity-70">
              Son Güncelleme: {new Date().toLocaleTimeString("tr-TR")}
            </span>
          </div>
        </div>
      </Card>

    </div>
  );
};
