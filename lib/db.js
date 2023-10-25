// import { MongoClient } from "mongodb";
// import { NextResponse } from "next/server";

// export async function connectToDatabase() {
//   try {
//     const clientNaji = await MongoClient.connect(process.env.MONGODB_URL);
//     return clientNaji;
//   } catch {
//     return NextResponse.json(
//       { message: "Could connect to Database." },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// -----------------------

import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    const client = await mongoose.connect(process.env.MONGODB_URL);
    return client;
    // await mongoose.connect(process.env.MONGODB_URL);
    // console.log("DB Connectes");
    // return true;
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
