import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
  if (req.method === "POST") {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("takenTimes");

    try {
      const {
        selectedCourtType,
        selectedPlayersNumber,
        selectedDate,
        startedTime,
        selectedTime,
      } = await req.json();
      console.log(collection);

      const eventType = {
        title: "Court Reservation",
        date: selectedDate,
      };

      const timeInfo = {
        title: `${selectedCourtType} Court`,
        courtType: selectedCourtType,
        playersNumber: selectedPlayersNumber,
        date: selectedDate,
        start: startedTime,
        time: selectedTime,
        // end: selectedTime,
      };

      const existingEvent = await collection.findOne({
        title: eventType.title,
      });

      if (existingEvent) {
        const result = await collection.insertOne(timeInfo);
      } else {
        const documentsToInsert = [eventType, timeInfo];
        const result = await collection.insertMany(documentsToInsert);
      }

      return NextResponse.json(
        { message: "Successfully stored taken time!" },
        {
          status: 201,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Storing Taken Times failed." },
        {
          status: 500,
        }
      );
    } finally {
      client.close();
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
