"use client";

import GoogleMap from "@/components/GoogleMap";
import { CardWrapper } from "@/components/cards/maps/card-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const MapsCard = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <CardWrapper headerLabel="Bfp">
      <div className="flex justify-between items-center py-4">
        <h1 className="font-bold text-2xl">Maps</h1>
        <Button className="rounded-2xl bg-indigo-400">
            Full Screen
        </Button>
      </div>
      <div className="h-2/3 w-full">
        <GoogleMap />
      </div>
    </CardWrapper>
  );
};
