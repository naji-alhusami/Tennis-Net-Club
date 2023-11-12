"use client";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import AuthContext from "@/store/auth-context";
import BookingCalendar from "./booking-calendar";
import { RightArrow } from "../icons/right-arrow";
import clay from "@/public/images/clay.jpg";
import hard from "@/public/images/hard.jpg";
import classes from "./booking-date-step.js.module.css";

function DateSelectionStep() {
  const [selectedCourtType, setSelectedCourtType] = useState("");
  const { activeDay, nextStepHandler, numberOfPlayers, setNumberOfPlayers } =
    useContext(AuthContext);

  // Set the date: "2023-11-05"
  let formattedDate = null;
  if (activeDay) {
    const day = activeDay.getDate().toString().padStart(2, "0"); // Output: "05" or "09"
    const month = activeDay.getMonth() + 1;
    const year = activeDay.getFullYear();
    console.log(day);
    formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate); // Output: "2023-11-05"
  }

  // Animation for header:
  const headerRef = useRef(null);
  const isInViewHeader = useInView(headerRef, { once: true });
  const headerControls = useAnimation();
  useEffect(() => {
    if (isInViewHeader) headerControls.start("visible");
  }, [isInViewHeader, headerControls]);

  // Animation for select players number and court type:
  const selectRef = useRef(null);
  const isInViewSelesction = useInView(selectRef, { once: true });
  const selectionControls = useAnimation();
  useEffect(() => {
    if (isInViewSelesction) selectionControls.start("visible");
  }, [isInViewSelesction, selectionControls]);

  // Animation for image:
  const imageRef = useRef(null);
  const isInViewImage = useInView(imageRef, { once: true });
  const imageControls = useAnimation();
  useEffect(() => {
    if (isInViewImage) imageControls.start("visible");
  }, [isInViewImage, imageControls]);

  // Animation for calendar:
  const calendarRef = useRef(null);
  const isInViewCalendar = useInView(calendarRef, {
    once: true,
  });
  const calendarControls = useAnimation();
  useEffect(() => {
    if (isInViewCalendar) calendarControls.start("visible");
  }, [isInViewCalendar, calendarControls]);

  // Header styling:
  const headerStyle = { textAlign: "center", fontSize: "2rem" };
  const hrStyle = {
    border: "1px solid #1c7f47",
    width: "6rem",
  };

  // Link for the next step:
  const nextPath = `/booking/?date=${formattedDate}&court=${selectedCourtType}&players=${numberOfPlayers}`;

  return (
    <Fragment>
      <div className={classes.firstStepContainer}>
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
          Choose Court Type, Players Number and Date
          <hr style={hrStyle} />
        </motion.h2>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={selectionControls}
          transition={{ duration: 0.3, delay: 0.4 }}
          ref={selectRef}
          className={classes.playersAndCourtContainer}
        >
          <select
            value={selectedCourtType}
            onChange={(e) => setSelectedCourtType(e.target.value)}
            required
          >
            <option value="">--- Select Court Type ---</option>
            <option value="Clay">Clay Court</option>
            <option value="Hard">Hard Court</option>
          </select>
          <select
            value={numberOfPlayers}
            onChange={(e) => setNumberOfPlayers(e.target.value)}
            required
          >
            <option value="">--- Select Players Number ---</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </motion.div>
        <div className={classes.dateContainer}>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -75 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={imageControls}
            transition={{ duration: 0.3, delay: 0.4 }}
            ref={imageRef}
          >
            {selectedCourtType === "Clay" ? (
              <Image src={clay} alt="clay-court" priority={true} />
            ) : (
              <Image
                src={hard}
                alt="hard-court"
                width={500}
                height={400}
                priority={true}
              />
            )}
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 75 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={calendarControls}
            transition={{ duration: 0.3, delay: 0.4 }}
            ref={calendarRef}
          >
            <BookingCalendar nextStepHandler={nextStepHandler} />
          </motion.div>
        </div>
        <div className={classes.buttonContainer}>
          {activeDay && selectedCourtType !== "" && numberOfPlayers !== "" ? (
            <Link
              href={nextPath}
              className={classes.nextButton}
              style={{ color: "white" }}
              onClick={() => nextStepHandler()}
            >
              Next <RightArrow />
            </Link>
          ) : (
            <div className={classes.nextButtonDisabled}>
              Next <RightArrow />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default DateSelectionStep;
