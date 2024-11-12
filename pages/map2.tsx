"use client";

import { useRef, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

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

export default function MapboxFullscreen() {
  const mapRef = useRef<Map>();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-122.4194, 37.7749],
      zoom: 10.12,
      style: "mapbox://styles/mapbox/outdoors-v12",
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");

    // Load GeoJSON data
    mapRef.current.on("load", () => {
      mapRef.current.addSource("us-states", {
        type: "geojson",
        data: "./map/us-states.json", // Replace with actual GeoJSON path
      });

      // Add the layer to display US state borders
      mapRef.current.addLayer({
        id: "state-borders",
        type: "fill",
        source: "us-states",
        paint: {
          "fill-color": "#888888", // Default fill color
          "fill-opacity": 0.4,
        },
      });

      // Add a border outline for better visibility
      mapRef.current.addLayer({
        id: "state-borders-outline",
        type: "line",
        source: "us-states",
        paint: {
          "line-color": "#ffffff",
          "line-width": 2,
        },
      });

      // Example: Highlight a subset of states by adding a filter
      mapRef.current.setFilter("state-borders", [
        "in",
        "name", // Replace with the property name for state abbreviation
        ...statesIveVisited
      ]);
      mapRef.current.setPaintProperty("state-borders", "fill-color", "#FF5722"); // Highlight color
    });

    // for (const location of locations) {
    //   const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    //     `<h1>${location.address?.name}</h1>
    //     <p>${location.address?.details.elevation}m</p>
    //     <p><a href="/location/${location.id}">View Details</a></p>`
    //   );

    //   new mapboxgl.Marker()
    //     .setLngLat([location.longitude, location.latitude])
    //     .setPopup(popup) // sets a popup on this marker
    //     .addTo(mapRef.current);
    // }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  function handleFlyTo({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) {
    if (!mapRef.current) {
      return;
    }

    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 14,
      speed: 2, // make the flying slow
      curve: 1, // smoothness of the flight path
      essential: true,
    });
  }

  return (
    <div id="markerpopupmap" style={{ width: "100%", height: "100vh" }}>
      <div
        style={{ width: "100%", height: "100%" }}
        id="map-container"
        ref={mapContainerRef}
      />
    </div>
  );
}
