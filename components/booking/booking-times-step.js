"use client";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AuthContext from "@/store/auth-context";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";

import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import classes from "./booking-times-step.module.css";
import RenderBookingButton from "./render-booking-button";

function TimeSelectionStep({ user, searchParams, timeSlots, takenTimes }) {
  const { prevStepHandler, nextStepHandler } = useContext(AuthContext);

  const [newTimeSlots, setNewTimeSlots] = useState(timeSlots);
  const [selectedTime, setSelectedTime] = useState("");

  // Animtion
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) mainControls.start("visible");
  }, [isInView, mainControls]);

  // Check if the member has an existing reservation for the selected day
  const dayFromLink = searchParams.date;
  const memberTakenTimes = takenTimes.filter(
    (reservation) => reservation.member === user.name
  );

  const hasReservationForDay = memberTakenTimes.some(
    (reservation) => reservation.date === dayFromLink
  );

  // Styling for header:
  const headerStyle = { textAlign: "center", fontSize: "2rem" };
  const hrStyle = {
    border: "1px solid #1c7f47",
    width: "6rem",
  };

  // Link for next page:
  const nextPath = `/booking/?date=${searchParams.date}&court=${searchParams.court}&players=${searchParams.players}&time=${selectedTime}`;

  return (
    <Fragment>
      <div className={classes.timeContainer}>
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: -75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.3, delay: 0.4 }}
          ref={ref}
          style={headerStyle}
        >
          Choose Available Time
          <hr style={hrStyle} />
        </motion.h2>
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
            <p>You Already have Time Reserved For This Day</p>
          ) : (
            newTimeSlots.map((timeSlot) => {
              return (
                <div key={timeSlot.id} className={classes.timeSlot}>
                  <h1 className={classes.time}>{timeSlot.time}</h1>
                  <p>{timeSlot.courtType} Court</p>
                  <RenderBookingButton
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
            href="/booking"
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
