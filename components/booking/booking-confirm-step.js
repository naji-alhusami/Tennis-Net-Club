"use client";
import React from "react";
import Image from "next/image";
// import { motion } from "framer-motion";

// import AuthContext from "@/store/auth-context";
import clay from "@/public/images/clay.jpg";
import hard from "@/public/images/hard.jpg";
import classes from "./booking-confirm-step.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { sendTakenTimesToMongo } from "@/lib/takenTimes/sendTakenTimesToMongo";
import { sendEventsToMongo } from "@/lib/events/sendEventsToMongo";

function ConfirmationStep({ searchParams, user, events }) {
  const router = useRouter();
  // const pathData = useSearchParams();
  // console.log(session?.user.name);

  async function bookingConfirmationHandler(event) {
    event.preventDefault();

    const member = user.name;
    const selectedCourtType = searchParams.court;
    const selectedPlayersNumber = searchParams.players;
    const selectedDate = searchParams.date;
    const selectedTime = searchParams.time;

    const [hours, minutes] = selectedTime.split(":");
    const year = new Date(selectedDate).getFullYear();
    const month = new Date(selectedDate).getMonth();
    const day = new Date(selectedDate).getDate();
    const startedTime = new Date(year, month, day, hours, minutes);

    try {
      await sendTakenTimesToMongo(
        member,
        selectedCourtType,
        selectedPlayersNumber,
        selectedDate,
        selectedTime,
        startedTime
      );
    } catch (error) {
      console.log("Error", error.message);
    }
    console.log("before fetching events in confirm booking");

    const reservationEvent = events.data.some((event) => {
      return event.title === "Court Reservation" && event.date === selectedDate;
    });

    if (!reservationEvent) {
      // try {
      await sendEventsToMongo(member, selectedDate);
      // } catch (error) {
      // console.log("Error", error.message);
      // }
    } else {
      console.log("there is existing event with the same name");
    }

    router.push("/");
  }

  const prevPath = `/booking?date=${searchParams.date}&court=${searchParams.court}&players=${searchParams.players}`;

  return (
    <form
      onSubmit={bookingConfirmationHandler}
      className={classes.confirmContainer}
    >
      <div className={classes.bookingDetailsContainer}>
        {searchParams.court === "Clay" ? (
          <Image src={clay} alt="clay-court" priority={true} />
        ) : (
          <Image src={hard} alt="hard-court" priority={true} />
        )}
      </div>
      <div className={classes.bookingDetails}>
        <table className={classes.tableContainer}>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Court</th>
              <th>Players</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
            <tr>
              <td>{user.name}</td>
              <td>{searchParams.court}</td>
              <td>{searchParams.players}</td>
              <td>{searchParams.date}</td>
              <td>{searchParams.time}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={classes.buttonContainer}>
        <Link
          href={prevPath}
          onClick={() => prevStepHandler()}
          className={classes.backButton}
        >
          <BsArrowLeft style={{ marginRight: "1rem" }} /> Back
        </Link>
        <button className={classes.confirmButton} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default ConfirmationStep;
