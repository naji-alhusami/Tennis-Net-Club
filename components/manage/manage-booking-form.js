"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

import classes from "./manage-booking.module.css";
import SubmitButton from "../ui/submit-button";

const ManageBookingForm = ({
  filteredTakenTimes,
  cancelReservedTimeHandler,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: -75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.3, delay: 0.4 }}
      className={classes.manageContainer}
    >
      <>
        {filteredTakenTimes.map((timeSlot) => (
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
        ))}
      </>
    </motion.div>
  );
};

export default ManageBookingForm;
