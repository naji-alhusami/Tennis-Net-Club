import React from "react";
import Image from "next/image";

import background from "@/public/images/background.jpg";
import classes from "./starting.module.css";

function starting() {
  return (
    <section className={classes.starting}>
      <div className={classes.image}>
        <Image src={background} alt="website background" />
      </div>
      <div className={classes.startingText}>
        <h1>Hi</h1>
        <h2>Welcome to the heart of tennis history and inspiration!</h2>
        <p>Tennis Legends Series a captivating journey into the lives, triumphs, and lasting legacies of the remarkable individuals who have graced the courts and etched their names into tennis lore.</p>
      </div>
    </section>
  );
}

export default starting;
