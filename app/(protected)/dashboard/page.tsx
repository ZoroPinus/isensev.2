"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
// import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { SmokeGauge } from "@/components/cards/smoke-gauge/smoke-gauge";
import { getSensorData } from "@/actions/sensor";
import { SensorCard } from "@/components/cards/sensorCard/sensorCard";
import { ContactsCard } from "@/components/cards/contacts/contacts-card";
import { BfpCard } from "@/components/cards/bfp/bfp-card";
import { MapsCard } from "@/components/cards/maps/maps-card";
import GoogleMap from "@/components/GoogleMap";

interface SensorData {
  smokeLevel?: number;
}
const DashboardPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [percent, setPercent] = useState<number | undefined>();

  // const datas = await getSensorData("662154e4ff1d109ac770e0c2")
  const getGaugeData = async () => {
    getSensorData("662154e4ff1d109ac770e0c2").then((res) => {
      if ("smokeLevel" in res! && res.smokeLevel !== undefined) {
        const percent = convertToPercentage(res.smokeLevel);
        setPercent(percent);
      } else {
        console.log("error");
      }
    });
  };

  function convertToPercentage(value: any, reference = 8) {
    const percentage = value / reference;
    return percentage;
  }

  useEffect(() => {
    getGaugeData();
  }, [percent]);
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi{" "}
            {session!.user!.role! == UserRole.ADMIN
              ? "Admin!"
              : session!.user!.name!}
            , Welcome back 👋
          </h2>
        </div>
        <MapsCard/>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-4 gap-4 h-auto">
              <SmokeGauge percent={percent} />
              <ContactsCard contactName="John Lee" />
              <BfpCard />
            </div>
          </TabsContent>
          <TabsContent value="overview" className="space-y-4">
            <div className="flex items-center justify-between space-y-2 mt-6">
              <h2 className="text-2xl font-bold tracking-tight">
                Available Sensors
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-4 h-auto">
              <SensorCard sensorName="Kitchen" />
              <SensorCard sensorName="Bedroom 1" />
              <SensorCard sensorName="Bedroom 2" />
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </ScrollArea>
  );
};
export default DashboardPage;
