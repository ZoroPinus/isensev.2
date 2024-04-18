import {
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensorById,
  updateLastReading,
} from "@/data/sensor";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const url = req.nextUrl.searchParams;
  const qry = url.get("q");
  if (qry === null) {
    // Handle the case where 'q' parameter is not present in the URL
    return new NextResponse(null, {
      status: 400,
      statusText: "'q' parameter is missing",
    });
  }
  const reading = await req.json();
  //@ts-ignore
  const { temperature, gasLevel, id } = reading;
  const newReading = {
    temperature: temperature,
    gasLevel: gasLevel,
  };
  // todo inlcude more validation for each user and their sensors
  const sensor = updateLastReading(qry, newReading);

  if (!sensor) {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(null, { status: 200 });
}
