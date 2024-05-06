"use server";

import {
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensorById,
} from "@/data/sensor";
import { db } from "@/lib/db";
export const getSensorData = async (id: string) => {
  const fetchData = await getSensorById(id);

  if (fetchData == null) {
    return { error: "No Result" };
  }
  console.log(fetchData.lastReadingId)
  try {
    const sensorReading = await db.lastReading.findUnique({
      where: { id: fetchData.lastReadingId! },
      select: {
        smokeLevel: true,
      },
    });
    return sensorReading;
  } catch (error) {
    console.error("Error fetching sensor by ID:", error);
    return null;
  }
};
