import { NextResponse } from "next/server";

import Event from "@/models/eventModel";
import connectToDatabase from "@/app/db";

connectToDatabase();

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { member, selectedDate, endedDate, daysOfWeek } = await req.json();

      if (endedDate && daysOfWeek) {
        const TrainingEvent = {
          title: "Training Session",
          member: member,
          startRecur: selectedDate,
          endRecur: endedDate,
          daysOfWeek: daysOfWeek,
        };

        const newTrainingEvent = new Event(TrainingEvent);
        await newTrainingEvent.save();
      }

      // cosole.log(endedDate);
      // const courtReservationEvent = {
      //   member: member,
      //   date: selectedDate,
      // };

      // const newReservationEvent = new Event(courtReservationEvent);
      // await newReservationEvent.save();

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
