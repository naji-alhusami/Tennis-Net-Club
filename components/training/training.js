"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import classes from "./training.module.css";
import courses from "@/public/images/courses.jpg";
import Headers from "../ui/headers";
import { trainingData } from "./trainingData";
import { useSession } from "next-auth/react";
import TrainingForm from "./trainingForm";
// import TrainingForm from "./trainingForm";

function Training() {
  const { data: session } = useSession();
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [selectedTrainingType, setSelectedTrainingType] = useState(null);

  const handleEnrollClick = (typeId) => {
    setSelectedTrainingType(typeId);
    setShowEnrollForm(true);
  };
  console.log(selectedTrainingType);
  return (
    <Fragment>
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
        <div className={classes.text}>
          <Headers
            H3Header="Courses, Lessons & Training Sessions"
            H1Header="NEVER TOO LATE"
            H2Header="Training Sessions"
            PHeader="Enroll In Our Training Sessions, Starting from Beginner to Advanced, Group or Individual"
          />
        </div>
        <div className={classes.trainingPricesContainers}>
          {trainingData.map((data) => (
            <div
              key={data.id}
              className={
                data.id === "2"
                  ? classes.trainingPricesContainer2
                  : classes.trainingPricesContainer1
              }
            >
              <div>
                <h1>{data.courseType}</h1>
                <h2>{data.price}</h2>
              </div>
              <div>
                <p>{data.pText1}</p>
                <p>{data.pText2}</p>
                <p>{data.pText3}</p>
                <p>{data.pText4}</p>
              </div>
              <div>
                {session ? (
                  <motion.div
                    // onClick={() => setShowEnrollForm(true)}
                    onClick={() => handleEnrollClick(data.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className={
                      data.id === "2"
                        ? classes.enrollButton2
                        : classes.enrollButton1
                    }
                  >
                    Enroll
                  </motion.div>
                ) : (
                  <div className={classes.enrollButtonDisabled}>Enroll</div>
                )}
              </div>
            </div>
          ))}
        </div>
        {showEnrollForm && (
          <div>
            <TrainingForm selectedTrainingType={selectedTrainingType} />
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Training;
