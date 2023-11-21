// import { NextResponse } from "next/server";

// import TakenTime from "@/models/takenTimeModel";
// import connectToDatabase from "@/app/db";

// connectToDatabase();

// export async function POST(req) {
//   if (req.method === "POST") {
//     try {
//       const {
//         member,
//         selectedCourtType,
//         selectedPlayersNumber,
//         selectedDate,
//         startedTime,
//         selectedTime,
//       } = await req.json();

//       const newTimeInfo = new TakenTime({
//         member,
//         title: `${member} - ${selectedCourtType} Court`,
//         courtType: selectedCourtType,
//         playersNumber: selectedPlayersNumber,
//         date: selectedDate,
//         start: startedTime,
//         time: selectedTime,
//       });

//       await newTimeInfo.save();

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
