export async function fetchEventsFromMongo() {
  const response = await fetch(
    process.env.NEXTAUTH_URL + "/api/events/getEvents",
    {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    console.log("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}