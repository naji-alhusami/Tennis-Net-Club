"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

import classes from "./training.module.css";

import { trainingData } from "./trainingData";
import { useSession } from "next-auth/react";
import TrainingForm from "./training-form";

function TrainingOffers({ trainings }) {
  const trainingFormRef = useRef(null);
  const { data: session } = useSession();
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [selectedTrainingType, setSelectedTrainingType] = useState(null);
  const trainingOffersRef = useRef(null);
  const trainingOffersIsInView = useInView(trainingOffersRef, { once: true });
  const trainingOffersControls = useAnimation();

  const hasTrainingMembership = trainings.data.some((training) => {
    return training.member === session?.user.name;
  });

  useEffect(() => {
    if (trainingOffersIsInView) {
      trainingOffersControls.start("visible");
    }
  }, [trainingOffersIsInView, trainingOffersControls]);

  useEffect(() => {
    if (showEnrollForm) {
      trainingFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showEnrollForm]);

  const handleEnrollClick = (typeId) => {
    setShowEnrollForm(false);
    setSelectedTrainingType(typeId);
    setShowEnrollForm(true);

    if (trainingFormRef.current) {
      trainingFormRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <Fragment>
      <div className={classes.trainingContainer}>
        {hasTrainingMembership && (
          <h4 style={{ color: "red" }}>
            You Are Already Involved in Training Sessions
          </h4>
        )}
        <motion.div
          ref={trainingOffersRef}
          variants={{
            hidden: { opacity: 0, scale: 0.8, z: -50 },
            visible: { opacity: 1, scale: 1, z: 0 },
          }}
          initial="hidden"
          animate={trainingOffersControls}
          transition={{ duration: 0.3, delay: 1 }}
          className={classes.trainingPricesContainers}
        >
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
                {session && !hasTrainingMembership ? (
                  <motion.div
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
                  <div className={classes.buttonDisabled}>Enroll</div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
        {showEnrollForm && (
          <div ref={trainingFormRef}>
            <TrainingForm selectedTrainingType={selectedTrainingType} />
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default TrainingOffers;
