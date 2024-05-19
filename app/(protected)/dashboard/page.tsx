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
import { User } from "@prisma/client";
import { members } from "@/actions/admin";

type SensorData = {
  gasConcentration?: number;
};
const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [percent, setPercent] = useState<number>();
  const [sensorData, setSensorData] = useState<Sensor[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await members();
    if (response == null) {
      throw new Error("Failed to fetch data");
    }
    if ("error" in response) {
      console.error(response.error);
    } else {
      setUsers(response);
    }
  };
  // const datas = await getSensorData("662154e4ff1d109ac770e0c2")
  const getGaugeData = async () => {
    try {
      const res = await getLastReading("662154e4ff1d109ac770e0c2");
      if (res === null) {
        throw new Error("Failed to fetch data");
      }
      const convertedToPercent = convertToPercentage(res);
      setPercent(convertedToPercent);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSensorData = async () => {
    if (status === "authenticated") {
      const res = await getAllSensorByUserId(session!.user!.id!);
      if (res == null) {
        throw new Error("Failed to fetch data");
      }
      setSensorData(res);
    }
  };

  function convertToPercentage(value: any, reference = 50) {
    const percentage = value.gasConcentration / reference;
    return percentage;
  }

  useEffect(() => {
    if (session!.user!.role! === UserRole.ADMIN) {
      fetchUsers();
    } else {
      getGaugeData();
      fetchSensorData();
    }
  }, [session]);
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi{" "}
            {session!.user!.role! === UserRole.ADMIN
              ? "Admin!"
              : session!.user!.name!}
            , Welcome Back 👋
          </h2>
        </div>
        {session!.user!.role! === UserRole.ADMIN ? (
          <>
            <MapsCard data={users}/>
            <UsersCard data={users}/>
          </>
        ) : (
          // For Members
          <>
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
                  {sensorData.map((sensor: Sensor, id: number) => (
                    <SensorCard key={id} sensorName={sensor.sensorName} />
                  ))}
                  <AddSensorCard data="love" />
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </ScrollArea>
  );
};
export default DashboardPage;
