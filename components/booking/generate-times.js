// export async function generateTimeSlots(activeDay) {
//   try {
//     // Get time slots for the current day and the next 3 days
//     const currentDate = new Date(activeDay);
//     const futureDates = [currentDate];

//     for (let i = 1; i <= 3; i++) {
//       const nextDate = new Date(currentDate);
//       nextDate.setDate(currentDate.getDate() + i);
//       nextDate.setHours(8, 0, 0, 0); // Set the start time to 09:00:00
//       futureDates.push(nextDate);
//     }

//     const timeSlotsData = [];
//     for (const date of futureDates) {
//       const timeSlotsForDate = fetchTimeSlots(date);
//       timeSlotsData.push(...timeSlotsForDate);
//     }

//     console.log(timeSlotsData);
//     return timeSlotsData;
//   } catch (error) {
//     console.error("Error fetching time slots:", error);
//   }
// }

export function generateTimeSlots(date) {
  const timeSlots = [];

  // Get the current time
  const now = new Date();

  // Set the start time to 9:00 AM on the selected date
  const startTime = new Date(date);
  startTime.setHours(9, 0, 0, 0);

  // Set the end time to 9:00 PM on the same date
  const endTime = new Date(date);
  endTime.setHours(21, 0, 0, 0);

  const intervalMinutes = 60; // You can adjust this to your desired time slot interval

  let currentTime = new Date(startTime);

  while (currentTime <= endTime) {
    const formattedTime = new Date(currentTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const formattedDate = currentTime.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    // Set the status based on whether the current time is before or after now
    const afterCurrentTimeInThirdDay =
      date.getDate() === now.getDate() + 3 &&
      now.getHours() < new Date(currentTime).getHours();
    const daysDifference = Math.floor(
      (date - now) / (1000 * 60 * 60 * 24) // Convert milliseconds to days
    );

    const status =
      afterCurrentTimeInThirdDay || currentTime <= now || daysDifference >= 3
        ? false
        : true;
    console.log(now);
    console.log(date);
    timeSlots.push({
      date: formattedDate,
      time: formattedTime,
      status: status,
    });

    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }

  console.log(timeSlots);
  return timeSlots;
}
