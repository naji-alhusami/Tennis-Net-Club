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

function Booking() {
  const { numberOfPlayers, setNumberOfPlayers } = useContext(AuthContext);
  const { data: session } = useSession();

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
          <Image
            src={bg}
            alt="cover-image"
            width={700}
            height={560}
            priority={true}
          />
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
            {/* <BookingDate /> */}
            <div className={classes.playersContainer}>
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
      </div>
      <div className={classes.imageContainer}>
        <div className={classes.imageWrapper}>
          <Image
            src={bookCourt}
            alt="book-court"
            // layout="fill"
            // objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Booking;
