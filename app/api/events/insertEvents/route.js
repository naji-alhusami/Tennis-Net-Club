import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Event from "@/models/eventModel";

connectToDatabase();

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { member, selectedDate, endedDate } = await req.json();

      if (endedDate) {
        const TrainingEvent = {
          title: "Training Session",
          member: member,
          startRecur: selectedDate,
          endRecur: endedDate,
        };

        const newTrainingEvent = new Event(TrainingEvent);

        await newTrainingEvent.save();
      }

      cosole.log(endedDate);
      // Create a base event object with mandatory properties
      const courtReservationEvent = {
        member: member,
        date: selectedDate,
      };

      const newReservationEvent = new Event(courtReservationEvent);
      await newReservationEvent.save();

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
