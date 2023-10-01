import { connectToDatabase } from "@/lib/db";

async function insertTakenTimesHandler(req, res) {
  if (req.method === "POST") {
    const { _id, time, date } = req.body;
    const client = await connectToDatabase();
    const db = client.db();

    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    expirationDate.setDate(currentDate.getDate() + 3);
    await db
      .collection("takenTimes")
      .createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });

    const takenTime = {
      _id: _id,
      time: time,
      date: date,
      status: false,
      expireAt: expirationDate,
    };

    try {
      const result = await db.collection("takenTimes").insertOne(takenTime);
    } catch (error) {
      res.status(500).json({ message: "Storing Taken Times failed." });
    } finally {
      client.close();
    }
    res.status(201).json({
      message: "Successfully stored taken times!",
      takenTimes: takenTime,
    });
  }
}

export default insertTakenTimesHandler;
