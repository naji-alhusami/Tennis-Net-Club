"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { BsWhatsapp } from "react-icons/bs";
import classes from "./find-partner.module.css";
import { motion, useAnimation, useInView } from "framer-motion";

function Partners({ filteredPlayers }) {
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
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: -75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.3, delay: 0.4 }}
      className={classes.players}
    >
      {filteredPlayers.map((player) => (
        <div key={player._id} className={classes.player}>
          <div className={classes.playerInfo}>
            <h2>{player.name}</h2>
          </div>
          <div className={classes.playerInfo}>
            <p>{player.level} Level</p>
          </div>
          <div className={classes.playerInfo}>
            <div className={classes.icon}>
              <Link href={`https://wa.me/${player.WhatsAppNumber}`}>
                <BsWhatsapp />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default Partners;
