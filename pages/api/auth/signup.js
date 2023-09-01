import { connectToDatabase } from "@/lib/db";

async function handler(req, res) {
  const data = req.body;
  const { name, email, password, passwordConfirmation } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid Input" });
    return;
  }

  await connectToDatabase();

  const db = client.db();

  db.collection("users").insertOne({
    email: email,
    password: password,
  });
}

export default handler;
