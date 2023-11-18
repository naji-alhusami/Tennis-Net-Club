import { NextResponse } from "next/server";

import Event from "@/models/eventModel";
import connectToDatabase from "@/lib/db";

connectToDatabase();

export async function GET(req) {
  if (req.method === "GET") {
    try {
      // Fetch data using Mongoose
      const events = await Event.find({}).maxTimeMS(30000);;
      
      return NextResponse.json(
        { data: events },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json(
        { message: "Getting Items Failed!" },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Invalid request method!" },
      {
        status: 500,
      }
    );
  }
}
