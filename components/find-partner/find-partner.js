"use client";
import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import partner from "@/public/images/partner.jpg";
import classes from "./find-partner.module.css";
import Headers from "../ui/headers";
import { BsWhatsapp } from "react-icons/bs";
import { useSession } from "next-auth/react";

function FindPartner({ players }) {
  const { data: session } = useSession();

  const filteredPlayers = players.filter(
    (player) => player.name !== session?.user.name
  );
  console.log(filteredPlayers);

  return (
    <Fragment>
      <div className={classes.partnerContainer}>
        <div className={classes.imageContainer}>
          <Image
            src={partner}
            alt="find-partner"
            // width={300}
            // height={300}
            property="true"
          />
        </div>
        <div className={classes.text}>
          <Headers
            H3Header="ALL PLAYERS IN THE CLUB"
            H1Header="CHOOSE MEMBER"
            H2Header="Find Partner"
            PHeader="You Can Choose Player To Play With, By Contacting Using WhatsApp"
          />
        </div>
        <div className={classes.players}>
          {filteredPlayers.map((player) => (
            <div key={player._id} className={classes.player}>
              <div className={classes.playerInfo}>
                {/* <h2>Player:</h2> */}
                <h2>{player.name}</h2>
              </div>
              <div className={classes.playerInfo}>
                {/* <h2>Level: </h2> */}
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
        </div>
        {/* <div className={classes.trainingPricesContainers}>
          {trainingData.map((data) => (
            <div
              key={data.id}
              className={
                data.id === "2"
                  ? classes.trainingPricesContainer2
                  : classes.trainingPricesContainer1
              }
            >
              <div>
                <h1>{data.courseType}</h1>
                <h2>{data.price}</h2>
              </div>
              <div>
                <p>{data.pText1}</p>
                <p>{data.pText2}</p>
                <p>{data.pText3}</p>
                <p>{data.pText4}</p>
                
              </div>
              <div>
                {session ? (
                  <Link href="/contact">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      className={
                        data.id === "2"
                          ? classes.enrollButton2
                          : classes.enrollButton1
                      }
                    >
                      Contact Us
                    </motion.div>
                  </Link>
                ) : (
                  <div className={classes.enrollButtonDisabled}>Enroll</div>
                )}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </Fragment>
  );
}

export default FindPartner;
