import {
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensorById,
  updateLastReading,
} from "@/data/sensor";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  const sensorData = await req.json();
  // todo inlcude more validation for each user and their sensors
  const sensor = createSensor(sensorData);

  if (!sensor) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, { status: 200 });
}




