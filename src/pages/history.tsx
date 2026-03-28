import { useFlight } from "@/hooks/useFlight";
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


function mapState(state: any[]) {
  return {
    icao24: state[0],
    callsign: state[1]?.trim(),
    originCountry: state[2],
    timePosition: state[3],
    lastContact: state[4],
    longitude: state[5],
    latitude: state[6],
    baroAltitude: state[7],
    onGround: state[8],
    velocity: state[9],
    trueTrack: state[10],
    verticalRate: state[11],
    geoAltitude: state[13],
    squawk: state[14],
  };
}

export default function HistoryPage() {
  const { data, isLoading, isError, error } = useFlight({
    select: (data) => data.states?.map(mapState) ?? [],
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Uçuş Geçmişi (Canlı)</h1>
      
      {isLoading && (
        <div className="flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
          <p>Veriler yükleniyor...</p>
        </div>
      )}
      
      {isError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          <p>Veri alınırken bir hata oluştu: {error?.message}</p>
        </div>
      )}
      
      {data && (
        <div className="mt-4 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Çağrı Kodu</TableHead>
                <TableHead>Ülke</TableHead>
                <TableHead>İrtifa (m)</TableHead>
                <TableHead>Hız (m/s)</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead >Squawk / Alt (m)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>           
              {data.slice(0, 10).map((flight: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{flight.callsign || "N/A"}</TableCell>
                  <TableCell>{flight.originCountry}</TableCell>
                  <TableCell>{flight.baroAltitude ? Math.round(flight.baroAltitude) : "Yer"}</TableCell>
                  <TableCell>{flight.velocity ? Math.round(flight.velocity) : "0"}</TableCell>
                  <TableCell>
                    {flight.onGround ? (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                        On The Ground
                      </Badge>
                    ) : (
                      <Badge className="bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300">
                        On Air
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {flight.squawk && (
                      <Badge variant="outline" className="ml-1">
                        S: {flight.squawk}
                      </Badge>
                    )}
                    {flight.geoAltitude && (
                      <span className="text-xs text-muted-foreground ml-2">
                        G: {Math.round(flight.geoAltitude)}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-3 text-xs text-muted-foreground italic border-t">
            * Sadece ilk 10 kayıt gösteriliyor. Toplam {data.length} uçuş bulundu.
          </div>
        </div>
      )}
    </div>
  );
}
