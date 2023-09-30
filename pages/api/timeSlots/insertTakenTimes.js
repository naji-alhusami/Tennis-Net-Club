import { connectToDatabase } from "@/lib/db";

async function insertTakenTimesHandler(req, res) {
  if (req.method === "POST") {
    const { _id, time, date } = req.body;
    const client = await connectToDatabase();
    const db = client.db();

    // const takenTimeDate = new Date(date);
    // const expirationDate = new Date(takenTimeDate);
    // expirationDate.setDate(takenTimeDate.getMinutes() + 1);
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    expirationDate.setHours(currentDate.getHours() + 4);
    console.log(expirationDate);

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
