"use client";
import React from "react";
import BookingCalendar from "../reservation/reservation-page/reservation-calendar";
import classes from "./training.module.css";
import { sendEventsToMongo } from "@/lib/events/sendEventsToMongo";
import { useSession } from "next-auth/react";
import SubmitButton from "../ui/submit-button";
import { useRouter } from "next/navigation";

function TrainingForm({ activeDay, selectedTrainingType }) {
  const session = useSession();
  const member = session?.data.user.name;
  const router = useRouter();

  let startedDate = null;
  let endedDate = null;
  let daysOfWeek = [];
  if (activeDay) {
    //set the started Date:
    const day = activeDay.getDate().toString().padStart(2, "0"); // Output: "05" or "09"
    const month = activeDay.getMonth() + 1;
    const year = activeDay.getFullYear();
    startedDate = `${year}-${month}-${day}`;

    //set the ended Date:
    const startDate = new Date(startedDate);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);
    endedDate = endDate.toISOString().slice(0, 10);

    //set the days of week:
    if (
      (activeDay.getDay() === 0 ||
        activeDay.getDay() === 2 ||
        activeDay.getDay() === 4) &&
      (selectedTrainingType === "1" || selectedTrainingType === "3")
    ) {
      daysOfWeek = [0, 2, 4];
    } else if (
      (activeDay.getDay() === 1 ||
        activeDay.getDay() === 3 ||
        activeDay.getDay() === 5) &&
      (selectedTrainingType === "1" || selectedTrainingType === "3")
    ) {
      daysOfWeek = [1, 3, 5];
    } else if (activeDay.getDay() === 6 && selectedTrainingType === "2") {
      daysOfWeek = [6];
    }
  }

  async function trainingSubmitHandler(event) {
    event.preventDefault();

    try {
      await sendEventsToMongo(member, startedDate, endedDate, daysOfWeek);
    } catch (error) {
      return;
    }

    router.push(
      "/thanks?thanks=Your Training Session Is Added, Please Check Your Calendar"
    );
  }

  return (
    <div>
      <form onSubmit={trainingSubmitHandler}>
        <h1>Choose Your Starting Date</h1>
        {selectedTrainingType === "2" ? (
          <h4 style={{ color: "red" }}>
            (You Should Select Sataurday for Individual Sessions)
          </h4>
        ) : (
          <h4 style={{ color: "red" }}>
            (You Can Select Any Day EXCEPT Sataurday)
          </h4>
        )}
        <BookingCalendar />
        {daysOfWeek.length > 1 &&
        (activeDay.getDay() === 0 ||
          activeDay.getDay() === 1 ||
          activeDay.getDay() === 2 ||
          activeDay.getDay() === 3 ||
          activeDay.getDay() === 4 ||
          activeDay.getDay() === 5) ? (
          <SubmitButton type="submit" className={classes.confirmButton}>
            Confirm
          </SubmitButton>
        ) : daysOfWeek.length === 1 && activeDay.getDay() === 6 ? (
          <SubmitButton type="submit" className={classes.confirmButton}>
            Confirm
          </SubmitButton>
        ) : (
          <p className={classes.confirmtButtonDisabled}>Confirm</p>
        )}
      </form>
    </div>
  );
}

export default TrainingForm;
