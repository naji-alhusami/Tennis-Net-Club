"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useSpring, animated } from "react-spring";

import { TrainingLevelsData } from "@/components/training/training-home/training-levels-data";
import Headers from "../../ui/headers";
import player1 from "@/public/images/player1.jpg";
import player2 from "@/public/images/player2.jpg";
import classes from "./training-home.module.css";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

function TrainingHome() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div className={classes.container}>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, z: 100 },
          visible: { opacity: 1, z: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <div className={classes.imagesContainer}>
          <div className={classes.image}>
            <Image src={player1} alt="player1" />
          </div>
          <div className={classes.image}>
            <Image src={player2} alt="player1" />
          </div>
        </div>
      </motion.div>
      <div className={classes.text}>
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, y: -100 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Headers
            H3Header="Never Too Late"
            H1Header="TRAINING"
            H2Header="Certified Coaches"
            PHeader="Welcome to TENNIS NET club, home to certified coaches dedicated to
            enhancing your tennis skills. We offer beginner, intermediate, and
            advanced courses, providing tailored instruction for players at every
            level. Join us to elevate your game and enjoy the sport of tennis to
            the fullest!"
          />
        </motion.div>
        {TrainingLevelsData.map((training) => (
          <div key={training.id} className={classes.rectangular}>
            <motion.div
              className={classes[training.style]}
              ref={ref}
              variants={{
                hidden: { width: 0 },
                visible: { width: `${training.width}%` },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.p
                ref={ref}
                variants={{
                  hidden: { opacity: 0, z: 100 },
                  visible: { opacity: 1, z: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {training.courseType}
              </motion.p>
              <span className={classes.percentage}>
                <Number n={training.percent} />
                &#37;
              </span>
            </motion.div>
          </div>
        ))}
        <Link href="/training" className={classes.trainingLink}>
          Check Traingings Offers
        </Link>
      </div>
    </div>
  );
}

export default TrainingHome;
