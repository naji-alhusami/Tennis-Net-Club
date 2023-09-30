import { connectToDatabase } from "@/lib/db";

async function insertTimeSlotsHandler(req, res) {
  if (req.method === "POST") {
    const client = await connectToDatabase();
    const db = client.db();

    let timeSlots;

    try {
      const existingTimes = await db.collection("times").countDocuments();

      if (existingTimes > 0) {
        await db.collection("times").deleteMany({});
      }
      timeSlots = req.body.map((slot) => ({
        date: slot.date,
        time: slot.time,
        status: slot.status,
      }));
      const result = await db.collection("times").insertMany(timeSlots);
      timeSlots.id = result.insertedIds;
    } catch (error) {
      res.status(500).json({ message: "Storing times failed." });
    } finally {
      client.close();
    }
    res
      .status(201)
      .json({ message: "Successfully stored times!", times: timeSlots });
  }
}

export default insertTimeSlotsHandler;
