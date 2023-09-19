import { connectToDatabase } from "@/lib/db";

async function insertTimesSlotsHandler(req, res) {
  if (req.method === "POST") {
    // Check the request method
    const { time } = req.body;
    console.log(time);
  }
}

export default insertTimesSlotsHandler;
