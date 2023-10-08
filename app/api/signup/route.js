import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.error("Method Not Allowed", { status: 405 });
  }
  
  try {
    const { name, email, password, role } = await req.json();

    console.log("Name", name);
    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      return NextResponse.error("Member Exists!", {
        status: 422,
      });
      // client.close();
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    return NextResponse.json(
      { message: "Member Registered!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error Happened!" }, { status: 500 });
  }
}
//   if (req.method !== "POST") {
//     return NextResponse.error("Method Not Allowed", { status: 405 });
//   }
//   const data = req.body;
//   const { name, email, password, passwordConfirmation, role } = data;
//   console.log(req.url);

//   if (!name || name.trim().length > 10) {
//     return NextResponse.error("Name Should Not Be More than 10 Characters", {
//       status: 422,
//     });
//   }

//   if (!email || !email.includes("@")) {
//     return NextResponse.error("Invalid Email", {
//       status: 422,
//     });
//   }

//   if (!password || password.trim().length < 6) {
//     return NextResponse.error("Password Should Be More than 6 Characters", {
//       status: 422,
//     });
//   }

//   if (password !== passwordConfirmation) {
//     return NextResponse.error("Password Should Be Matched", {
//       status: 422,
//     });
//   }

//   const client = await connectToDatabase();

//   const db = client.db();

//   const existingUser = await db.collection("users").findOne({ email: email });

//   if (existingUser) {
//     return NextResponse.error("Member Exists!", {
//       status: 422,
//     });
//     // client.close();
//   }

//   const hashedPassword = await hashPassword(password);

//   const result = await db.collection("users").insertOne({
//     name: name,
//     email: email,
//     password: hashedPassword,
//     role: role,
//   });
//   return NextResponse.error("Created Member!", {
//     status: 201,
//   });
// client.close();
// }

// -----------------

// import { hashPassword } from "@/lib/auth";
// import { connectToDatabase } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   if (req.method !== "POST") {
//     return NextResponse.error("Method Not Allowed", { status: 405 });
//   }
//   const data = req.body;
//   const { name, email, password, passwordConfirmation, role } = data;
//   console.log(req.url);

//   if (!name || name.trim().length > 10) {
//     return NextResponse.error("Name Should Not Be More than 10 Characters", {
//       status: 422,
//     });
//   }

//   if (!email || !email.includes("@")) {
//     return NextResponse.error("Invalid Email", {
//       status: 422,
//     });
//   }

//   if (!password || password.trim().length < 6) {
//     return NextResponse.error("Password Should Be More than 6 Characters", {
//       status: 422,
//     });
//   }

//   if (password !== passwordConfirmation) {
//     return NextResponse.error("Password Should Be Matched", {
//       status: 422,
//     });
//   }

//   const client = await connectToDatabase();

//   const db = client.db();

//   const existingUser = await db.collection("users").findOne({ email: email });

//   if (existingUser) {
//     return NextResponse.error("Member Exists!", {
//       status: 422,
//     });
//     // client.close();
//   }

//   const hashedPassword = await hashPassword(password);

//   const result = await db.collection("users").insertOne({
//     name: name,
//     email: email,
//     password: hashedPassword,
//     role: role,
//   });
//   return NextResponse.error("Created Member!", {
//     status: 201,
//   });
//   // client.close();
// }
