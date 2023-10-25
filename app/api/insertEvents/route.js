import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Event from "@/models/eventModel";

connectToDatabase();

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { selectedDate } = await req.json();

      const newEvent = new Event({
        // title: profile.name,
        date: selectedDate,
      });

      await newEvent.save();

      return NextResponse.json(
        { message: "Successfully stored event!" },
        {
          status: 201,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Storing event failed." },
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
