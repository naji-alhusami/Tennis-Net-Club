import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function connectToDatabase() {
  try {
    const clientNaji = await MongoClient.connect(process.env.MONGODB_URL);
    return clientNaji;
  } catch {
    return NextResponse.json(
      { message: "Could connect to Database." },
      {
        status: 500,
      }
    );
  }
}
