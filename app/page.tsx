"use client"

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [smokeLevel, setSmokeLevel] = useState(0);
  const sensorId = "662154e4ff1d109ac770e0c2";
  const apiUrl = `http://localhost:3000/api/sensors/readings`;

  const updateSmokeLevel = async () => {
    try {
     
      const newSmokeLevel = 1 + smokeLevel; // Increment the smoke level by 1 (for example)
      const updateResponse = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ smokeLevel: newSmokeLevel, id: sensorId }),
      });

      if (updateResponse.ok) {
        setSmokeLevel(newSmokeLevel + 1);
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
