"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import classes from "./booking.module.css";
import BookingDate from "./bookingDate";
import { useSession } from "next-auth/react";
import Headers from "../ui/headers";

function Booking() {
  const { data: session } = useSession();

  return (
    <div className={classes.bookingContainer}>
      <div className={classes.boxContainer}>
        <div className={classes.text}>
          <Headers
            H3Header="Choose Your Time"
            H1Header="BOOKING"
            H2Header="Best Courts"
            PHeader="Welcome to TENNIS NET club, home to certified coaches dedicated to
         enhancing your tennis skills."
          />
        </div>
        <div className={classes.dateAndReserveContainer}>
          <BookingDate />
          {session ? (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link className={classes.reserveButton} href="/booking">
                Reserve Court
              </Link>
            </motion.div>
          ) : (
            <div className={classes.reserveButtonDisabled}>Reserve Court</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;
