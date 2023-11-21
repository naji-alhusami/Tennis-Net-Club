// export async function sendTakenTimesToMongo(
//   member,
//   selectedCourtType,
//   selectedPlayersNumber,
//   selectedDate,
//   selectedTime,
//   startedTime
// ) {
//   const response = await fetch("/api/takenTimes/insertTakenTimes", {
//     method: "POST",
//     body: JSON.stringify({
//       member,
//       selectedCourtType,
//       selectedPlayersNumber,
//       selectedDate,
//       selectedTime,
//       startedTime,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error("Failed to send data");
//   }
// }
