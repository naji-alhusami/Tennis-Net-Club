export async function fetchTakenTimesFromMongo() {
  const response = await fetch("/api/getEvents", {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log("Failed to fetch data");
  }

  const data = await response.json();
  return data;
}
