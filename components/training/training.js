import React from "react";
import Image from "next/image";

import classes from "./training.module.css";
import courses from "@/public/images/courses.jpg";

function Training() {
  return (
    <div className={classes.trainingContainer}>
      <div className={classes.imageContainer}>
        <Image
          src={courses}
          alt="book-course"
          // width={300}
          // height={300}
          property={true}
        />
        <div className={classes.titleContainer}>
          <h2>LEARN TENNIS</h2>
          <h1>Enroll In Our Training Sessions</h1>
        </div>
      </div>
    </div>
  );
}

export default Training;
