export function generateTimeSlots(date) {
  // console.log(date, takenTimes);
  const timeSlots = [];

  // Get the current time
  const currentDate = new Date();

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

    // Set the status to false in third day for the times after the current time
    const afterCurrentTimeInThirdDay =
      date.getDate() === currentDate.getDate() + 3 &&
      currentDate.getHours() < new Date(currentTime).getHours();

    // Set the status to false for all the times after the third day
    const daysDifference = Math.floor(
      (date - currentDate) / (1000 * 60 * 60 * 24) // Convert milliseconds to days
    );

      // const isTaken = takenTimes.map((takenTime)=>{
      //   if(takenTime.date === )
      // })
      // console.log(timeSlots);

    const status =
      afterCurrentTimeInThirdDay ||
      currentTime <= currentDate ||
      daysDifference >= 3
        ? false
        : true;
    timeSlots.push({
      date: formattedDate,
      time: formattedTime,
      status: status,
    });

    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }

  // console.log(timeSlots);
  return timeSlots;
}
