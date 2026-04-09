import MapFrequency from "@/components/frequencyAirport/MapFrequency";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function FrequenciesPage() {

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Hava Trafik Kontrol Frekansları</CardTitle>
          <CardDescription>
            Türkiye'deki havaalanları ve ATC frekanslarını görüntüleyin
          </CardDescription>
        </CardHeader>
        <CardContent>
    
         <MapFrequency />
        </CardContent>
      </Card>
    </div>
  );
}
