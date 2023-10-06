import React from "react";

import Image from "next/legacy/image";

import { servicesData } from "@/lib/servicesData";
import classes from "./services.module.css";

function Services() {
  return (
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
  );
}

export default Services;
