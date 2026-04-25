import { useQuery } from "@tanstack/react-query";
import { RefreshCw, Cloud, Droplets, Wind, Eye } from "lucide-react";
import { weatherService } from "./api/getWeather";
import { checkwxService } from "./api/checkwxService";
import LoadingPage from "@/pages/LoadingPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WeatherHeader } from "./sub-components/WeatherHeader";
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

  const currentAirport =
    AIRPORTS.find((a) => a.icao === selectedIcao) || AIRPORTS[0];
  const searchCity = currentAirport.search;

  // OpenWeather API isteği
  const { data, isError, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["getWeatherInfo", searchCity],
    queryFn: () => weatherService.getByCity(searchCity),
    enabled: !!searchCity,
    staleTime: 1000 * 60 * 10,
  });

  // CheckWX API isteği - METAR ve TAF
  const {
    data: checkwxData,
    isLoading: checkwxLoading,
    isError: checkwxError,
    refetch: refetchCheckwx,
  } = useQuery({
    queryKey: ["checkwxWeather", selectedIcao],
    queryFn: () => checkwxService.getWeatherData(selectedIcao),
    enabled: !!selectedIcao,
    staleTime: 1000 * 60 * 30,
  });

  const getFlightCategoryColor = (category?: string) => {
    switch (category) {
      case "VFR":
        return "bg-green-100 text-green-800";
      case "MVFR":
        return "bg-blue-100 text-blue-800";
      case "IFR":
        return "bg-red-100 text-red-800";
      case "LIFR":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
              Hava durumu bilgileri şu an yüklenemiyor. Lütfen bağlantınızı
              kontrol edin.
            </p>
            <Button
              onClick={() => refetch()}
              variant="secondary"
              className="mt-2"
            >
              Tekrar Dene
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* OpenWeather Verileri */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              METAR & TAF Verileri (CheckWX)
            </h2>

            {checkwxLoading ? (
              <Card className="p-8 text-center">
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <p>METAR ve TAF verileri yükleniyor...</p>
                </div>
              </Card>
            ) : checkwxError ? (
              <Card className="p-6 bg-yellow-50 border border-yellow-200">
                <p className="text-yellow-800 font-semibold mb-2">
                  ⚠️ Veri Çekme Hatası
                </p>
                <p className="text-yellow-700 text-sm mb-4">
                  {selectedIcao} için CheckWX verisi alınamıyor. Nedenler:
                </p>
                <ul className="text-yellow-700 text-sm list-disc list-inside mb-4 space-y-1">
                  <li>Havaalanı kodu geçersiz veya desteklenmiyor</li>
                  <li>API bağlantısı kesintiye uğramış</li>
                  <li>API Key kullanım limitine ulaşılmış</li>
                </ul>
                <Button
                  onClick={() => refetchCheckwx()}
                  variant="outline"
                  className="mt-4"
                >
                  Tekrar Dene
                </Button>
              </Card>
            ) : checkwxData && (checkwxData.metar || checkwxData.taf) ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* METAR Card */}
                {checkwxData.metar ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>METAR - {selectedIcao}</span>
                        {checkwxData.metar?.flight_category && (
                          <span
                            className={`px-3 py-1 rounded text-sm font-bold ${getFlightCategoryColor(
                              checkwxData.metar.flight_category,
                            )}`}
                          >
                            {checkwxData.metar.flight_category}
                          </span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Raw METAR Text */}
                      {checkwxData.metar?.raw_text && (
                        <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                          <p className="break-words">
                            {checkwxData.metar.raw_text}
                          </p>
                        </div>
                      )}

                      {/* Decoded METAR Data */}
                      {checkwxData.metar && (
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                          {/* Temperature */}
                          {checkwxData.metar?.temperature?.celsius !==
                            undefined && (
                            <div className="flex items-center gap-2">
                              <Cloud className="w-5 h-5 text-blue-500" />
                              <div>
                                <p className="text-xs text-gray-500">
                                  Sıcaklık
                                </p>
                                <p className="font-bold">
                                  {checkwxData.metar.temperature.celsius}°C
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Dewpoint */}
                          {checkwxData.metar?.dewpoint?.celsius !==
                            undefined && (
                            <div className="flex items-center gap-2">
                              <Droplets className="w-5 h-5 text-cyan-500" />
                              <div>
                                <p className="text-xs text-gray-500">
                                  Çiğ Noktası
                                </p>
                                <p className="font-bold">
                                  {checkwxData.metar.dewpoint.celsius}°C
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Wind */}
                          {checkwxData.metar?.wind?.speed?.kph !==
                            undefined && (
                            <div className="flex items-center gap-2">
                              <Wind className="w-5 h-5 text-orange-500" />
                              <div>
                                <p className="text-xs text-gray-500">Rüzgar</p>
                                <p className="font-bold">
                                  {checkwxData.metar.wind.speed.kph} km/h
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Visibility */}
                          {checkwxData.metar?.visibility?.meters !==
                            undefined && (
                            <div className="flex items-center gap-2">
                              <Eye className="w-5 h-5 text-purple-500" />
                              <div>
                                <p className="text-xs text-gray-500">
                                  Görüş Mesafesi
                                </p>
                                <p className="font-bold">
                                  {(
                                    checkwxData.metar.visibility.meters / 1000
                                  ).toFixed(1)}{" "}
                                  km
                                </p>
                              </div>
                            </div>
                          )}

                          {/* QNH */}
                          {checkwxData.metar?.pressure?.mb !== undefined && (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 text-indigo-500 font-bold">
                                Q
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">QNH</p>
                                <p className="font-bold">
                                  {checkwxData.metar.pressure.mb} hPa
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Wind Direction */}
                          {checkwxData.metar?.wind?.degrees !== undefined && (
                            <div>
                              <p className="text-xs text-gray-500">
                                Rüzgar Yönü
                              </p>
                              <p className="font-bold">
                                {checkwxData.metar.wind.degrees}°
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Observation Time */}
                      {checkwxData.metar?.observed && (
                        <p className="text-xs text-gray-500 pt-4 border-t">
                          Gözlem Zamanı:{" "}
                          {new Date(checkwxData.metar.observed).toLocaleString(
                            "tr-TR",
                          )}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="p-6 bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      📊 METAR verisi bulunamadı
                    </p>
                  </Card>
                )}

                {/* TAF Card */}
                {checkwxData.taf ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>TAF - {selectedIcao}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {checkwxData.taf?.text &&
                      checkwxData.taf.text.length > 0 ? (
                        <div className="space-y-2">
                          {checkwxData.taf.text.map((tafLine, idx) => (
                            <div
                              key={idx}
                              className="bg-gray-100 p-3 rounded font-mono text-sm"
                            >
                              <p className="break-words">{tafLine}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">TAF metin verisi yok</p>
                      )}

                      {checkwxData.taf?.issued && (
                        <p className="text-xs text-gray-500 pt-4 border-t">
                          Yayınlanan:{" "}
                          {new Date(checkwxData.taf.issued).toLocaleString(
                            "tr-TR",
                          )}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="p-6 bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      📈 TAF verisi bulunamadı
                    </p>
                  </Card>
                )}
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* <MainWeatherCard data={data} /> */}
            <WeatherDetailsSidebar data={data} formatTime={formatTime} />
          </div>

          {/* CheckWX METAR ve TAF Verileri */}
        </div>
      )}
    </div>
  );
};

export default Form93Component;
