import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Event from "@/models/eventModel";

connectToDatabase();

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { member, selectedDate } = await req.json();
      console.log("insied the API ROUTE", member);
      const newEvent = new Event({
        member: member,
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
