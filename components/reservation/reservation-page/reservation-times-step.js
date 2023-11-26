"use client";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useAnimation, useInView } from "framer-motion";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

import AuthContext from "@/store/auth-context";
import RenderReservationButton from "./render-reservation-button";
import classes from "./reservation-times-step.module.css";

function TimeSelectionStep({ session, searchParams, timeSlots, takenTimes }) {
  const {
    activeDay,
    prevStepHandler,
    nextStepHandler,
    setCurrentStep,
    selectedTime,
    setSelectedTime,
  } = useContext(AuthContext);
  const [newTimeSlots, setNewTimeSlots] = useState(timeSlots);
  const router = useRouter();

  // Motion
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) mainControls.start("visible");
  }, [isInView, mainControls]);

  // test
  let formattedDate = null;
  if (activeDay) {
    const day = activeDay.getDate().toString().padStart(2, "0"); // Output: "05" or "09"
    const month = activeDay.getMonth() + 1;
    const year = activeDay.getFullYear();
    formattedDate = `${year}-${month}-${day}`; // Output: "2023-11-05"
  }
  // tests

  // Check if the member has an existing reservation for the selected day
  const dayFromLink = searchParams.date;

  const memberTakenTimes = takenTimes.filter(
    (reservation) => reservation.member === session?.user.name
  );

  const hasReservationForDay = memberTakenTimes.some(
    (reservation) => reservation.date === dayFromLink
  );

  // Link for next page:
  const nextPath = `/reservation/?date=${searchParams.date}&court=${searchParams.court}&players=${searchParams.players}&time=${selectedTime}`;

  return (
    <Fragment>
      <div className={classes.timeContainer}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.3, delay: 0.4 }}
          ref={ref}
          className={classes.timeSlotsContainer}
        >
          {hasReservationForDay ? (
            <h4 style={{ color: "red" }}>
              You Already have Time Reserved For This Day
            </h4>
          ) : (
            newTimeSlots.map((timeSlot) => {
              return (
                <div key={timeSlot.id} className={classes.timeSlot}>
                  <h1 className={classes.time}>{timeSlot.time}</h1>
                  <p>{timeSlot.courtType} Court</p>
                  <RenderReservationButton
                    timeSlot={timeSlot}
                    timeSlots={timeSlots}
                    setNewTimeSlots={setNewTimeSlots}
                    setSelectedTime={setSelectedTime}
                  />
                </div>
              );
            })
          )}
        </motion.div>
        <div className={classes.buttonContainer}>
          <Link
            href="/reservation"
            onClick={() => prevStepHandler()}
            className={classes.backButton}
          >
            <BsArrowLeft style={{ marginRight: "1rem" }} /> Back
          </Link>
          {selectedTime !== "" ? (
            <Link
              href={nextPath}
              onClick={() => nextStepHandler()}
              className={classes.nextButton}
              style={{ color: "white" }}
            >
              Next <BsArrowRight style={{ marginLeft: "1rem" }} />
            </Link>
          ) : (
            <div className={classes.nextButtonDisabled}>
              Next <BsArrowRight style={{ marginLeft: "1rem" }} />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default TimeSelectionStep;
