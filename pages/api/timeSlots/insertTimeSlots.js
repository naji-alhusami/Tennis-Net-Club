// import { connectToDatabase } from "@/lib/db";

// async function insertTimesSlotsHandler(req, res) {
//   if (req.method === "POST") {
//     console.log(req.body);

//     const client = await connectToDatabase();

//     const timeSlots = req.body.map((slot) => ({
//       date: slot.date,
//       time: slot.time,
//       status: slot.status,
//     }));

//     const db = client.db();
//     try {
//       const result = await db.collection("times").insertMany(timeSlots);
//       newTimes.id = result.insertedIds;
//     } catch (error) {
//       client.close();
//       res.status(500).json({ message: "Storing message failed." });
//       return;
//     }

//     client.close();

//     res
//       .status(201)
//       .json({ message: "Successfully stored message!", times: timeSlots });
//   }
// }

// export default insertTimesSlotsHandler;

import { connectToDatabase } from "@/lib/db";

async function insertTimesSlotsHandler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);

    const client = await connectToDatabase();

    // Convert date and time strings to JavaScript Date objects
    const timeSlots = req.body.map((slot) => ({
      date: slot.date,
      time: slot.time,
      status: slot.status,
    }));

    const db = client.db();
    try {
      const result = await db.collection("times").insertMany(timeSlots);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Storing message failed." });
    } finally {
      client.close();
    }

    res
      .status(201)
      .json({ message: "Successfully stored message!", times: timeSlots });
  }
}

export default insertTimesSlotsHandler;
