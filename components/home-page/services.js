import React from "react";

import Image from "next/legacy/image";

import { servicesData } from "@/lib/servicesData";
import classes from "./services.module.css";

function Services() {
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <h3 className={classes.textClub}>TENNIS NET</h3>
        <h1 className={classes.textHeader}>SERVICES</h1>
        <h2 className={classes.textHeader2}>Discover Our Services</h2>
        <p className={classes.textp}>
          Experience a variety of engaging services that bring our tennis
          community together.
        </p>
        <div className={classes.services}>
          {servicesData.map((service) => (
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
      </div>
    </div>
  );
}

export default Services;
