import GeoJSON from "ol/format/GeoJSON";
import React, { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { OGCMapTile, Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import Overlay from "ol/Overlay";
import { toLonLat } from "ol/proj.js";
import { toStringHDMS } from "ol/coordinate.js";

export default function map() {
  useEffect(() => {

    const statesLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "./map/us-states.json",
      }),
    });

    const rasterLayer = new TileLayer({
      source: new OGCMapTile({
        url: "https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad",
        crossOrigin: "",
      }),
    });

    const container = document.getElementById("popup");
    const overlay = new Overlay({
      element: container,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    const map = new Map({
      layers: [rasterLayer, statesLayer],
      target: "markerpopupmap",
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
      overlays: [overlay],
    });

    /**
     * Add a click handler to the map to render the popup.
     */
    map.on("singleclick", async function (evt) {
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
      const stateFeatures = await statesLayer.getFeatures(evt.pixel)
      let stateName: string = ''
      if (stateFeatures.length > 0) {
        stateName = stateFeatures[0].get('name')
      }
      setPopupContent(`${hdms} in ${stateName}`)


      // content.innerHTML = "<p>You clicked here:</p><code>" + hdms + "</code>";
      overlay.setPosition(coordinate);
    });
    return () => map.setTarget(null);
  }, []);

  const [popupContent, setPopupContent] = useState<string | null>(null);

  return (
    <div>
      <div id="markerpopupmap" style={{ width: "100%", height: "100vh" }} />
      <div id="popup" className="ol-popup" style={{ backgroundColor: "#fff" }}>
        <a href="#" id="popup-closer" className="ol-popup-closer"></a>
        {popupContent && (
          <div id="popup-content">You clicked here: {popupContent}
          {' '}<button onClick={() => setPopupContent(null)}>Close</button></div>
        )}
      </div>
    </div>
  );
}
