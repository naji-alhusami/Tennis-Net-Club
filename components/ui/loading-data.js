import React from "react";
import Image from "next/image";

import ball from "@/public/images/ball.png";
import classes from "./loading-data.module.css";

export default function LoadingData() {
  return (
    <div className={classes.laoadingContainer}>
      <div className={classes.tennisSpinner}>
        <Image width={100} height={100} src={ball} alt="Tennis Ball" />
      </div>
    </div>
  );
}
