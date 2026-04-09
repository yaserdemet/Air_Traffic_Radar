const baseFrequency = import.meta.env.VITE_ATC_FREQUENCY;
interface IFrequency {
    name : string,
    city : string,
    url : string,
    coordinate : number []
} 

export  const data : IFrequency[] = [
  {
    name: "KJFK Gnd/Twr",
    city: "New York",
    url: `${baseFrequency}=kjfk9_s&icao=kjfk`,
    coordinate: [40.6413, -73.7781], 
  },
  {
    name: "RJTT Tokyo Control",
    city: "Tokyo",
    url: `${baseFrequency}=kbos1_twr&icao=kbos`,
    coordinate: [35.5494, 139.7798], 
  },
  {
    name: "KBOS Tower",
    city: "Boston",
    url: `${baseFrequency}=kbos1_twr&icao=kbos`,
    coordinate: [42.3656, -71.0096], 
  },
  {
    name: "KJFK Ground #1",
    city: "New York",
    url: `${baseFrequency}=kjfk9_gnd&icao=kjfk`,
    coordinate: [40.6413, -73.7781], 
  },
  {
    name: "KSFO Tower",
    city: "San Francisco",
    url: `${baseFrequency}=ksfo_twr&icao=ksfo`,
    coordinate: [37.6213, -122.3790], 
  },
  {
    name: "KLAX Tower (South) #1",
    city: "Los Angeles",
    url: `${baseFrequency}=klax4&icao=klax`,
    coordinate: [33.9425, -118.4081], 
  },
  {
    name: "EPWA Approach #1",
    city: "Warsaw",
    url: `${baseFrequency}=epwa_app&icao=epwa`,
    coordinate: [52.1657, 20.9671], 
  },
  {
    name: "EIDW Gnd/Twr/App/Centre",
    city: "Dublin",
    url: `${baseFrequency}=eidw8&icao=eidw`,
    coordinate: [53.4213, -6.2701], 
  },
];