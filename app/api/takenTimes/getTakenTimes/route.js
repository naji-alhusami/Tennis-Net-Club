// import { connectToDatabase } from "@/lib/db";
// import connectToDatabase from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(req) {
//   if (req.method === "GET") {
//     const client = await connectToDatabase();
//     console.log(client);
//     const db = client.db();
//     console.log("first GET getTakenTime");
//     const collection = db.collection("takenTimes");

//     try {
//       const takenTimes = await collection.find({}).toArray();
//       return NextResponse.json(
//         { data: takenTimes },
//         {
//           status: 200,
//         }
//       );
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return NextResponse.json(
//         { message: "Getting Items Failed!" },
//         {
//           status: 500,
//         }
//       );
//     } finally {
//       client.close();
//     }
//   } else {
//     return NextResponse.json(
//       { message: "Invalid request method!" },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// --------------------

import connectToDatabase from "@/lib/db";
import TakenTime from "@/models/takenTimeModel";
import { NextResponse } from "next/server";

connectToDatabase();

export async function GET(req) {
  if (req.method === "GET") {
    try {
      // Fetch data using Mongoose
      const takenTimes = await TakenTime.find({});
      return NextResponse.json(
        { data: takenTimes },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json(
        { message: "Getting Items Failed!" },
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
