import React, { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import classes from "./find-partner.module.css";
import { BsWhatsapp } from "react-icons/bs";
import { fetchPlayersFromMongo } from "@/lib/players/fetchPlayersFromMongo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function FindPartner() {
  const { user } = await getServerSession(authOptions);
  const players = await fetchPlayersFromMongo();

  const filteredPlayers = players.data.filter(
    (player) => player.name !== user.name
  );

  return (
    <Fragment>
      <div>
        <div className={classes.players}>
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
        </div>
      </div>
    </Fragment>
  );
}

export default FindPartner;
