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

  const { activeDay, nextStepHandler, currentStep } = useContext(AuthContext);
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

  async function handleNextStep() {
    // const formattedActiveDay = activeDay.toISOString();
    // console.log(formattedActiveDay);
    // try {
    //   const response = await fetch("/api/insertTakenTimes", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       selectedCourtType,
    //       selectedPlayersNumber,
    //       activeDay: activeDay,
    //     }),
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     console.log(data);
    //   }
    // } catch (error) {
    //   console.log("Error", error.message);
    // }
    nextStepHandler();
  }

  return (
    <Fragment>
      <div className={classes.firstStepContainer}>
        <div className={classes.playersAndCourtContainer}>
          {/* <div>
            <h1>Reserve Court:</h1>
          </div> */}
          {/* <div className={classes.playersAndCourt}> */}
            <select
              value={selectedCourtType}
              // value="court-type"
              onChange={(e) => setSelectedCourtType(e.target.value)}
              required
            >
              <option value="">--- Select Court Type ---</option>
              <option value="Clay">Clay Court</option>
              <option value="Hard">Hard Court</option>
            </select>
            <select
              value={selectedPlayersNumber}
              onChange={(e) => setSelectedPlayersNumber(e.target.value)}
              required
            >
              <option value="">--- Select Players Number ---</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          {/* </div> */}
        </div>
        <div className={classes.dateContainer}>
          {selectedCourtType === "Clay" ? (
            <Image src={clay} alt="clay-court" priority={true} />
          ) : (
            <Image
              src={hard}
              // alt={selectedCourtType}
              alt="hard-court"
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
          {activeDay &&
          selectedCourtType !== "" &&
          selectedPlayersNumber !== "" ? (
            <Link
              href={`/booking/?date=${formattedDate}&court=${selectedCourtType}&players=${selectedPlayersNumber}`}
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
