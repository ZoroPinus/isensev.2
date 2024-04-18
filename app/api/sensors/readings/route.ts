import {
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensorById,
  updateLastReading,
} from "@/data/sensor";
import { NextResponse, NextRequest } from "next/server";


export const revalidate = 1;
export async function PUT(req: NextRequest) { // Change the function name to 'default'
  if (req.method !== "PUT") { // Check if the request method is not PUT
    return new NextResponse(null, {
      status: 405, // Method Not Allowed
      statusText: "Only PUT requests are allowed for this endpoint",
    });
  }

  try {
    const reading = await req.json();
    const { smokeLevel, id } = reading;
    const newReading = {
      smokeLevel: smokeLevel,
    };

    // Perform additional validation if needed

    const sensor = updateLastReading(id, newReading);

    if (!sensor) {
      return new NextResponse(null, {
        status: 403,
        statusText: "Sensor update failed or sensor does not exist",
      });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error processing PUT request:", error);
    return new NextResponse(null, { status: 500, statusText: "Internal Server Error" });
  }
}
