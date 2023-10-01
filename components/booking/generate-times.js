export function generateTimeSlots(activeDay) {
  const timeSlots = [];

  // Get the current time
  const currentDate = new Date();

  // Set the start time to 9:00 AM on the selected date
  const todayStartTime = new Date(activeDay);
  todayStartTime.setHours(9, 0, 0, 0);

  // Set the end time to 9:00 PM on the same date
  const todayEndTime = new Date(activeDay);
  todayEndTime.setHours(21, 0, 0, 0);

  const threeDaysLater = new Date(currentDate);
  threeDaysLater.setDate(currentDate.getDate() + 3);

  const intervalMinutes = 60; // You can adjust this to your desired time slot interval

  let currentTime = new Date(todayStartTime);

  while (currentTime <= todayEndTime) {
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

    const afterThirdDay = activeDay > threeDaysLater;
    const timesBeforeCurrentTime =
      activeDay.getDate() === currentDate.getDate() &&
      currentDate.getHours() >= new Date(currentTime).getHours();
    const timesInThirdDay = currentTime > threeDaysLater;
    const status =
      timesBeforeCurrentTime || timesInThirdDay || afterThirdDay // false for all the days after third day
        ? false
        : true;

    timeSlots.push({
      date: formattedDate,
      time: formattedTime,
      status: status,
    });

    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }

  return timeSlots;
}
