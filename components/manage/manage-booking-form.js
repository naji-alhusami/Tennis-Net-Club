"use client";
import React from "react";
import { motion } from "framer-motion";

import classes from "./manage-booking.module.css";
import SubmitButton from "../ui/submit-button";

const ManageBookingForm = ({
  filteredTakenTimes,
  cancelReservedTimeHandler,
}) => {
  return (
    <div className={classes.manageContainer}>
      {filteredTakenTimes.map((timeSlot) => (
        <>
          <form
            key={timeSlot._id}
            className={classes.timeSlotsContainer}
            action={async () => {
              await cancelReservedTimeHandler(timeSlot);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              //   exit={{ opacity: 0, x: 50, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              className={classes.timeSlot}
            >
              <h1>{timeSlot.courtType} Court</h1>
              <div className={classes.timeAndDate}>
                <p className={classes.time}>{timeSlot.time}</p>
                <p>{timeSlot.date}</p>
              </div>
              <SubmitButton>CANCEL</SubmitButton>
            </motion.div>
          </form>
        </>
      ))}
    </div>
  );
};

export default ManageBookingForm;
