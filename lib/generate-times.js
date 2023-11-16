// import { GenerateTimeSlots } from "@/lib/generate-times";
import { fetchTakenTimesFromMongo } from "./takenTimes/fetchTakenTimesFromMongo";

export async function fetchTimeSlots(newDate, newCourt) {
  try {
    // generate all the times
    const generatedTimes = await GenerateTimeSlots(newDate, newCourt);
    // fetch the taken times
    const takenTimes = await fetchTakenTimesFromMongo();
    // check if there are taken times and give them false status
    if (takenTimes && takenTimes.data.length > 0) {
      const updatedGeneratedTimes = generatedTimes.map((timeSlot) => {
        const isTaken = takenTimes.data.some(
          (takenTime) =>
            takenTime.date === timeSlot.date &&
            takenTime.time === timeSlot.time &&
            takenTime.courtType === timeSlot.courtType
        );

        return {
          ...timeSlot,
          status: isTaken ? "RESERVED" : timeSlot.status,
        };
      });
      return updatedGeneratedTimes;
    } else {
      return generatedTimes;
    }
  } catch (error) {
    console.error(error.message || "Error here!");
  }
}

async function GenerateTimeSlots(newDate, newCourt) {
  const setNewDate = new Date(newDate);

  const timeSlots = [];
  // Get the current time
  const currentDate = new Date();

  // Set the start time to 9:00 AM on the selected date
  const todayStartTime = new Date(setNewDate);
  todayStartTime.setHours(8, 0, 0, 0);

  // Set the end time to 9:00 PM on the same date
  const todayEndTime = new Date(setNewDate);
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
    const day = setNewDate.getDate().toString().padStart(2, "0");
    const month = setNewDate.getMonth() + 1;
    const year = setNewDate.getFullYear();

    formattedDate = `${year}-${month}-${day}`;

    let status = "";

    if (setNewDate > threeDaysLater || currentTime > threeDaysLater) {
      status = "NOT OPENED";
    } else if (
      setNewDate.getDate() === currentDate.getDate() &&
      currentDate.getHours() >= new Date(currentTime).getHours()
    ) {
      status = "PASSED TIME";
    } else {
      status = "BOOK COURT";
    }

    timeSlots.push({
      id: id,
      courtType: newCourt,
      date: formattedDate,
      time: formattedTime,
      status: status,
    });

    id++;

    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }
  return timeSlots;
}
