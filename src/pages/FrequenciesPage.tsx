import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Frequency {
  id: string;
  name: string;
  frequency: string;
  type: string;
  airport?: string;
  city?: string;
}

// Sample frequency data
const FREQUENCIES: Frequency[] = [
  {
    id: "1",
    name: "İstanbul Approach",
    frequency: "119.05",
    type: "Approach",
    airport: "LTBA",
    city: "İstanbul",
  },
  {
    id: "2",
    name: "İstanbul Tower",
    frequency: "118.70",
    type: "Tower",
    airport: "LTBA",
    city: "İstanbul",
  },
  {
    id: "3",
    name: "Ankara Approach",
    frequency: "119.10",
    type: "Approach",
    airport: "LTAC",
    city: "Ankara",
  },
  {
    id: "4",
    name: "Ankara Tower",
    frequency: "118.85",
    type: "Tower",
    airport: "LTAC",
    city: "Ankara",
  },
  {
    id: "5",
    name: "İzmir Approach",
    frequency: "118.80",
    type: "Approach",
    airport: "LTAJ",
    city: "İzmir",
  },
  {
    id: "6",
    name: "İzmir Tower",
    frequency: "118.50",
    type: "Tower",
    airport: "LTAJ",
    city: "İzmir",
  },
  {
    id: "7",
    name: "Turkish Radar",
    frequency: "128.50",
    type: "Radar",
    city: "Nationwide",
  },
  {
    id: "8",
    name: "Emergency Frequency",
    frequency: "121.50",
    type: "Emergency",
    city: "All Airports",
  },
];

export default function FrequenciesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFrequencies = FREQUENCIES.filter((freq) =>
    Object.values(freq)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

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
          <div className="space-y-4">
            {/* Search Input */}
            <div className="w-full max-w-md">
              <Input
                placeholder="Havaalanı, frekans veya tip ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Frequencies Table */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>İstasyon Adı</TableHead>
                    <TableHead>Frekans (MHz)</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Havaalanı</TableHead>
                    <TableHead>Şehir</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFrequencies.length > 0 ? (
                    filteredFrequencies.map((freq) => (
                      <TableRow key={freq.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {freq.name}
                        </TableCell>
                        <TableCell>
                          <span className="font-mono font-bold text-lg">
                            {freq.frequency}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              freq.type === "Tower"
                                ? "bg-blue-100 text-blue-800"
                                : freq.type === "Approach"
                                  ? "bg-green-100 text-green-800"
                                  : freq.type === "Radar"
                                    ? "bg-purple-100 text-purple-800"
                                    : freq.type === "Emergency"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {freq.type}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono">
                          {freq.airport || "-"}
                        </TableCell>
                        <TableCell>{freq.city || "-"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-4 text-gray-500"
                      >
                        Sonuç bulunamadı
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <Card className="p-4">
                <p className="text-sm text-gray-500">Toplam Frekans</p>
                <p className="text-2xl font-bold">{FREQUENCIES.length}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-gray-500">Tower Frekansları</p>
                <p className="text-2xl font-bold">
                  {FREQUENCIES.filter((f) => f.type === "Tower").length}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-gray-500">Approach Frekansları</p>
                <p className="text-2xl font-bold">
                  {FREQUENCIES.filter((f) => f.type === "Approach").length}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-gray-500">Radar Frekansları</p>
                <p className="text-2xl font-bold">
                  {FREQUENCIES.filter((f) => f.type === "Radar").length}
                </p>
              </Card>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700">
              <p className="text-sm font-semibold mb-2">💡 Bilgi</p>
              <p className="text-sm">
                Tüm frekanslar MHz cinsinden verilmiştir. Havacılık iletişimi
                yapılmadan önce lütfen yerel prosedürleri kontrol edin.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
