"use client";

import { useRef, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import {
  CHINESE_PROVINCES,
  COUNTRIES,
  highlightColor,
  LOCATIONS,
  STATES_IVE_VISITED,
} from "../components/map_constants";

export default function MapboxFullscreen() {
  const mapRef = useRef<Map>();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-122.4194, 37.7749],
      zoom: 6,
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
          "line-width": 1,
        },
      });

      // Example: Highlight a subset of states by adding a filter
      mapRef.current.setFilter("state-borders", [
        "in",
        "name", // Replace with the property name for state abbreviation
        ...STATES_IVE_VISITED,
      ]);
      mapRef.current.setPaintProperty(
        "state-borders",
        "fill-color",
        highlightColor
      ); // Highlight color
    });

    // Load GeoJSON data
    mapRef.current.on("load", () => {
      mapRef.current.addSource("cn-provinces", {
        type: "geojson",
        data: "./map/chinese-provinces.json", // Replace with actual GeoJSON path
      });

      // Add the layer to display US state borders
      mapRef.current.addLayer({
        id: "cn-borders",
        type: "fill",
        source: "cn-provinces",
        paint: {
          "fill-color": "#888888", // Default fill color
          "fill-opacity": 0.4,
        },
      });

      // Add a border outline for better visibility
      mapRef.current.addLayer({
        id: "cn-borders-outline",
        type: "line",
        source: "cn-provinces",
        paint: {
          "line-color": "#ffffff",
          "line-width": 1,
        },
      });

      // Example: Highlight a subset of states by adding a filter
      mapRef.current.setFilter("cn-borders", [
        "in",
        "name", // Replace with the property name for state abbreviation
        ...CHINESE_PROVINCES,
      ]);
      mapRef.current.setPaintProperty(
        "cn-borders",
        "fill-color",
        highlightColor
      ); // Highlight color
    });

    mapRef.current.on("load", () => {
      mapRef.current.addSource("countries", {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1",
      });

      // Add a layer to display the country boundaries
      mapRef.current.addLayer({
        id: "countries-fill",
        type: "fill",
        source: "countries",
        "source-layer": "country_boundaries",
        paint: {
          "fill-color": "#888888", // Default fill color
          "fill-opacity": 0.4,
        },
      });

      // Add a border outline for better visibility
      mapRef.current.addLayer({
        id: "countries-outline",
        type: "line",
        source: "countries",
        "source-layer": "country_boundaries",
        paint: {
          "line-color": "#ffffff",
          "line-width": 1,
        },
      });

      // Example: Highlight a subset of countries
      mapRef.current.setFilter("countries-fill", [
        "in",
        "iso_3166_1_alpha_3", // Property name for country ISO codes
        ...COUNTRIES,
      ]);
      mapRef.current.setPaintProperty(
        "countries-fill",
        "fill-color",
        highlightColor
      ); // Highlight color
    });

    for (const location of LOCATIONS) {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h1>${location.name}</h1>
        <p>I lived here</p>`
      );

      new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(popup) // sets a popup on this marker
        .addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

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
