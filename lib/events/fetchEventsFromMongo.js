const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXTAUTH_URL;

const apiUrl = `${baseUrl}/api/events/getEvents`;

export async function fetchEventsFromMongo() {
  try {
    const response = await fetch(apiUrl, {
      cache: "no-cache",
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Failed to fetch data. Status code:", response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
