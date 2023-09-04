import React from "react";
import Image from "next/image";

import numbers from "@/public/images/numbers.jpg";
import classes from "./numbers.module.css";
import { numbersData } from "./numbersData";
import player1 from "@/public/images/player1.jpg";
import player2 from "@/public/images/player2.jpg";

function Numbers() {
  return (
    <div className={classes.container}>
      <div className={classes.imagesContainer}>
        <div className={classes.image}>
          <Image src={player1} alt="player1" />
        </div>
        <div className={classes.numbers}>
          <h1>20</h1>
          <p>Courts</p>
          <h1>30</h1>
          <p>Couches</p>
          <h1>90</h1>
          <p>Players</p>
        </div>
        <div className={classes.image}>
          <Image src={player2} alt="player1" />
        </div>
      </div>
      <div className={classes.text}>
        <h3>Never Too Late</h3>
        <h1>TENNIS</h1>
        <h2>Certified Coaches</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet
          condimentum lacus id cursus. Praesent eu iaculis dui, nec rutrum
          massa. Maecenas ac tristique mi, quis laoreet turpis. Aenean in erat
          est.{" "}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet
          condimentum lacus id cursus. Praesent eu iaculis dui, nec rutrum
          massa. Maecenas ac tristique mi, quis laoreet turpis. Aenean in erat
          est.{" "}
        </p>
      </div>
    </div>
    // <div className={classes.numbersContainer}>
    //   <div className={classes.image} style={{ filter: "brightness(0.7)" }}>
    //     <Image src={numbers} alt="number" priority={true} />
    //   </div>
    //   <div className={classes.numbers}>
    //     {numbersData.map((number) => (
    //       <div key={number.id} className={classes.number}>
    //         <h1>{number.number}</h1>
    //         <div>
    //           <h2>{number.text1}</h2>
    //           <p>{number.text2}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}

export default Numbers;
