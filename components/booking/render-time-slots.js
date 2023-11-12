"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import classes from "./booking-times-step.module.css";

function TimeSlots({
  timeSlots,
  newTimeSlots,
  setNewTimeSlots,
  setSelectedTime,
}) {
  const [hoveredTimeSlot, setHoveredTimeSlot] = useState(null);

  function handleMouseEnter(timeSlot) {
    setHoveredTimeSlot(timeSlot);
  }

  function handleMouseLeave() {
    setHoveredTimeSlot(null);
  }

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
          // onClick={() => console.log("clicked")}
        >
          {buttonText}
        </p>
      );
    }
  }

  const TimeSlotDiv = ({ timeSlot }) => {
    const timesControls = useAnimation();
    const [timesRef, isInViewTimes] = useInView();

    useEffect(() => {
      if (isInViewTimes) {
        timesControls.start("visible");
      }
    }, [isInViewTimes, timesControls]);

    return (
      <motion.div
        ref={timesRef}
        initial="hidden"
        animate={timesControls}
        transition={{ duration: 1 }}
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0 },
        }}
        className={classes.timeSlot}
      >
        <h1 className={classes.time}>{timeSlot.time}</h1>
        <p>{timeSlot.courtType} Court</p>
        {renderTimeSlotElement(timeSlot)}
      </motion.div>
    );
  };

  return (
    <div className={classes.timeSlotsContainer}>
      {newTimeSlots.map((timeSlot) => {
        return <TimeSlotDiv key={timeSlot.id} timeSlot={timeSlot} />;
      })}
    </div>
  );
}

export default TimeSlots;
