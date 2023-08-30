import React, { Fragment } from "react";

import Image from "next/image";

import icon1 from "@/public/images/icon1.png";
import icon2 from "@/public/images/icon2.png";
import icon3 from "@/public/images/icon3.png";
import classes from "./services.module.css";

function Services() {
  const services = [
    {
      id: "1",
      image: icon1,
      title: "Book A Court",
      description:
        "Reserve a sports court for your favorite activity. Our easy-to-use booking system lets you choose the time and court that suits you best.",
    },
    {
      id: "2",
      image: icon2,
      title: "Find A Partner",
      description:
        "Looking for a playing partner? Connect with fellow enthusiasts through our partner matching service and enjoy your favorite sport together.",
    },
    {
      id: "3",
      image: icon3,
      title: "Enroll in Training",
      description:
        "Enhance your skills with our professional training programs. Our experienced trainers will help you master the techniques and strategies of your chosen sport.",
    },
  ];

  return (
    <div className={classes.services}>
      {services.map((service) => (
        <div key={service.id} className={classes.service}>
          <div>
            <Image src={service.image} alt="hi" />
          </div>
          <div>
            <h1>{service.title}</h1>
          </div>
          <div>
            <p>{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services;
