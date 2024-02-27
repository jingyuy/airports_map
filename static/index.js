import { get_airports } from "./client.js";
import { display_markers } from "./markers.js";

async function initMap1() {
  const data = await get_airports();
  data.airports.forEach(({ position, title }, i) => {
    console.log(title);
  });
}
async function initMap() {
  // Request needed libraries.
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );
  const map = new Map(document.getElementById("map"), {
    center: { lat: 37.46375183, lng: -122.1176523 },
    zoom: 14,
    mapId: "4504f8b37365c3d0",
  });

  map.addListener("zoom_changed", async function () {
    console.log("Zoom level:", map.getZoom());
    console.log("Bounds:", map.getBounds().toString());
    const airports = await get_airports(
      map.getBounds().getSouthWest().lat(),
      map.getBounds().getSouthWest().lng(),
      map.getBounds().getNorthEast().lat(),
      map.getBounds().getNorthEast().lng()
    );
    display_markers(map, airports.airports);
  });

  // Listen for map movement (pan)
  map.addListener("dragend", async function () {
    console.log("Map dragged");
    console.log("Bounds:", map.getBounds().toString());
    const airports = await get_airports(
      map.getBounds().getSouthWest().lat(),
      map.getBounds().getSouthWest().lng(),
      map.getBounds().getNorthEast().lat(),
      map.getBounds().getNorthEast().lng()
    );
    console.log(airports);
    display_markers(map, airports.airports);
  });

  const airports_res = await get_airports(
    37.46110143,
    -122.1149989,
    37.46110163,
    -122.1149969
  );
  display_markers(map, airports_res.airports);
}

initMap();
