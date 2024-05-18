"use client";

import { CardWrapper } from "@/components/cards/sensorCard/card-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlusIcon } from "@radix-ui/react-icons";
import { SensorModal } from "@/components/modal/sensor-modal";
import { useState } from "react";
import { Sensor } from "@prisma/client";

interface AddSensorCardProps {
  data: any;
}

export const AddSensorCard: React.FC<AddSensorCardProps> = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  //   const onConfirm = async () => {
  //     const res = await createSensor(data);
  //     if (res !== null) {
  //       console.log("Success");
  //     } else {
  //       console.log("error");
  //     }
  //   };

  const onConfirm = async () => {};

  return (
    <>
      <SensorModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <CardWrapper>
        <div className="flex items-center justify-center p-6 bg-slate-200 rounded-md shadow-lg">
          <Button variant="ghost" className="w-auto h-auto" onClick={() => setOpen(true)}>
            <PlusIcon width={170} height={170} />
          </Button>
        </div>
      </CardWrapper>
    </>
  );
};
