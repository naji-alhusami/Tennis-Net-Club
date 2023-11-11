// import { NextResponse } from "next/server";
// import connectToDatabase from "@/lib/db";

// export async function POST(req) {
//   if (req.method === "POST") {
//     const client = await connectToDatabase();
//     const db = client.db();
//     const collection = db.collection("takenTimes");

//     try {
//       const {
//         selectedCourtType,
//         selectedPlayersNumber,
//         selectedDate,
//         startedTime,
//         selectedTime,
//       } = await req.json();
//       console.log(collection);

//       const eventType = {
//         title: "Court Reservation",
//         date: selectedDate,
//       };

//       const timeInfo = {
//         title: `${selectedCourtType} Court`,
//         courtType: selectedCourtType,
//         playersNumber: selectedPlayersNumber,
//         date: selectedDate,
//         start: startedTime,
//         time: selectedTime,
//         // end: selectedTime,
//       };

//       const existingEvent = await collection.findOne({
//         title: eventType.title,
//       });
//       console.log( );
//       if (existingEvent && existingEvent.date === timeInfo.date ) {
//         const result = await collection.insertOne(timeInfo);
//       } else {
//         const documentsToInsert = [eventType, timeInfo];
//         const result = await collection.insertMany(documentsToInsert);
//       }

//       return NextResponse.json(
//         { message: "Successfully stored taken time!" },
//         {
//           status: 201,
//         }
//       );
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
//   } else {
//     return NextResponse.json(
//       { message: "Invalid request method!" },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// ----------------------

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Event from "@/models/eventModel";
import TakenTime from "@/models/takenTimeModel";

connectToDatabase();

export async function POST(req) {
  if (req.method === "POST") {
    // const client = await connectToDatabase();
    // const db = client.db();
    // const collection = db.collection("takenTimes");

    try {
      const {
        member,
        selectedCourtType,
        selectedPlayersNumber,
        selectedDate,
        startedTime,
        selectedTime,
      } = await req.json();
      console.log(
        "inside route sending takenTimes:",
        member,
        selectedCourtType,
        selectedPlayersNumber,
        selectedDate,
        startedTime,
        selectedTime
      );

      // const newEvent = new Event({
      //   // title: profile.name,
      //   date: selectedDate,
      // });

      const newTimeInfo = new TakenTime({
        member,
        title: `${member} - ${selectedCourtType} Court`,
        courtType: selectedCourtType,
        playersNumber: selectedPlayersNumber,
        date: selectedDate,
        start: startedTime,
        time: selectedTime,
        // end: selectedTime,
      });

      // await newEvent.save();
      await newTimeInfo.save();

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
