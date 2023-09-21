import { connectToDatabase } from "@/lib/db";

async function insertTimesSlotsHandler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);

    const client = await connectToDatabase();
    const db = client.db();

    let timeSlots;

    try {
      const existingTimes = await db.collection("times").countDocuments();
      console.log(existingTimes);

      if (existingTimes > 0) {
        await db.collection("times").deleteMany({});
      }
      // Convert date and time strings to JavaScript Date objects
      const timeSlots = req.body.map((slot) => ({
        date: slot.date,
        time: slot.time,
        status: slot.status,
      }));

      const result = await db.collection("times").insertMany(timeSlots);
      timeSlots.id = result.insertedIds;
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
