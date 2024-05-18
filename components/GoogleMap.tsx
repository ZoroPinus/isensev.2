"use client";

import React, { useMemo } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  HeatmapLayer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: 37.782,
  lng: -122.447,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "64d9fc371c0ec140",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);
  
  const data = 
  [
    new window.google.maps.LatLng(37.765153, -122.418618),
    new window.google.maps.LatLng(37.765136, -122.419112),
    new window.google.maps.LatLng(37.765129, -122.419378),
    new window.google.maps.LatLng(37.765119, -122.419481),
    new window.google.maps.LatLng(37.7651, -122.419852),
  ]

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <HeatmapLayer data={data} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
