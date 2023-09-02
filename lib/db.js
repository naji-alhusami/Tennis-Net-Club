import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://najihussami:0nsY4nTPFxlmJyRi@cluster0.p5janj2.mongodb.net/tennisClub?retryWrites=true&w=majority"
    );
    return client;
  } catch {
    res.status(500).json({ message: "Could connect to Database." });
    return;
  }
}
