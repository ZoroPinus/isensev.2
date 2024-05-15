"use client";

import { CardWrapper } from "@/components/cards/sensorCard/card-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SensorCardProps {
  sensorName?: string;
}

export const SensorCard: React.FC<SensorCardProps> = ({ sensorName }) => {

  

  return (
    <CardWrapper>
      <div className=""></div>
      <div className="flex items-center justify-center p-6 bg-slate-200 rounded-md shadow-lg">
        <Image
          width={170}
          height={170}
          alt="Website logo"
          src="https://utfs.io/f/b5e77044-3bd4-49ea-a3ed-e847e31206e9-ezdm4m.png"
        />
      </div>
      <div className="flex items-center justify-between p-4 ">
        <h3>{sensorName}</h3>
        <Button className="text-xs md:text-sm">Settings</Button>
      </div>
    </CardWrapper>
  );
};
