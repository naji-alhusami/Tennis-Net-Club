"use server";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
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
    // next: {
    //   revalidate: 1,
    // },
  });

  if (!response.ok) {
    console.log("Failed to fetch data");
    // throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}
