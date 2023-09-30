import { connectToDatabase } from "@/lib/db";

async function getTakenTimesHandler(req, res) {
  if (req.method === "GET") {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("takenTimes");

    try {
      const takenTimes = await collection.find({}).toArray();
      res.status(200).json({ data: takenTimes });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Getting Items Failed!" });
    } finally {
      client.close();
    }
  } else {
    res.status(500).json({ message: "Invalid request method!" });
  }
}

export default getTakenTimesHandler;
