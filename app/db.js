import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    const client = await mongoose.connect(process.env.MONGODB_URL);

    require("../models/eventModal");
    require("../models/takenTimeModal");
    require("../models/userModal");
    
    return client;
  } catch {
    return NextResponse.json(
      { message: "Could connect to Database." },
      {
        status: 500,
      }
    );
  }
}

export default connectToDatabase;
