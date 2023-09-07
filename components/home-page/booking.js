import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import Image from "next/image";

import classes from "./booking.module.css";
import bookCourt from "@/public/images/bookCourt.jpg";
import bg from "@/public/images/background1.jpg";
import BookingDate from "./bookingDate";
import { useSession } from "next-auth/react";

function Booking() {
  const { data: session, loading } = useSession();
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

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
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <div className={classes.leftSideContainer}>
          <Image src={bg} alt="cover-image" layout="fill" objectFit="cover" />
        </div>
        <div className={classes.textContainer}>
          <div className={classes.text}>
            <h4>Best Courts</h4>
            <h1>Reserve Your Court</h1>
            <p>
              Come and Reserve your courtCome and Reserve your courtCome and
              Reserve your courtCome and Reserve your court
            </p>
          </div>
          <div className={classes.bookingContainer}>
            <BookingDate />
            <div className={classes.playersContainer}>
              <h3>Players:</h3>
              <button onClick={decreasePlayers}>-</button>
              <span>{numberOfPlayers}</span>
              <button onClick={increasePlayers}>+</button>
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link className={classes.reserveButton} href="/booking">
                Reserve Court
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      <div className={classes.imageContainer}>
        <div className={classes.imageWrapper}>
          <Image
            src={bookCourt}
            alt="book-court"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Booking;
