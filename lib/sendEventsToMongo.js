export async function sendEventsToMongo(selectedDate) {
  const response = await fetch("/api/insertEvents", {
    method: "POST",
    body: JSON.stringify({
      selectedDate,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (response.ok) {
    console.log(data);
  }
}
