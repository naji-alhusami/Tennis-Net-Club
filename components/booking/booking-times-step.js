"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";

import AuthContext from "@/store/auth-context";
import { useSearchParams } from "next/navigation";
import classes from "./booking-times-step.module.css";
import { generateTimeSlots } from "./generate-times";
import { fetchTakenTimesFromMongo } from "@/lib/fetchTakenTimes";

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

  const router = useSearchParams();
  const date = new Date(router.get("date"));

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoadingTimes(true);

        // generate all the times
        const generatedTimes = await generateTimeSlots(date);
        // fetch the taken times
        const takenTimes = await fetchTakenTimesFromMongo();
        // check if there are taken times and give them false status
        if (takenTimes && takenTimes.data.length > 0) {
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
          setTimeSlots(updatedGeneratedTimes);
        } else {
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

  function timeHandler(timeSlot) {
    if (timeSlot.status === "BOOK COURT") {
      // Find the currently selected time slot (if any)
      const currentlySelectedTimeSlot = timeSlots.find(
        (slot) => slot.status === "SELECTED"
      );

      // Update the selected time and change the status
      const updatedTimeSlots = timeSlots.map((slot) => {
        if (slot.id === timeSlot.id) {
          return { ...slot, status: "SELECTED", isHovered: false };
        } else if (
          currentlySelectedTimeSlot &&
          slot.id === currentlySelectedTimeSlot.id
        ) {
          // Deselect the previously selected time slot
          return { ...slot, status: "BOOK COURT", isHovered: false };
        }
        return slot;
      });

      setTimeSlots(updatedTimeSlots);
      setTimeInfo(timeSlot);
    }
  }

  function handleMouseEnter(timeSlot) {
    const updatedTimeSlots = timeSlots.map((slot) => {
      if (slot.id === timeSlot.id && slot.status === "BOOK COURT") {
        return { ...slot, isHovered: true };
      }
      return slot;
    });

    setTimeSlots(updatedTimeSlots);
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
    } else if (
      timeSlot.status === "BOOK COURT" ||
      timeSlot.status === "SELECTED"
    ) {
      return (
        <p
          className={
            timeSlot.status === "SELECTED"
              ? classes.selected
              : timeSlot.isHovered
              ? classes.hovered
              : classes.book
          }
          onMouseEnter={() => handleMouseEnter(timeSlot)}
          onMouseLeave={() => handleMouseLeave(timeSlot)}
          onClick={() => timeHandler(timeSlot)}
        >
          {timeSlot.status === "SELECTED"
            ? "SELECTED"
            : timeSlot.isHovered
            ? "SELECT TIME"
            : "BOOK COURT"}
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
