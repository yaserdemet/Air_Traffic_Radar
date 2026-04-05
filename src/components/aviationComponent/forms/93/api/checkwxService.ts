import axios from "axios";

const CHECKWX_API_KEY = "c809b140b4de4c89b7a7795ccc2b5e92";
const CHECKWX_BASE_URL = "https://api.checkwx.com";

const checkwxApi = axios.create({
  baseURL: CHECKWX_BASE_URL,
  headers: {
    "X-API-Key": CHECKWX_API_KEY,
  },
});

export interface METARData {
  icao: string;
  raw_text?: string;
  observed?: string;
  flight_category?: string;
  temperature?: {
    celsius?: number;
    fahrenheit?: number;
  };
  dewpoint?: {
    celsius?: number;
    fahrenheit?: number;
  };
  wind?: {
    degrees?: number;
    speed?: {
      kts?: number;
      mph?: number;
      kph?: number;
      mps?: number;
    };
    direction?: string;
  };
  visibility?: {
    miles?: number;
    meters?: number;
  };
  pressure?: {
    mb?: number;
    hg?: number;
  };
  humidity?: number;
  clouds?: any[];
  conditions?: any[];
  [key: string]: any;
}

export interface TAFData {
  icao: string;
  issued?: string;
  text?: string[];
}

export const checkwxService = {
  // METAR verilerini çekmek
  getMETAR: async (icao: string): Promise<METARData | null> => {
    try {
      const response = await checkwxApi.get(`/v2/metar/${icao}/decoded`);

      // Response yapısını kontrol et - data array'i içinde
      if (
        response.data?.data &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        return response.data.data[0];
      }
      return null;
    } catch (error: any) {
      const status = error?.response?.status;
      const errorData = error?.response?.data;

      console.error(`❌ METAR Error (${icao}):`, {
        status,
        data: errorData,
        message: error?.message,
      });

      return null;
    }
  },

  // TAF verilerini çekmek
  getTAF: async (icao: string): Promise<TAFData | null> => {
    try {
      const response = await checkwxApi.get(`/v2/taf/${icao}/decoded`);
      // Response yapısını kontrol et - data array'i içinde
      if (
        response.data?.data &&
        Array.isArray(response.data.data) &&
        response.data.data.length > 0
      ) {
        const tafItem = response.data.data[0];

        // TAF'ın raw_text veya text alanını al
        const tafText = tafItem.raw_text || tafItem.text || "";
        const tafData: TAFData = {
          icao: icao,
          text: [tafText],
          issued: tafItem.issued,
        };

        return tafData;
      }

   
      return null;
    } catch (error: any) {
      const status = error?.response?.status;
      const errorData = error?.response?.data;

      console.error(`❌ TAF Error (${icao}):`, {
        status,
        data: errorData,
        message: error?.message,
      });

      return null;
    }
  },

  // METAR ve TAF'ı birlikte çekmek
  getWeatherData: async (
    icao: string,
  ): Promise<{ metar: METARData | null; taf: TAFData | null }> => {
    try {
      const [metar, taf] = await Promise.all([
        checkwxService.getMETAR(icao),
        checkwxService.getTAF(icao),
      ]);

   

      // Her ikisi null ise veya biri null ise yine return et
      if (!metar && !taf) {
        const msg = `${icao} için hiç veri bulunamadı. Lütfen havaalanı kodunu kontrol edin ve console logu okuyun.`;
       
        throw new Error(msg);
      }

      return { metar, taf };
    } catch (error: any) {
      console.error(`🔴 Weather data hatası:`, error?.message);
      throw error;
    }
  },
};
