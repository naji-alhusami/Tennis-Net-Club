const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.VERCEL_URL
    : process.env.NEXTAUTH_URL;

const apiUrl = `${baseUrl}/api/players/getPlayers`;

export async function fetchPlayersFromMongo() {
  const response = await fetch(apiUrl, {
    cache: "no-cache",
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}
