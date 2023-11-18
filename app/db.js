import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState === 1) {
      // 1 means connected
      console.log("Using existing database connection");
      return true;
    }

    // If not connected, establish a new connection
    const client = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Connected to the database");
    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    return NextResponse.json(
      { message: "Could not connect to the Database." },
      {
        status: 500,
      }
    );
  }
}

export default connectToDatabase;
