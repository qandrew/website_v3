import GeoJSON from "ol/format/GeoJSON";
import React, { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { OGCMapTile, OSM, Vector as VectorSource } from "ol/source.js";
import { Layer, Tile as TileLayer, Vector, Vector as VectorLayer } from "ol/layer.js";
import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj.js";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Icon from "ol/style/Icon";

// TODO: add more images
const statesWithData: Record<string, { imageSrc: string }> = {
  Wyoming: {
    imageSrc:
      "https://lh3.googleusercontent.com/pw/AP1GczOKYMOVhU8NNbQL6pS6lrfAidW0aeJehtbsvSZ40ApRGtou_-M0QpzX9HVdiNN4F_Dbf0NH7vDQbkDUgnd3E6fbDh52H1Bch-nFCD3RESamO1vIYPxU6HehjAFJ-bngdRx4XWumWdiRKpP0z4ycdKVoqA=w2582-h1936-s-no-gm",
  },
  California: {
    imageSrc:
      "https://lh3.googleusercontent.com/pw/AP1GczMpZuoEFNCRBdNc4CAfIsq275sc4eo3BsjBjBWJQE1KMPzLkK2O7skSQW0uWlHuHB3zxbHR9PmVpVRrxRftnpi6KGLUiUYEz0a5oSxKpfBRdovpI49Cet1_KtxjvOX1TKsTl0pzJnCTx-awPQHoumdqWQ=w2582-h1936-s-no-gm",
  },
  "New Hampshire": {
    imageSrc:
      "https://lh3.googleusercontent.com/pw/AP1GczOMZH4Mtx96IMj6kRrRQA1MozZaOuHLsSn9aJYy2EzlNsv0eePZ_RfLhiZBK-VYntzZDwdEuhnvymJzu7l0eVAUgTSx38lW4vPRyEwisjW23GoeChwDcgisjrDa6PnwmwenYLr67mc3qc3vuLGQFcpMDQ=w2572-h1936-s-no-gm",
  },
  Alaska: {
    imageSrc:
      "https://lh3.googleusercontent.com/pw/AP1GczPVKiXZvprqWX_ebFZqvneS14SRj4Yqf275Au3N2WfMalMjOZWp1NR11i2TcKr1JsWwzd8IVdA6OJRvdQsI2GwqS1-2FjwX9wSlGhOMT5Uv-iieH0LFIIYCTzSC6myYDDjgMnMCB18bvn5tcGV9L4OfOw=w2572-h1936-s-no-gm",
  },
  Arizona: {
    imageSrc:
      "https://lh3.googleusercontent.com/pw/AP1GczOYC1rpmRJGF5R5jEv2Gq8LNyJ0Gxt5Gy0fHgyn2qbBs0C8qv7KTdbk65HRu0mDt85hOgg5ehhVfzo6yilMsi0bco61FCapgAh5nzURMYa2PWeeBhcWTRDisYj8KW4ocpT_JVxjocWSufaMh-Y9cN6G7A=w1458-h1936-s-no-gm",
  },
};

const statesIveVisited = [
  // "Alabama",
  "Alaska",
  "Arizona",
  // "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  // "Kansas",
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
      // source: new OGCMapTile({
      //   url: "https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad",
      //   crossOrigin: "",
      // }),
      source: new OSM()
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

    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([-122, 37])),
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });
    
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-globe-internet-web-online-monitor-icon-png-image_925332.jpg',
      }),
    });
    
    iconFeature.setStyle(iconStyle);
    
    const vectorSource = new VectorSource({
      features: [iconFeature],
    });
    
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      layers: [rasterLayer, vectorLayer],
      target: "markerpopupmap",
      // TODO: limit map zoom to US?
      view: new View({
        center: fromLonLat([-122, 37]),
        zoom: 4,
      }),
      overlays: [overlay],
    });
    

    // // const markers = new Layer.Markers( "Markers" );
    // // map.addLayer(markers);

    // // var size = new OpenLayers.Size(21,25);
    // // var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    // // var icon = new OpenLayers.Icon('marker.png', size, offset);
    // // markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(106.8478695,-6.1568562),icon));
    // // markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(106.8478695,-6.1568562),icon.clone()));

    // // Create a marker feature
    // var marker = new Feature({
    //   geometry: new Point(fromLonLat([0, 0])), // Set the marker position to (0, 0)
    // });

    // // Create a vector source and add the marker to it
    // var vectorSource = new Vector({
    //   features: [marker],
    // });

    // const vectorLayer = new VectorLayer({
    //   source: vectorSource,
    //   style: new Style({
    //     image: new Icon({
    //       anchor: [0.5, 1],
    //       src: "https://openlayers.org/en/latest/examples/data/icon.png", // URL to your marker icon
    //     }),
    //   }),
    // });

    /**
     * Add a click handler to the map to render the popup.
     */
    map.on("singleclick", async function (evt) {
      const coordinate = evt.coordinate;
      const stateFeatures = await statesLayer.getFeatures(evt.pixel);
      let stateName: string = "";
      if (stateFeatures.length > 0) {
        stateName = stateFeatures[0].get("name");
      }
      setPopupContent(`${stateName}`);

      overlay.setPosition(coordinate);
    });
    return () => map.setTarget(null);
  }, []);

  const [popupContent, setPopupContent] = useState<string | null>(null);

  const stateImage = statesWithData[popupContent || ""];

  return (
    <div>
      <div id="markerpopupmap" style={{ width: "100%", height: "100vh" }} />
      <div id="popup" className="ol-popup" style={{ backgroundColor: "#fff" }}>
        <a href="#" id="popup-closer" className="ol-popup-closer"></a>
        {popupContent && (
          <div id="popup-content">
            {stateImage && (
              <img
                src={stateImage.imageSrc}
                style={{ width: "100px", height: "100px" }}
              />
            )}
            {popupContent}{" "}
            <button onClick={() => setPopupContent(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
