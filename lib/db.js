import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://najihussami:2eDfDL3wzF7d50DQ@cluster0.p5janj2.mongodb.net/tennisClub?retryWrites=true&w=majority"
    );
    return client;
  } catch {
    res.status(500).json({ message: "Could connect to Database." });
    return;
  }
}

// import { MongoClient } from 'mongodb';

// export async function connectToDatabase() {
//   const client = await MongoClient.connect(process.env.MONGODB_URI);
//   return client.db();
// }