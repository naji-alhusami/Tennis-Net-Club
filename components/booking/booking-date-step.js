"use client";
import React, { Fragment, useContext, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AiFillCaretDown } from "react-icons/ai";
import Image from "next/image";

import BookingCalendar from "./booking-calendar";
import AuthContext from "@/store/auth-context";

import classes from "./booking-date-step.js.module.css";
import Link from "next/link";
import BookingContainer from "./booking-container";
import BookingSteps from "./booking-steps";

function DateSelectionStep({
  handleChangeCourts,
  selectedCourtType,

  isShowCourts,
  setIsShowCourts,
}) {
  const router = useRouter();
  // const path = usePathname();
  const searchParams = useSearchParams();
  const path = searchParams.has("date");
  // for (const value of searchParams.values()) {
  //   console.log(value);
  // }
  // console.log(search.forEach());
  const {
    activeDay,
    numberOfPlayers,
    setNumberOfPlayers,
    nextButton,
    nextStepHandler,
    currentStep,
  } = useContext(AuthContext);
  // console.log(activeDay);
  console.log(path, currentStep);
  // console.log(path);

  let formattedDate = null;
  if (activeDay) {
    const month = activeDay.toLocaleString("en-US", { month: "short" });
    const day = activeDay.getDate();
    const year = activeDay.getFullYear();

    formattedDate = `${month}-${day}-${year}`;

    console.log(formattedDate); // Output: "Oct-05-2023"
  }

  const courtTypeImages = {
    "Clay Courts": "/images/clay.jpg",
    "Hard Courts": "/images/hard.jpg",
  };

  const handleShowCourts = () => {
    setIsShowCourts(!isShowCourts);
  };

  const decreasePlayers = () => {
    if (numberOfPlayers > 1) {
      setNumberOfPlayers(numberOfPlayers - 1);
    }
  };

  const increasePlayers = () => {
    if (numberOfPlayers < 4) {
      setNumberOfPlayers(numberOfPlayers + 1);
    }
  };

  function dateSelectionHandler() {
    // console.log("clicked");
    // console.log(activeDay);
    // console.log(router.route);
    // const encodedDay = encodeURIComponent(activeDay);
    nextStepHandler();
    // router.push(`/booking/?date=${formattedDate}`);
  }

  return (
    <Fragment>
      <div>
        {/* <div className={classes.bookingPlayers}>
          <Image
            src={courtTypeImages[selectedCourtType]}
            alt={selectedCourtType}
            style={{ filter: "brightness(0.7)" }}
            width={400}
            height={300}
            priority={true}
          />
          <div className={classes.courtsContainer}>
            <h3>Courts:</h3>
            <AiFillCaretDown
              onClick={handleShowCourts}
              style={{ marginTop: "1rem" }}
            />
            <div>
              {isShowCourts && (
                <ul>
                  <li onClick={handleChangeCourts}>Clay Courts</li>
                  <li onClick={handleChangeCourts}>Hard Courts</li>
                </ul>
              )}
            </div>
          </div>
          <div className={classes.playersContainer}>
            <h3>Players:</h3>
            <span>{numberOfPlayers}</span>
            <button onClick={increasePlayers}>+</button>
            <button onClick={decreasePlayers}>-</button>
          </div>
        </div> */}
        <BookingCalendar nextStepHandler={nextStepHandler} />
      </div>

      <div>
        <Link
          href={`/booking/?date=${formattedDate}`}
          onClick={() => nextStepHandler()}
        >
          NEXT
        </Link>
        {/* <button
              // href={{ pathname: "/booking/[date]", query: { date: formattedDate } }}
              // onClick={() => nextStepHandler()}
              onClick={dateSelectionHandler}
            >
              Next
            </button> */}
      </div>
    </Fragment>
  );
}
export default DateSelectionStep;
