import { NextResponse } from "next/server";

import Contact from "@/models/contactModel";
import connectToDatabase from "@/lib/db";

connectToDatabase();

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { email, name, message } = await req.json();
      const contact = {
        email,
        name,
        message,
      };

      const newContact = new Contact(contact);
      await newContact.save();

      return NextResponse.json(
        { message: "Your contact Information sent Successfully!" },
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
