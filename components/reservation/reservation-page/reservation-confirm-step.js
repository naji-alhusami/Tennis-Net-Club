"use client";
import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAnimation, useInView } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";

import AuthContext from "@/store/auth-context";
import { sendTakenTimesToMongo } from "@/lib/takenTimes/sendTakenTimesToMongo";
import clay from "@/public/images/clay.jpg";
import hard from "@/public/images/hard.jpg";
import classes from "./reservation-confirm-step.module.css";

function ConfirmationStep({ searchParams, session }) {
  const { setCurrentStep } = useContext(AuthContext);
  const router = useRouter();

  async function bookingConfirmationHandler(event) {
    event.preventDefault();

    const member = session?.user.name;
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
      return;
    }

    setCurrentStep(1);
    router.push("/thanks?thanks=Your Court Is Reserved");
  }

  // Animation
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) mainControls.start("visible");
  }, [isInView, mainControls]);

  const prevPath = `/booking?date=${searchParams.date}&court=${searchParams.court}&players=${searchParams.players}`;

  return (
    <form
      onSubmit={bookingConfirmationHandler}
      className={classes.confirmContainer}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.3 }}
        ref={ref}
        className={classes.bookingDetailsContainer}
      >
        {searchParams.court === "Clay" ? (
          <Image src={clay} alt="clay-court" priority={true} />
        ) : (
          <Image src={hard} alt="hard-court" priority={true} />
        )}
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.3 }}
        ref={ref}
        className={classes.bookingDetails}
      >
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
              <td>{session?.user.name}</td>
              <td>{searchParams.court}</td>
              <td>{searchParams.players}</td>
              <td>{searchParams.date}</td>
              <td>{searchParams.time}</td>
            </tr>
          </tbody>
        </table>
      </motion.div>

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
