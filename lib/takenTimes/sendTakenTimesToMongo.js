export async function sendTakenTimesToMongo(
  selectedCourtType,
  selectedPlayersNumber,
  selectedDate,
  selectedTime,
  startedTime
) {
  const response = await fetch("/api/takenTimes/insertTakenTimes", {
    method: "POST",
    body: JSON.stringify({
      selectedCourtType,
      selectedPlayersNumber,
      selectedDate,
      selectedTime,
      startedTime,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (response.ok) {
    console.log(data);
  }
  // throw new Error(takenTimesData.message || "Something went wrong!");
}
