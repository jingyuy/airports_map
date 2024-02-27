var markers = [];

function clear_markers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}

export async function display_markers(map, airports) {
  clear_markers();
  // Request needed libraries.
  // Request needed libraries.
  const { InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker"
  );

  // Create the markers.
  airports.forEach(({ position, title, id }, i) => {
    const pin = new PinElement({
      glyph: `${id}`,
    });
    const marker = new AdvancedMarkerElement({
      position,
      map,
      title: `${title}`,
      content: pin.element,
    });

    markers.push(marker);

    // Create an info window to share between markers.
    const infoWindow = new InfoWindow();

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;
      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  });
}
