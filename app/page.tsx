"use client"

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [smokeLevel, setSmokeLevel] = useState(0);
  const sensorId = "662154e4ff1d109ac770e0c2";
  const apiUrl = `https://isensev-2.vercel.app/api/sensors/readings/?q=${sensorId}`;

  const updateSmokeLevel = async () => {
    try {
     
      const newSmokeLevel = 1; // Increment the smoke level by 1 (for example)
      const updateResponse = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ smokeLevel: newSmokeLevel }),
      });

      if (updateResponse.ok) {
        setSmokeLevel(newSmokeLevel);
      } else {
        console.error("Failed to update smoke level:", updateResponse.statusText);
      }
    } catch (error) {
      console.error("Error updating smoke level:", error);
    }
  };

  return (
    <main>
      <h1>Smoke Level: {smokeLevel ?? "Loading..."}</h1>
      <button onClick={updateSmokeLevel}>Update Smoke Level</button>
    </main>
  );
}
