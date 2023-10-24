'use client'
import React, { useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Image from "next/image";

import classes from "./booking.module.css";
import bookCourt from "@/public/images/bookCourt.jpg";
import bg from "@/public/images/background1.jpg";
import BookingDate from "./bookingDate";
import { useSession } from "next-auth/react";
import AuthContext from "@/store/auth-context";
import Headers from "../ui/headers";

function Booking() {
  const { numberOfPlayers, setNumberOfPlayers } = useContext(AuthContext);
  const { data: session } = useSession();
  // console.log(session);
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
  const time = new Date();
  console.log(time);
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <Headers
          H3Header="Choose Your Time"
          H1Header="BOOKING"
          H2Header="Best Courts"
          PHeader="Welcome to TENNIS NET club, home to certified coaches dedicated to
          enhancing your tennis skills."
        />
        <div className={classes.bookingContainer}>
          <div className={classes.playersContainer}>
            <BookingDate />
            <h3>Players:</h3>
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
      </div>
      <div className={classes.imageWrapper}>
        <div className={classes.imageContainer}></div>
      </div>
    </div>
  );
}

export default Booking;
