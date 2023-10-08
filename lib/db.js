import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    return client;
  } catch {
    res.status(500).json({ message: "Could connect to Database." });
    return;
  }
}
