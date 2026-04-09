import { Map, MapCircle, MapTileLayer } from "@/components/ui/map";
import type { LatLngExpression } from "leaflet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import { data } from "./data";
import { mapUrlForBlackEditon } from "@/api/mapUrl";

function MapUpdater({ position }: { position: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [map, position]);
  return null;
}

export default function MapFrequency() {
  
const [selectedName, setSelectedName] = useState(data[0].name);
const selectedItem = data.find(item => item.name === selectedName) || data[0];
const position = selectedItem.coordinate as LatLngExpression;

const getMountUrl = (url: string) => {
  const mount = new URL(url).searchParams.get('mount');
  return `https://d.liveatc.net/${mount}`;
};

const handleChange = (value: string) => {
  setSelectedName(value); // value kullan, selectedName değil
};

return (
  <>
  <div className="flex gap-4 justify-between  mb-4 items-center flex-col md:flex-row">


    <Select value={selectedName} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Seç" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((item) => (
            <SelectItem key={item.name} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    <audio key={selectedItem.url} controls >
      <source
        src={getMountUrl(selectedItem.url)}
        type="audio/mpeg"
      />
    </audio>

  </div>

    <Map
    
    center={position}>
      <MapUpdater position={position} />
      <MapTileLayer
       url={mapUrlForBlackEditon.url}
                attribution={mapUrlForBlackEditon.attribution}
      />
      <MapCircle
        className="fill-yellow-600 stroke-yellow-600 stroke-1"
        center={position}
        radius={200}
      />
    </Map>
  </>
);
}
