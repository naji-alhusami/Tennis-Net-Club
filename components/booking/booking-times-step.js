"use client";
import React, { Fragment, useContext, useState } from "react";

import AuthContext from "@/store/auth-context";
import classes from "./booking-times-step.module.css";

import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

function TimeSelectionStep({ user, searchParams, timeSlots, takenTimes }) {
  const { prevStepHandler, nextStepHandler } = useContext(AuthContext);

  const [newTimeSlots, setNewTimeSlots] = useState(timeSlots);
  const [hoveredTimeSlot, setHoveredTimeSlot] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  // Check if the member has an existing reservation for the selected day
  const dayFromLink = searchParams.date;
  const memberTakenTimes = takenTimes.filter(
    (reservation) => reservation.member === user.name
  );

  const hasReservationForDay = memberTakenTimes.some(
    (reservation) => reservation.date === dayFromLink
  );
  // console.log(hasReservationForDay);

  function timeHandler(timeSlot) {
    if (timeSlot.status === "BOOK COURT") {
      // Find the currently selected time slot (if any)
      const currentlySelectedTimeSlot = timeSlots.find(
        (slot) => slot.status === "SELECTED"
      );

      // Update the selected time and change the status
      const timeSlotsStatus = timeSlots.map((slot) => {
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
      setNewTimeSlots(timeSlotsStatus);
      setSelectedTime(timeSlot.time);
      // setTimeInfo(timeSlot);
    }
  }

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

  const nextPath = `/booking/?date=${searchParams.date}&court=${searchParams.court}&players=${searchParams.players}&time=${selectedTime}`;

  return (
    <Fragment>
      <div className={classes.timeContainer}>
        <div className={classes.timeSlotsContainer}>
          {hasReservationForDay ? (
            <p>You Already have Time Reserved For This Day</p>
          ) : (
            newTimeSlots.map((timeSlot) => {
              return (
                <div key={timeSlot.id} className={classes.timeSlot}>
                  <h1 className={classes.time}>{timeSlot.time}</h1>
                  <p>{timeSlot.courtType} Court</p>
                  {renderTimeSlotElement(timeSlot)}
                </div>
              );
            })
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
