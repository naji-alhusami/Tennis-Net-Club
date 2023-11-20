const baseUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXTAUTH_URL;

const apiUrl = `${baseUrl}/api/events/getEvents`;

export async function fetchEventsFromMongo() {
  const response = await fetch(apiUrl, {
    cache: "no-cache",
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("apiUrl:", apiUrl);

  const data = await response.json();
  console.log("Response Data:", data);

  if (!response.ok) {
    console.log("Failed to fetch data");
  }

  return data;
}
