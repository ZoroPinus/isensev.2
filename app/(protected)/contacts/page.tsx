"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
// import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Sensor, UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { SmokeGauge } from "@/components/cards/smoke-gauge/smoke-gauge";
import { getLastReading, getSensorDataById } from "@/actions/sensor";
import { SensorCard } from "@/components/cards/sensorCard/sensorCard";
import { ContactsCard } from "@/components/cards/contacts/contacts-card";
import { BfpCard } from "@/components/cards/bfp/bfp-card";
import { MapsCard } from "@/components/cards/maps/maps-card";
import GoogleMap from "@/components/GoogleMap";
import { UsersCard } from "@/components/cards/users/users-card";
import { AddSensorCard } from "@/components/cards/sensorCard/addSensor";
import { getAllSensorByUserId } from "@/data/sensor";
import { Icons } from "@/components/icons";
type SensorData = {
  gasConcentration?: number;
};
const ContactsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [percent, setPercent] = useState<number>();
  const [sensorData, setSensorData] = useState<Sensor[]>([]);

  // const datas = await getSensorData("662154e4ff1d109ac770e0c2")
  const getGaugeData = async () => {
    try {
      const res = await getLastReading("662154e4ff1d109ac770e0c2");
      if (res === null) {
        throw new Error("Failed to fetch data");
      }
      console.log(res);
      const convertedToPercent = convertToPercentage(res);
      setPercent(convertedToPercent);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSensorData = async () => {
    if (status === "authenticated") {
      const res = await getAllSensorByUserId(session.user.id!);
      if (res == null) {
        throw new Error("Failed to fetch data");
      }
      console.log(res);
      setSensorData(res);
    }
  };

  function convertToPercentage(value: any, reference = 50) {
    const percentage = value.gasConcentration / reference;
    return percentage;
  }

  useEffect(() => {
    getGaugeData();
    fetchSensorData();
  }, []);

  if (status === "loading") {
    return <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />;
  }
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi Welcome back Admin!👋
          </h2>
        </div>
        <MapsCard />
        <UsersCard userName="John Lee" />
      </div>
    </ScrollArea>
  );
};
export default ContactsPage;
