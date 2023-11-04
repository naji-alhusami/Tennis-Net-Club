import React, { useContext } from "react";
import BookingCalendar from "../booking/booking-calendar";
import AuthContext from "@/store/auth-context";
import classes from "./training.module.css";
import { trainingRegisteration } from "@/actions/trainingActions";
import { sendEventsToMongo } from "@/lib/events/sendEventsToMongo";

function TrainingForm() {
  const { activeDay } = useContext(AuthContext);
  console.log(activeDay);

  let startedDate = null;
  if (activeDay) {
    const day = activeDay.getDate().toString().padStart(2, "0"); // Output: "05" or "09"
    const month = activeDay.getMonth() + 1;
    const year = activeDay.getFullYear();
    console.log(day);
    startedDate = `${year}-${month}-${day}`;

    console.log(startedDate); // Output: "2023-11-05"
  }

  async function trainingSubmitHandler(event) {
    event.preventDefault();
    console.log(startedDate);

    try {
      await sendEventsToMongo(member, startedDate);
    } catch (error) {
      console.log("Error", error.message);
    }
  }

  return (
    <div>
      <form onSubmit={trainingSubmitHandler}>
        <h1>Choose Your Starting Date</h1>

        <BookingCalendar />
        <button className={classes.confirmButton} type="submit">Confirm</button>
      </form>
    </div>
  );
}

export default TrainingForm;
