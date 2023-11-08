export async function sendEventsToMongo(
  member,
  selectedDate,
  endedDate,
  daysOfWeek
) {
  console.log(member);
  console.log(selectedDate);
  console.log(endedDate);
  console.log(daysOfWeek);
  const response = await fetch("/api/events/insertEvents", {
    method: "POST",
    body: JSON.stringify({
      member,
      selectedDate,
      endedDate,
      daysOfWeek,
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
