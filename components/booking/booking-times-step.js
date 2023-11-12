"use client";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import AuthContext from "@/store/auth-context";
import classes from "./booking-times-step.module.css";

import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { motion, useAnimation, useInView } from "framer-motion";
import TimeSlots from "./render-time-slots";

function TimeSelectionStep({ user, searchParams, timeSlots, takenTimes }) {
  const { prevStepHandler, nextStepHandler } = useContext(AuthContext);

  const [newTimeSlots, setNewTimeSlots] = useState(timeSlots);
  const [selectedTime, setSelectedTime] = useState("");

  const headerRef = useRef(null);
  const isInViewHeader = useInView(headerRef, { once: true });
  const headerControls = useAnimation();
  useEffect(() => {
    if (isInViewHeader) headerControls.start("visible");
  }, [isInViewHeader, headerControls]);

  // Check if the member has an existing reservation for the selected day
  const dayFromLink = searchParams.date;
  const memberTakenTimes = takenTimes.filter(
    (reservation) => reservation.member === user.name
  );

  const hasReservationForDay = memberTakenTimes.some(
    (reservation) => reservation.date === dayFromLink
  );
  // console.log(hasReservationForDay);

  const headerStyle = { textAlign: "center", fontSize: "2rem" };
  const hrStyle = {
    border: "1px solid #1c7f47",
    width: "6rem",
  };

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
          animate={headerControls}
          transition={{ duration: 0.3, delay: 0.4 }}
          ref={headerRef}
          style={headerStyle}
        >
          Choose Available Time
          <hr style={hrStyle} />
        </motion.h2>
        <div>
          {hasReservationForDay ? (
            <p>You Already have Time Reserved For This Day</p>
          ) : (
            <TimeSlots
              timeSlots={timeSlots}
              newTimeSlots={newTimeSlots}
              setNewTimeSlots={setNewTimeSlots}
              setSelectedTime={setSelectedTime}
            />
          )}
        </div>
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
          {/* <button onClick={()=>router.push('/booking')}>Click</button> */}
        </div>
      </div>
    </Fragment>
  );
}

export default TimeSelectionStep;
