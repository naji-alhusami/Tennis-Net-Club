"use client";
import React, { Fragment } from "react";
import Image from "next/image";
import thanks from "@/public/images/thanks.jpg";
import Button from "../ui/button";
import Link from "next/link";
import { RightArrow } from "../icons/right-arrow";
import classes from "./thanks.module.css";
import { motion } from "framer-motion";
import { equipmentsData } from "../traininga/equipmentsData";

function Thanks({ thanksMessage }) {
  return (
    <Fragment>
      <div className={classes.starting}>
        <div
          className={classes.imageContainer}
          style={{ filter: "brightness(0.7)" }}
        >
          <Image
            src={thanks}
            alt="website background"
            // objectFit="cover"
            priority={true}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={classes.startingText}
        >
          <h2>Hi</h2>
          <h2>Welcome to our TENNIS NET Club</h2>
          <motion.h1>{thanksMessage}</motion.h1>

          <Link href="/">
            <Button>
              Back To Home
              <RightArrow />
            </Button>
          </Link>
        </motion.div>
      </div>
      <div className={classes.equipmentsContainer}>
        {equipmentsData.map((equipment) => (
          <div key={equipment.id} className={classes.equipmentContainer}>
            <div>
              <Image src={equipment.image} alt="eq1" />
            </div>
            <div>
              <h1>{equipment.title}</h1>
              <p>{equipment.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Thanks;
