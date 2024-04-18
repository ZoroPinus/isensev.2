import {
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
    getAllUsers
  } from "@/data/user";
  import { NextResponse, NextRequest } from "next/server";
  
  export async function POST(req: Request) {
    const userData = await req.json();
    // todo inlcude more validation for each user and their sensors
    const sensor = createUser(userData);
  
    if (!sensor) {
      return new NextResponse(null, { status: 403 });
    }
  
    return new NextResponse(null, { status: 200 });
  }

  export async function GET(req: NextRequest) {
    try {
      const users = await getAllUsers();
      
      if (!users) {
        return new NextResponse(null, { status: 404, statusText: "No users found" });
      }
  
      return new NextResponse(JSON.stringify(users), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
      console.error("Error fetching users:", error);
      return new NextResponse(null, { status: 500, statusText: "Internal Server Error" });
    }
  }
  