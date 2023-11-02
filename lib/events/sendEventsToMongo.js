export async function sendEventsToMongo(member, selectedDate) {
  console.log(member);
  const response = await fetch("/api/events/insertEvents", {
    method: "POST",
    body: JSON.stringify({
      member,
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
