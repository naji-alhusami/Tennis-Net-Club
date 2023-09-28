export async function sendDataToMongo(generatedTimes) {
  const response = await fetch("/api/timeSlots/insertTimeSlots", {
    method: "POST",
    body: JSON.stringify(generatedTimes),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const timeSlotsData = await response.json();

  if (!response.ok) {
    throw new Error(timeSlotsData.message || "Something went wrong!");
  }
}
