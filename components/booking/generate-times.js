export function generateTimeSlots(activeDay, courtType) {
  const timeSlots = [];

  // Get the current time
  const currentDate = new Date();

  // Set the start time to 9:00 AM on the selected date
  const todayStartTime = new Date(activeDay);
  todayStartTime.setHours(8, 0, 0, 0);

  // Set the end time to 9:00 PM on the same date
  const todayEndTime = new Date(activeDay);
  todayEndTime.setHours(21, 0, 0, 0);

  const threeDaysLater = new Date(currentDate);
  threeDaysLater.setDate(currentDate.getDate() + 3);

  const intervalMinutes = 60; // adjust this time slot interval

  let currentTime = new Date(todayStartTime);
  let id = 0;

  while (currentTime <= todayEndTime) {
    const formattedTime = new Date(currentTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    let formattedDate = "";
    // const month = activeDay.toLocaleString("en-US", { month: "short" });
    const day = activeDay.getDate();
    const month = activeDay.getMonth() + 1;
    const year = activeDay.getFullYear();

    formattedDate = `${year}-${month}-${day}`;

    let status = "";

    if (activeDay > threeDaysLater || currentTime > threeDaysLater) {
      status = "NOT OPENED";
    } else if (
      activeDay.getDate() === currentDate.getDate() &&
      currentDate.getHours() >= new Date(currentTime).getHours()
    ) {
      status = "PASSED TIME";
    } else {
      status = "BOOK COURT";
    }

    timeSlots.push({
      id: id,
      courtType: courtType,
      date: formattedDate,
      time: formattedTime,
      status: status,
    });

    id++;

    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }

  return timeSlots;
}
