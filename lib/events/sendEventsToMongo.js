export async function sendEventsToMongo(member, selectedDate, endedDate) {
  console.log(member);
  console.log(selectedDate);
  console.log(endedDate);
  const response = await fetch("/api/events/insertEvents", {
    method: "POST",
    body: JSON.stringify({
      member,
      selectedDate,
      endedDate,
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
