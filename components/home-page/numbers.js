"use client";
import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import classes from "./numbers.module.css";
import { useAnimation, useInView } from "framer-motion";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    // config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}

function Numbers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref} className={classes.container}>
      <div className={classes.numbers}>
        <div className={classes.number}>
          <h1>
            <Number n={20} />
          </h1>
          <p>Courts</p>
        </div>
        <div className={classes.number}>
          <h1>
            <Number n={30} />
          </h1>
          <p>Couches</p>
        </div>
        <div className={classes.number}>
          <h1>
            <Number n={90} />
          </h1>
          <p>Players</p>
        </div>
      </div>
    </div>
  );
}

export default Numbers;
