import React from "react";
import Image from "next/image";

import numbers from "@/public/images/numbers.jpg";
import classes from "./numbers.module.css";
import { numbersData } from "./numbersData";

function Numbers() {
  return (
    <div className={classes.numbersContainer}>
      <div className={classes.image} style={{ filter: "brightness(0.7)" }}>
        <Image src={numbers} alt="number" priority={true} />
      </div>
      <div className={classes.numbers}>
        {numbersData.map((number) => (
          <div key={number.id} className={classes.number}>
            <h1>{number.number}</h1>
            <div>
              <h2>{number.text1}</h2>
              <p>{number.text2}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Numbers;
