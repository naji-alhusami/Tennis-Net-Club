"use client";
import React, { useEffect, useRef } from "react";

import Image from "next/legacy/image";
import Headers from "../ui/headers";
import { servicesData } from "@/lib/servicesData";
import classes from "./services.module.css";
import { motion, useAnimation, useInView } from "framer-motion";

function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      className={classes.container}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.3, delay: 0.4 }}
      ref={ref}
    >
      <div className={classes.text}>
        <Headers
          H3Header="TENNIS NET"
          H1Header="SERVICES"
          H2Header="Discover Our Services"
          PHeader="Experience a variety of engaging services that bring our tennis
          community together."
        />
      </div>
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
    </motion.div>
  );
}

export default Services;
