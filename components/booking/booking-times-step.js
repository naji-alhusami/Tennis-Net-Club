"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";

import AuthContext from "@/store/auth-context";
import { useSearchParams, useRouter } from "next/navigation";
import classes from "./booking-times-step.module.css";
import { generateTimeSlots } from "./generate-times";
import { fetchTakenTimesFromMongo } from "@/lib/fetchTakenTimesFromMongo";

import Link from "next/link";
import { RightArrow } from "../icons/right-arrow";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

function TimeSelectionStep() {
  const {
    isLoadingTimes,
    setIsLoadingTimes,
    activeDay,
    timeSlots,
    setTimeSlots,
    prevStepHandler,
    nextStepHandler,
  } = useContext(AuthContext);

  const pathData = useSearchParams();

  const date = new Date(pathData.get("date"));
  const courtType = pathData.get("court");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoadingTimes(true);

        // generate all the times
        const generatedTimes = await generateTimeSlots(date, courtType);
        console.log(generatedTimes);
        // fetch the taken times
        const takenTimes = await fetchTakenTimesFromMongo();
        console.log(takenTimes);
        // check if there are taken times and give them false status
        if (takenTimes && takenTimes.data.length > 0) {
          const updatedGeneratedTimes = generatedTimes.map((timeSlot) => {
            const isTaken = takenTimes.data.some(
              (takenTime) =>
                takenTime.date === timeSlot.date &&
                takenTime.time === timeSlot.time &&
                takenTime.courtType === timeSlot.courtType
            );
            return {
              ...timeSlot,
              status: isTaken ? "RESERVED" : timeSlot.status,
            };
          });
          console.log(updatedGeneratedTimes);
          setTimeSlots(updatedGeneratedTimes);
          console.log("with takentimes");
        } else {
          console.log("without takentimes");
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

  const [hoveredTimeSlot, setHoveredTimeSlot] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  function timeHandler(timeSlot) {
    if (timeSlot.status === "BOOK COURT") {
      // Find the currently selected time slot (if any)
      const currentlySelectedTimeSlot = timeSlots.find(
        (slot) => slot.status === "SELECTED"
      );

      // Update the selected time and change the status
      const updatedTimeSlots = timeSlots.map((slot) => {
        if (slot.id === timeSlot.id) {
          return { ...slot, status: "SELECTED" };
        } else if (
          currentlySelectedTimeSlot &&
          slot.id === currentlySelectedTimeSlot.id
        ) {
          // Deselect the previously selected time slot
          return { ...slot, status: "BOOK COURT" };
        }
        return slot;
      });
      setTimeSlots(updatedTimeSlots);
      setSelectedTime(timeSlot.time);
      // setTimeInfo(timeSlot);
    }
  }
  console.log(timeSlots);

  function handleMouseEnter(timeSlot) {
    setHoveredTimeSlot(timeSlot);
  }

  function handleMouseLeave() {
    setHoveredTimeSlot(null);
  }

  function renderTimeSlotElement(timeSlot) {
    if (timeSlot.status === "PASSED TIME") {
      return <p className={classes.booked}>PASSED TIME</p>;
    } else if (timeSlot.status === "RESERVED") {
      return <p className={classes.booked}>RESERVED</p>;
    } else if (timeSlot.status === "NOT OPENED") {
      return <p className={classes.booked}>NOT OPENED</p>;
    } else {
      let buttonText;
      if (timeSlot.status === "SELECTED") {
        buttonText = "SELECTED";
      } else if (timeSlot === hoveredTimeSlot) {
        buttonText = "SELECT TIME";
      } else {
        buttonText = "BOOK COURT";
      }

      return (
        <p
          className={
            timeSlot.status === "SELECTED"
              ? classes.selected
              : timeSlot === hoveredTimeSlot
              ? classes.hovered
              : classes.book
          }
          onMouseEnter={() => handleMouseEnter(timeSlot)}
          onMouseLeave={handleMouseLeave}
          onClick={() => timeHandler(timeSlot)}
        >
          {buttonText}
        </p>
      );
    }
  }

  return (
    <Fragment>
      <div className={classes.timeContainer}>
        {/* <h1>Choose Your Preferred Time:</h1> */}
        {/* <hr /> */}
        {isLoadingTimes ? (
          <p>Loading Times...</p>
        ) : (
          <div className={classes.timeSlotsContainer}>
            {timeSlots.map((timeSlot) => {
              return (
                <div key={timeSlot.id} className={classes.timeSlot}>
                  <h1 className={classes.time}>{timeSlot.time}</h1>
                  <p>{timeSlot.courtType} Court</p>
                  {renderTimeSlotElement(timeSlot)}
                </div>
              );
            })}
          </div>
        )}
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
              href={`/booking/?date=${pathData.get(
                "date"
              )}&court=${pathData.get("court")}&players=${pathData.get(
                "players"
              )}&time=${selectedTime}`}
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
