import React from "react";
import { useEmergencyFlights, type EmergencyFlight, type Severity } from "@/hooks/useEmergency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, AlertCircle, Radio, Activity, Info, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

const SEVERITY_CONFIG: Record<Severity, { 
  variant: "destructive" | "default" | "secondary" | "outline"; 
  color: string; 
  icon: React.ElementType;
}> = {
  critical: { variant: "destructive", color: "text-red-600", icon: ShieldAlert },
  high: { variant: "destructive", color: "text-orange-600", icon: AlertCircle },
  medium: { variant: "secondary", color: "text-yellow-600", icon: Radio },
  low: { variant: "outline", color: "text-blue-600", icon: Activity },
  info: { variant: "outline", color: "text-gray-600", icon: Info },
};

const Emergency = () => {
  const { data: flights, isLoading, isError } = useEmergencyFlights();

  if (isLoading) {
    return (
      <div className="w-full space-y-3">
        <div className="h-10 bg-muted animate-pulse rounded-md" />
        <div className="h-20 bg-muted/50 animate-pulse rounded-md" />
        <div className="h-20 bg-muted/50 animate-pulse rounded-md" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-center gap-2">
        < AlertCircle className="w-4 h-4" />
        Acil durum verileri yüklenirken bir hata oluştu.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          <h2 className="text-xl font-bold tracking-tight">Kritik Squawk Takibi</h2>
        </div>
        <Badge variant="outline" className="font-mono">
          {flights?.length || 0} UÇUŞ
        </Badge>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        {flights?.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Plane className="w-12 h-12 mx-auto mb-3 opacity-20 rotate-45" />
            <p className="text-sm font-medium">Şu anda aktif acil durum kodu bulunmuyor.</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[200px]">Durum / Sebep</TableHead>
                <TableHead>Çağrı Kodu</TableHead>
                <TableHead>Ülke</TableHead>
                <TableHead className="text-center">Squawk</TableHead>
                <TableHead className="text-right">İrtifa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flights?.map((flight: EmergencyFlight) => {
                const config = SEVERITY_CONFIG[flight.emergencyLabel.severity];
                const Icon = config.icon;

                return (
                  <TableRow key={flight.icao24} className="group hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={cn("p-1.5 rounded-full", config.color.replace('text-', 'bg-').concat('/10'))}>
                          <Icon className={cn("w-4 h-4", config.color)} />
                        </div>
                        <div>
                          <p className="text-sm font-bold leading-none mb-1">
                            {flight.emergencyLabel.label}
                          </p>
                          <Badge 
                            variant={config.variant} 
                            className="text-[9px] h-4 px-1 uppercase tracking-tighter"
                          >
                            {flight.emergencyLabel.severity}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-base tracking-tight">{flight.callsign}</span>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">{flight.icao24}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground truncate max-w-[150px]">
                      {flight.country}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-mono font-bold text-sm border border-primary/20">
                        {flight.squawk}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {flight.altitude ? (
                        <div className="flex flex-col items-end">
                          <span>{Math.round(flight.altitude).toLocaleString()} m</span>
                          <span className="text-[10px] text-muted-foreground">MSL</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs italic">Bilinmiyor</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
      <p className="text-[10px] text-muted-foreground px-1 italic">
        * Veriler OpenSky Network üzerinden canlı olarak çekilmektedir. Gecikme payı olabilir.
      </p>
    </div>
  );
};

export default Emergency;
