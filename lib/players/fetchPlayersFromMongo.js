// const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? `https://${process.env.VERCEL_URL}`
//     : process.env.NEXTAUTH_URL;

const apiUrl = `${process.env.NEXTAUTH_URL}/api/players/getPlayers`;

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
