import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import classes from "./training.module.css";
import courses from "@/public/images/courses.jpg";
import bg from "@/public/images/background1.jpg";

function Training() {
  return (
    <div className={classes.trainingContainer}>
      <div className={classes.imageContainer}>
        <Image
          src={courses}
          alt="book-course"
          // width={300}
          // height={300}
          property="true"
        />
      </div>
      <div className={classes.titleContainer}>
        <h2>LEARN TENNIS</h2>
        <h1>Enroll In Our Training Sessions</h1>
      </div>
      <div className={classes.titleContainer}>
        <h2>LEARN TENNIS</h2>
        <h1>Enroll In Our Training Sessions</h1>
      </div>
      <div className={classes.trainingPricesContainers}>
        <div className={classes.trainingPricesContainer1}>
          <h2>Begginer Courses</h2>
          <h1>100$</h1>
          <p>jsdkasjdlkamdlk</p>
          <p>jsdkasjdlkamdlk</p>
          <p>jsdkasjdlkamdlk</p>
          <p>jsdkasjdlkamdlk</p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link className={classes.contactButton} href="/auth/login">
              Contact Us
            </Link>
          </motion.div>
        </div>
        <div className={classes.trainingPricesContainer2}>
          <div className={classes.imageContainer2}>
            <Image src={bg} alt="bg-image" />
          </div>
          <div className={classes.textContainer2}>
            <h2>INTERMEDIATE COURSES</h2>
            <h1>100$</h1>
            <p>jsdkasjdlkamdlk</p>
            <p>jsdkasjdlkamdlk</p>
            <p>jsdkasjdlkamdlk</p>
            <p>jsdkasjdlkamdlk</p>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link className={classes.contactButton1} href="/auth/login">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
        <div className={classes.trainingPricesContainer3}>
          <h2>ADVANCED Courses</h2>
          <h1>100$</h1>
          <p>jsdkasjdlkamdlk</p>
          <p>jsdkasjdlkamdlk</p>
          <p>jsdkasjdlkamdlk</p>
          <p>jsdkasjdlkamdlk</p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link className={classes.contactButton} href="/auth/login">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Training;
