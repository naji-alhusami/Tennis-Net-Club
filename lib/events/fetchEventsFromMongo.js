const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://tennis-net-club-axdslxbez-najis-projects-09105145.vercel.app"
    : process.env.NEXTAUTH_URL;

export async function fetchEventsFromMongo() {
  const response = await fetch(`${apiUrl}/api/events/getEvents`, {
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
