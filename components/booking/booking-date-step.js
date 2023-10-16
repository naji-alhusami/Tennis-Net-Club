"use client";
import React, { Fragment, useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AiFillCaretDown } from "react-icons/ai";
import Image from "next/image";
import { motion } from "framer-motion";
import clay from "@/public/images/clay.jpg";
import hard from "@/public/images/hard.jpg";

import BookingCalendar from "./booking-calendar";
import AuthContext from "@/store/auth-context";

import classes from "./booking-date-step.js.module.css";
import Link from "next/link";
import { RightArrow } from "../icons/right-arrow";

function DateSelectionStep() {
  const searchParams = useSearchParams();
  const path = searchParams.has("date");

  const { activeDay, nextStepHandler, currentStep, timeInfo, setTimeInfo } =
    useContext(AuthContext);
  console.log(path, currentStep);

  let formattedDate = null;
  if (activeDay) {
    const month = activeDay.toLocaleString("en-US", { month: "short" });
    const day = activeDay.getDate();
    const year = activeDay.getFullYear();

    formattedDate = `${month}-${day}-${year}`;

    console.log(formattedDate); // Output: "Oct-05-2023"
  }

  const [selectedCourtType, setSelectedCourtType] = useState("");
  const [selectedPlayersNumber, setSelectedPlayersNumber] = useState("");

  function handleNextStep() {
    setTimeInfo({
      ...timeInfo,
      formattedDate,
      selectedCourtType,
      selectedPlayersNumber,
    });
    nextStepHandler();
  }

  return (
    <Fragment>
      <div className={classes.firstStepContainer}>
        <div className={classes.playersAndCourtContainer}>
          <div>
            <h1>Choose Court & Players:</h1>
          </div>
          <div className={classes.playersAndCourt}>
            <select
              value={selectedCourtType}
              onChange={(e) => setSelectedCourtType(e.target.value)}
            >
              <option>--- Select Court Type ---</option>
              <option value="Clay Court">Clay Court</option>
              <option value="Hard Court">Hard Court</option>
            </select>
            <select
              value={selectedPlayersNumber}
              onChange={(e) => setSelectedPlayersNumber(e.target.value)}
            >
              <option>--- Select Players Number ---</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        <div className={classes.dateContainer}>
          {selectedCourtType === "Clay Court" ? (
            <Image src={clay} alt={selectedCourtType} priority={true} />
          ) : (
            <Image
              src={hard}
              alt={selectedCourtType}
              width={500}
              height={400}
              priority={true}
            />
          )}

          <div>
            <BookingCalendar nextStepHandler={nextStepHandler} />
          </div>
        </div>
        <div className={classes.buttonContainer}>
          {activeDay ? (
            <Link
              href={`/booking/?date=${formattedDate}`}
              className={classes.nextButton}
              style={{ color: "white" }}
              onClick={handleNextStep}
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
