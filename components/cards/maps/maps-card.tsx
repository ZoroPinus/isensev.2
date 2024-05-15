"use client";

import GoogleMap from "@/components/GoogleMap";
import { CardWrapper } from "@/components/cards/maps/card-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Map from "react-map-gl";
export const MapsCard = () => {
  return (
    <CardWrapper headerLabel="Bfp">
      <div className="flex justify-between items-center py-4">
        <h1 className="font-bold text-2xl">Maps</h1>
        {/* <Button className="rounded-2xl bg-indigo-400">
            Full Screen
        </Button> */}
      </div>
      <div className="h-2/3 w-full">
        <GoogleMap />
        {/* <Map
          mapLib={import("mapbox-gl")}
          initialViewState={{
            latitude: 16.41516667,
            longitude: 120.59559444,
            zoom: 3.5,
          }}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        /> */}
      </div>
    </CardWrapper>
  );
};
