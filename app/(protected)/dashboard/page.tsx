"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
// import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { Document } from "@/constants/data";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { SmokeGauge } from "@/components/cards/smoke-gauge";
import { getSensorData } from "@/actions/sensor";

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
    const percentage = (value / reference) ;
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
          {/* <div className="hidden md:flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div> */}
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-4 gap-4 h-auto">
              <SmokeGauge percent={percent} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};
export default DashboardPage;