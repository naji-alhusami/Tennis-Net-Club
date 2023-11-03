"use client";
import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import classes from "./training.module.css";
import courses from "@/public/images/courses.jpg";
import bg from "@/public/images/background1.jpg";
import Headers from "../ui/headers";
import { trainingData } from "./trainingData";
import { equipmentsData } from "./equipmentsData";

function Training() {
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
                {/* <p>{data.pText5}</p> */}
              </div>
              <div>
                <Link href="/auth/login">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={
                      data.id === "2"
                        ? classes.enrollButton2
                        : classes.enrollButton1
                    }
                  >
                    Enroll
                  </motion.div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* <div className={classes.equipmentsContainer}>
          {equipmentsData.map((eq) => (
            <div key={eq.id} className={classes.equipmentContainer}>
              <div>
                <Image src={eq.image} alt="eq1" />
              </div>
              <div>
                <h1>{eq.title}</h1>
                <p>{eq.description}</p>
              </div>
            </div>
          ))}
        </div> */}
        {/* <div className={classes.trainingPricesContainers}>
          <div className={classes.trainingPricesContainer1}>
            <h2>GROUP SESSION</h2>
            <h1>300$ / Month</h1>
            <p>Intermediate / Advanced Level</p>
            <p>3 Days Per Week</p>
            <p>1 Hour</p>
            <p>Up To 3 Players</p>
            <p>All Equipments Are Available</p>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link className={classes.contactButton1} href="/auth/login">
                Enroll
              </Link>
            </motion.div>
          </div>
          <div className={classes.trainingPricesContainer2}>
            <div className={classes.textContainer2}>
              <h2>GROUP SESSION</h2>
              <h1>150$ / Month</h1>
              <p>Beginner Level</p>
              <p>3 Days Per Week</p>
              <p>1 Hour</p>
              <p>Up To 3 Players</p>
              <p>All Equipments Are Available</p>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link className={classes.contactButton} href="/auth/login">
                  Enroll
                </Link>
              </motion.div>
            </div>
          </div>
          <div className={classes.trainingPricesContainer3}>
            <h2>INDIVIDUAL SESSION</h2>
            <h1>150$ / Month</h1>
            <p>Intermediate / Advanced Level</p>
            <p>3 Days Per Week</p>
            <p>Can Bring A Friend</p>
            <p>All Equipments Are Available</p>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link className={classes.contactButton1} href="/auth/login">
                Enroll
              </Link>
            </motion.div>
          </div>
        </div> */}
        {/* <div className={classes.equipmentsContainer}>
          <div className={classes.equipmentContainer}>
            <div>
              <Image src={eq1} alt="eq1" />
            </div>
            <div>
              <h1>eq 1</h1>
              <p>equipment</p>
            </div>
          </div>
          <div className={classes.equipmentContainer}>
            <div>
              <Image src={eq2} alt="eq2" />
            </div>
            <div>
              <h1>eq 1</h1>
              <p>equipment</p>
            </div>
          </div>
          <div className={classes.equipmentContainer}>
            <div>
              <Image src={eq3} alt="eq3" />
            </div>
            <div>
              <h1>eq 1</h1>
              <p>equipment</p>
            </div>
          </div>
          <div className={classes.equipmentContainer}>
            <div>
              <Image src={eq4} alt="eq4" />
            </div>
            <div>
              <h1>eq 1</h1>
              <p>equipment</p>
            </div>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
}

export default Training;
