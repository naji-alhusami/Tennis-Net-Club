import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Event from "@/models/eventModel";

connectToDatabase();

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { email, name, message } = await req.json();
      // console.log(member, selectedDate, endedDate, daysOfWeek);
      //   if (endedDate && daysOfWeek) {
      const contact = {
        email,
        name,
        message,
      };

      const newContact = new Event(contact);
      await newContact.save();

      return NextResponse.json(
        { message: "Successfully stored contact information!" },
        {
          status: 201,
        }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Storing contact information failed." },
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
