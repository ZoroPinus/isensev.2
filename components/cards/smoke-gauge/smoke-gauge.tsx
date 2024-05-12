"use client";

import { CardWrapper } from "@/components/cards/smoke-gauge/card-wrapper";
import GaugeChart from "react-gauge-chart";

interface SmokeGaugeProps {
  percent?:number;
}

export const SmokeGauge: React.FC<SmokeGaugeProps> = ({ percent }) => {
  return (
    <CardWrapper headerLabel="Smoke-Gauge">
      <GaugeChart
        id="gauge-chart5"
        nrOfLevels={420}
        arcsLength={[0.3, 0.5, 0.2]}
        colors={["#5BE12C", "#F5CD19", "#EA4228"]}
        percent={percent}
        arcPadding={0.02}
        textColor="5BE12C"
        needleColor="#345243" 
      />
    </CardWrapper>
  );
};
