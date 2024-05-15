"use server";

import {
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensorById,
} from "@/data/sensor";
import { db } from "@/lib/db";
export const getLastReading = async (id: string) => {
  const fetchData = await getSensorById(id);

  if (fetchData == null) {
    return { error: "No Result" };
  }
  try {
    const sensorReading = await db.lastReading.findUnique({
      where: { id: fetchData.lastReadingId! },
      select: {
        gasConcentration: true,
      },
    });
    return sensorReading;
  } catch (error) {
    console.error("Error fetching sensor by ID:", error);
    return null;
  }
};

export const getSensorData = async (id: string) => {
  
  try {
    const fetchData = await getSensorById(id);
    if (fetchData == null) {
      return { error: "No Result" };
    }
    return fetchData;
  } catch (error) {
    console.error("Error fetching sensor by ID:", error);
    return null;
  }
};
