import Map from "ol/Map.js";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useEffect } from "react";
import 'ol/ol.css';


export default function MapComponent() {
  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const map = new Map({
      target: "map",
      layers: [osmLayer],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });
    return () => map.setTarget(null);
  }, []);

  return (
    <div
      style={{ height: "300px", width: "100%" }}
      id="map"
      className="map-container"
    />
  );
}
