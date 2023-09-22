import { connectToDatabase } from "@/lib/db";

async function getTimeSlotsHandler(req, res) {
  if (req.method === "GET") {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("times");
    console.log(collection);
    
    const timeSlots = await collection.find({}).toArray();
    res.status(200).json({ data: timeSlots });

    // return res.status(405).end();
  } else {
    res.status(500).json({ message: "Getting Items Failed!" });
  }
}

export default getTimeSlotsHandler;
