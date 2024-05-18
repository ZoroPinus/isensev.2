"use client";

import { CardWrapper } from "@/components/cards/maps/card-wrapper";
import Map, {
  Marker,
  Source,
  Layer,
  LayerProps,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  GeoJSONSourceRaw,
  Popup,
} from "react-map-gl";
import Pin from "./pin";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useMemo, useState } from "react";
import { User } from "@prisma/client";

// function filterFeaturesByDay(featureCollection, time) {
//   const date = new Date(time);
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDate();
//   const features = featureCollection.features.filter(feature => {
//     const featureDate = new Date(feature.properties.time);
//     return (
//       featureDate.getFullYear() === year &&
//       featureDate.getMonth() === month &&
//       featureDate.getDate() === day
//     );
//   });
//   return {type: 'FeatureCollection', features};
// }

interface MapsCardProps {
  data: User[];
}
export const MapsCard: React.FC<MapsCardProps> = ({ data }) => {
  const containerStyle = {
    width: "100%",
    height: "50vh",
  };
  const [popupInfo, setPopupInfo] = useState<User | null>(null);
  console.log(data)
  const pins = useMemo(() => {
    return data.map((user) => (
      <Marker
        key={`marker-${user.id}`}
        latitude={user.latitude || 16.411991}
        longitude={user.longitude || 120.594736}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setPopupInfo(user);
        }}
      >
        <Pin />
      </Marker>
    ));
  }, [data]);
  
  // const [allDays, useAllDays] = useState(true);
  // const [timeRange, setTimeRange] = useState([0, 0]);
  // const [selectedTime, selectTime] = useState(0);
  // const [earthquakes, setEarthQuakes] = useState(null);

  // const heatmapLayer: LayerProps = {
  //   id: "heatmap",
  //   type: "heatmap",
  //   source: "heatmapData",
  //   maxzoom: 15,
  //   paint: {
  //     "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 6, 1],
  //     "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 15, 3],
  //     "heatmap-color": [
  //       "interpolate",
  //       ["linear"],
  //       ["heatmap-density"],
  //       0,
  //       "rgba(33,102,172,0)",
  //       0.2,
  //       "rgb(103,169,207)",
  //       0.4,
  //       "rgb(209,229,240)",
  //       0.6,
  //       "rgb(253,219,199)",
  //       0.8,
  //       "rgb(239,138,98)",
  //       1,
  //       "rgb(178,24,43)",
  //     ],
  //     "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 15, 20],
  //     "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 15, 0],
  //   },
  // };

  // useEffect(() => {
  //   /* global fetch */
  //   fetch('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson')
  //     .then(resp => resp.json())
  //     .then(json => {
  //       const features = json.features;
  //       const endTime = features[0].properties.time;
  //       const startTime = features[features.length - 1].properties.time;

  //       setTimeRange([startTime, endTime]);
  //       setEarthQuakes(json);
  //       selectTime(endTime);
  //     })
  //     .catch(err => console.error('Could not load data', err)); // eslint-disable-line
  // }, []);
  // const data = useMemo(() => {
  //   return allDays ? earthquakes : filterFeaturesByDay(earthquakes, selectedTime);
  // }, [earthquakes, allDays, selectedTime]);

  return (
    <CardWrapper headerLabel="Bfp">
      <div className="flex justify-between items-center py-4">
        <h1 className="font-bold text-2xl">Maps</h1>
      </div>
      <div className="h-2/3 w-full">
        <Map
          mapLib={import("mapbox-gl")}
          initialViewState={{
            latitude: 16.41516667,
            longitude: 120.59559444,
            zoom: 16,
          }}
          style={containerStyle}
          mapStyle="mapbox://styles/mapbox/standard"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_KEY}
        >
          <GeolocateControl position="top-right" />
          <FullscreenControl position="top-right" />
          <NavigationControl position="top-right" />
          <ScaleControl />
          {pins}
          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
            >
              <div>{popupInfo.name} | </div>
            </Popup>
          )}
          {/* <Source id="heatmapData" type="geojson" data={data} >
            <Layer {...heatmapLayer} />
          </Source> */}
        </Map>
      </div>
    </CardWrapper>
  );
};
