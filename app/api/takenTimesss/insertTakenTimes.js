// import { connectToDatabase } from "@/lib/db";
// import { NextResponse } from "next/server";

// async function insertTakenTimesHandler(req, res) {
//   if (req.method === "POST") {
//     const { _id, time, date } = req.body;
//     const client = await connectToDatabase();
//     const db = client.db();

//     const currentDate = new Date();
//     const expirationDate = new Date(currentDate);
//     expirationDate.setDate(currentDate.getDate() + 3);
//     await db
//       .collection("takenTimes")
//       .createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });

//     const takenTime = {
//       _id: _id,
//       time: time,
//       date: date,
//       status: false,
//       expireAt: expirationDate,
//     };

//     try {
//       const result = await db.collection("takenTimes").insertOne(takenTime);
//     } catch (error) {
//       return NextResponse.json(
//         { message: "Storing Taken Times failed." },
//         {
//           status: 500,
//         }
//       );
//     } finally {
//       client.close();
//     }
//     return NextResponse.json(
//       { message: "Successfully stored taken times!" },
//       {
//         status: 201,
//       }
//     );
//   }
// }

// export default insertTakenTimesHandler;
