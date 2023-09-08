import React from "react";
import Image from "next/image";

import classes from "./courses.module.css";
import player1 from "@/public/images/player1.jpg";
import player2 from "@/public/images/player2.jpg";

function Courses({ courses }) {
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
        <h1>TRAINING</h1>
        <h2>Certified Coaches</h2>
        <p>
          Welcome to TENNIS NET club, home to certified coaches dedicated to
          enhancing your tennis skills. We offer beginner, intermediate, and
          advanced courses, providing tailored instruction for players at every
          level. Join us to elevate your game and enjoy the sport of tennis to
          the fullest!
        </p>
        {courses.map((course) => (
          <div key={course.id} className={classes.rectangular}>
            <div className={classes[course.style]}>
              <p>{course.courseType}</p>
              <span>{course.percent}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
