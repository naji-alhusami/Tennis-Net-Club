import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

async function handler(req, res) {
  console.log("naji");
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { name, email, password, passwordConfirmation, birthDate } = data;

  console.log(data);

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid Input" });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User Exists!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    name: name,
    email: email,
    password: hashedPassword,
    birthDate: birthDate,
  });

  res.status(201).json({ message: "Created Member!" });
  client.close();
}

export default handler;
