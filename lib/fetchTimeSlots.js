export async function fetchDataFromMongo() {
  const response = await fetch(
    "http://localhost:3000/api/timeSlots/getTimeSlots",
    {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from the server");
  }

  const data = await response.json();
  return data;
}
