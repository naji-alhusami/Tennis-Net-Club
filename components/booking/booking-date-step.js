"use client";
import React, { Fragment, useState } from "react";

import Image from "next/image";
import clay from "@/public/images/clay.jpg";
import hard from "@/public/images/hard.jpg";

import BookingCalendar from "./booking-calendar";

import classes from "./booking-date-step.js.module.css";
import Link from "next/link";
import { RightArrow } from "../icons/right-arrow";

function DateSelectionStep({ nextStepHandler, activeDay }) {
  const [selectedCourtType, setSelectedCourtType] = useState("");
  const [selectedPlayersNumber, setSelectedPlayersNumber] = useState("");

  let formattedDate = null;
  if (activeDay) {
    const day = activeDay.getDate();
    const month = activeDay.getMonth() + 1;
    const year = activeDay.getFullYear();

    formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate); // Output: "2023-11-05"
  }

  async function handleNextStep() {
    nextStepHandler();
    // console.log(formattedDate, selectedCourtType);
    console.log("before fetch data from server");
    // const naji = await fetchData(activeDay, selectedCourtType);
    // console.log(naji);
  }

  return (
    <Fragment>
      <div className={classes.firstStepContainer}>
        <div className={classes.playersAndCourtContainer}>
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
