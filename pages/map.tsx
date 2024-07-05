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
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

const statesIveVisited = [
  // "Alabama",
  "Alaska",
  "Arizona",
  // "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  // "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  // "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  // "New Mexico",
  "New York",
  // "North Carolina",
  // "North Dakota",
  "Ohio",
  // "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  // "South Carolina",
  // "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function map() {
  useEffect(() => {
    const visitedStateStyle = new Style({
      fill: new Fill({
        color: "rgba(0, 255, 0, 0.3)",
      }),
      stroke: new Stroke({
        color: "white",
      }),
    });

    const notVisitedStateStyle = new Style({
      fill: new Fill({
        color: "rgba(200, 200, 200, 0.3)",
      }),
      stroke: new Stroke({
        color: "white",
      }),
    });

    const statesLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "./map/us-states.json",
      }),
      style: function (feature, resolution) {
        const name = feature.get("name");
        return statesIveVisited.includes(name)
          ? visitedStateStyle
          : notVisitedStateStyle; // assuming these are created elsewhere
      },
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
      const stateFeatures = await statesLayer.getFeatures(evt.pixel);
      let stateName: string = "";
      if (stateFeatures.length > 0) {
        stateName = stateFeatures[0].get("name");
      }
      setPopupContent(`${hdms} in ${stateName}`);

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
          <div id="popup-content">
            You clicked here: {popupContent}{" "}
            <button onClick={() => setPopupContent(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
