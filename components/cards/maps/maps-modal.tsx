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
import { Modal } from "@/components/ui/modal";

interface MapsModalProps {
  onAddressSelect: (location: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}
export const MapsModal: React.FC<MapsModalProps> = ({
  isOpen,
  onClose,
  onAddressSelect,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };
  const handleMapClick = async (event: mapboxgl.MapLayerMouseEvent) => {
    const { lngLat } = event;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_KEY}`
    );
    const data = await response.json();
    const address = data.features[0]?.place_name || "Address not found";
    setLng(lngLat.lng)
    setLat(lngLat.lat)
    onAddressSelect({ address, lat: lngLat.lat, lng: lngLat.lng });
  };

  return (
    <Modal
      title="Choose Address"
      description="Place a of your address on the map"
      isOpen={isOpen}
      onClose={onClose}
    >
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
            onClick={handleMapClick}
          >
            <GeolocateControl position="top-right" />
            <FullscreenControl position="top-right" />
            <NavigationControl position="top-right" />
            <ScaleControl />
            <Marker
              latitude={lat!}
              longitude={lng!}
              anchor="bottom"
            >
              <Pin />
            </Marker>
            ;
          </Map>
        </div>
      </CardWrapper>
    </Modal>
  );
};
