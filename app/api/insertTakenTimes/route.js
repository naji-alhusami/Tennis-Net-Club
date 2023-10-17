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
        selectedTime,
      } = await req.json();

      const takenTime = {
        courtType: selectedCourtType,
        playersNumber: selectedPlayersNumber,
        date: selectedDate,
        time: selectedTime,
      };

      const result = await collection.insertOne(takenTime);
      console.log(takenTime);

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
