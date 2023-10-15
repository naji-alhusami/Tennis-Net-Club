"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";

import AuthContext from "@/store/auth-context";
import { useSearchParams } from "next/navigation";
import classes from "./booking-times-step.module.css";
import { generateTimeSlots } from "./generate-times";
import { fetchTakenTimesFromMongo } from "@/lib/fetchTakenTimes";
import BookingContainer from "./booking-container";
import BookingSteps from "./booking-steps";
import Link from "next/link";
import { RightArrow } from "../icons/right-arrow";

function TimeSelectionStep(props) {
  const {
    setTimeInfo,
    isLoadingTimes,
    setIsLoadingTimes,
    activeDay,
    timeSlots,
    setTimeSlots,
    cuurrentStep,
    timeInfo,
    nextStepHandler,
  } = useContext(AuthContext);

  // console.log(activeDay);
  const router = useSearchParams();
  // console.log(router.get("date"));
  const date = new Date(router.get("date"));
  // console.log(date);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoadingTimes(true);
        console.log(date);

        // generate all the times
        const generatedTimes = await generateTimeSlots(date);
        // console.log(generatedTimes);
        // fetch the taken times
        // console.log("before fetching taken times");
        const takenTimes = await fetchTakenTimesFromMongo();
        // console.log(takenTimes);
        // check if there are taken times and give them false status
        if (takenTimes && takenTimes.data.length > 0) {
          console.log("inside taken times");
          const updatedGeneratedTimes = generatedTimes.map((timeSlot) => {
            const isTaken = takenTimes.data.some(
              (takenTime) =>
                takenTime.date === timeSlot.date &&
                takenTime.time === timeSlot.time
            );
            return {
              ...timeSlot,
              status: isTaken ? "RESERVED" : timeSlot.status, // Set status to false if taken, true otherwise
            };
          });
          console.log(updatedGeneratedTimes);
          setTimeSlots(updatedGeneratedTimes);
        } else {
          // console.log("without takentimes");
          setTimeSlots(generatedTimes);
        }

        setIsLoadingTimes(false);
      } catch (error) {
        console.error(error.message || "Error here!");
        setIsLoadingTimes(false);
      }
    }

    fetchData();
  }, [activeDay]);

  const [selectedTime, setSelectedTime] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  function timeHandler(time) {
    // console.log(time);
    if (time.status === "BOOK COURT") {
      setSelectedTime(time);
      setTimeInfo(time);
    }
    // props.nextStepHandler();
  }

  function handleMouseEnter(timeSlot) {
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.id === timeSlot.id && slot.status === "BOOK COURT") {
        return { ...slot, isHovered: true };
      }
      return slot;
    });

    setTimeSlots(updatedTimeSlots);
    console.log(timeSlots);
  }

  function handleMouseLeave(timeSlot) {
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.id === timeSlot.id && slot.status === "BOOK COURT") {
        return { ...slot, isHovered: false };
      }
      return slot;
    });

    setTimeSlots(updatedTimeSlots);
  }

  function renderTimeSlotElement(timeSlot) {
    if (timeSlot.status === "PASSED TIME") {
      return <p className={classes.booked}>PASSED TIME</p>;
    } else if (timeSlot.status === "RESERVED") {
      return <p className={classes.booked}>RESERVED</p>;
    } else if (timeSlot.status === "NOT OPENED") {
      return <p className={classes.booked}>NOT OPENED</p>;
    } else if (timeSlot.status === "BOOK COURT") {
      return (
        <p
          className={
            timeSlot.isHovered ? classes.book : classes.selectedHovered
          }
          onMouseEnter={() => handleMouseEnter(timeSlot)}
          onMouseLeave={() => handleMouseLeave(timeSlot)}
          onClick={() => timeHandler(timeSlot)}
        >
          {timeSlot.isHovered ? "SELECT TIME" : "BOOK COURT"}
        </p>
      );
    } else {
      return null;
    }
  }

  return (
    <Fragment>
      <div className={classes.timeContainer}>
        <h1>Choose Your Preferred Time:</h1>
        <hr />
        {isLoadingTimes ? (
          <p>Loading Times...</p>
        ) : (
          <div className={classes.timeSlotsContainer}>
            {timeSlots.map((timeSlot) => {
              return (
                <div key={timeSlot.id} className={classes.timeSlot}>
                  <p className={classes.time}>{timeSlot.time}</p>
                  {renderTimeSlotElement(timeSlot)}
                </div>
              );
            })}
          </div>
        )}
        <div className={classes.buttonContainer}>
          {timeInfo ? (
            <Link
              href={`/booking/?date=${router.get("date")}&time=${
                timeInfo.time
              }`}
              onClick={() => nextStepHandler()}
              className={classes.nextButton}
              style={{ color: "white" }}
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

export default TimeSelectionStep;
