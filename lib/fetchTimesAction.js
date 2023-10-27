import { generateTimeSlots } from "@/components/booking/generate-times";
import { fetchTakenTimesFromMongo } from "./takenTimes/fetchTakenTimesFromMongo";

export async function fetchData(date) {
    console.log(date, "inside fetchdata action");

  try {
    // setIsLoadingTimes(true);

    // generate all the times
    const generatedTimes = await generateTimeSlots(date);
    console.log(generatedTimes);
    // fetch the taken times
    // console.log("before takentimes fetching");
    const takenTimes = await fetchTakenTimesFromMongo();
    // console.log(takenTimes);
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
      console.log(updatedGeneratedTimes);
      //   console.log("with takentimes");
      return updatedGeneratedTimes;
      //   setTimeSlots(updatedGeneratedTimes);
    } else {
      //   console.log("without takentimes");
      return generatedTimes;
      //   setTimeSlots(generatedTimes);
    }

    // setIsLoadingTimes(false);
  } catch (error) {
    console.error(error.message || "Error here!");
    // setIsLoadingTimes(false);
  }
}
