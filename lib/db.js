import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://najihussami:3zcG4QfQ0pdRoUGq@cluster0.p5janj2.mongodb.net/tennis-club-site?retryWrites=true&w=majority"
  );

  return client;
}
