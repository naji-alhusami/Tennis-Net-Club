import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

async function handler(req, res) {
  console.log("naji");
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { name, email, password, passwordConfirmation, role } = data;

  console.log(data);

  if (!name || name.trim().length > 10) {
    res
      .status(422)
      .json({ message: "Name Should Not Be More than 10 Characters" });
    return;
  }

  if (!email || !email.includes("@")) {
    res.status(422).json({ message: "Invalid Email" });
    return;
  }

  if (!password || password.trim().length < 6) {
    res
      .status(422)
      .json({ message: "Password Should Be More than 6 Characters" });
    return;
  }

  if (password !== passwordConfirmation) {
    res.status(422).json({ message: "Passwords Should Be Matched" });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "Member Exists!" });
    // client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    name: name,
    email: email,
    password: hashedPassword,
    role: role,
  });

  // client.close();
  res.status(201).json({ message: "Created Member!" });
}

export default handler;
