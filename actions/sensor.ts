"use server";
import * as z from "zod";
import { getSensorById, updateSensor, deleteSensorById, getAllSensorByUserId } from "@/data/sensor";
import { db } from "@/lib/db";
import { SensorSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
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

export const getSensorDataById = async (id: string) => {
  try {
    const fetchData = await getSensorById(id);
    if (fetchData == null) {
      return { error: "No Result" };
    }
    return fetchData;
  } catch (error) {
    return { error: "User not found or missing ID!" };
  }
};

export const getAllSensorData = async (id: string) => {
  try {
    const fetchData = await getAllSensorByUserId(id);
    if (fetchData == null) {
      return { error: "No Result" };
    }
    return fetchData;
  } catch (error) {
    return { error: "User not found or missing ID!" };
  }
};

export const createSensorData = async (
  values: z.infer<typeof SensorSchema>
) => {
  const validatedFields = SensorSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { sensorName, location } = validatedFields.data;
  const currentUserData  = await currentUser();
  if (!currentUserData || !currentUserData.id) {
    return { error: "User not found or missing ID!" };
  }

  const userId = currentUserData.id;
  try {
    const newSensor = await db.sensor.create({
      data: { sensorName, location, status: "OK", userId: userId },
    });

    const initialLastReading = await db.lastReading.create({
      data: {
        gasConcentration: 0,
        sensorId: newSensor.id,
      },
    });

    await db.sensor.update({
      where: { id: newSensor.id },
      data: {
        lastReadingId: initialLastReading.id,
      },
    });

    return { success: "Sensor created successfully" };
  } catch (error) {
    console.error("Error creating sensor:", error);
    return { error: "There is an error in your input, Please try again" };
  }
};
