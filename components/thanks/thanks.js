"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import Equipments from "../equipments/equipments";
import thanks from "@/public/images/thanks.jpg";
import Button from "../ui/button";
import { RightArrow } from "../icons/right-arrow";
import classes from "./thanks.module.css";

function Thanks({ thanksMessage }) {
  return (
    <Fragment>
      <div className={classes.starting}>
        <div
          className={classes.imageContainer}
          style={{ filter: "brightness(0.7)" }}
        >
          <Image src={thanks} alt="website background" priority={true} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={classes.startingText}
        >
          {/* <h2>Hi</h2> */}
          <h2>Welcome to our TENNIS NET Club</h2>
          <motion.h1>{thanksMessage}</motion.h1>
          <Equipments />
          <Link href="/">
            <Button>
              Back To Home
              <RightArrow />
            </Button>
          </Link>
        </motion.div>
      </div>
    </Fragment>
  );
}

export default Thanks;
