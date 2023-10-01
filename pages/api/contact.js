import { connectToDatabase } from "@/lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body; //we bring them from body: JSON.stringify

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invlaid Input." });
      return;
    }

    // store in DB
    const newMessage = {
      email,
      name,
      message,
    };

    const client = await connectToDatabase();

    const db = client.db();
    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed." });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", message: newMessage });
  }
}

export default handler;
