"use server";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? `http://${process.env.VERCEL_URL}`
    : process.env.NEXTAUTH_URL;

const apiUrl = `${baseUrl}/api/takenTimes/getTakenTimes`;

export async function fetchTakenTimesFromMongo() {
  const response = await fetch(apiUrl, {
    cache: "no-cache",
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}
