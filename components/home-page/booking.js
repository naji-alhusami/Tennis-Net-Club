"use client";
import React, { useContext, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import classes from "./booking.module.css";
import BookingDate from "./bookingDate";
import { useSession } from "next-auth/react";
import Headers from "../ui/headers";
import Numbers from "./numbers";
import AuthContext from "@/store/auth-context";

function Booking() {
  const { numberOfPlayers, setNumberOfPlayers } = useContext(AuthContext);
  const { data: session } = useSession();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

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

  return (
    <div className={classes.bookingContainer}>
      <motion.div
        className={classes.text}
        ref={ref}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Headers
          H3Header="Choose Your Time"
          H1Header="BOOKING"
          H2Header="Best Courts"
          PHeader="Welcome to TENNIS NET club, home to certified coaches dedicated to
         enhancing your tennis skills."
        />
        <Numbers />
      </motion.div>
      <motion.div
        className={classes.boxContainer}
        ref={ref}
        variants={{
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className={classes.dateAndReserveContainer}>
          <BookingDate />
          <h3>Players:</h3>
          <div className={classes.players}>
            <button onClick={decreasePlayers}>-</button>
            <span>{numberOfPlayers}</span>
            <button onClick={increasePlayers}>+</button>
          </div>
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
      </motion.div>
    </div>
  );
}

export default Booking;
