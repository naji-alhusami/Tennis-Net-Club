import React, { Fragment } from "react";

import Partners from "./partners";
import { fetchPlayersFromMongo } from "@/lib/players/fetchPlayersFromMongo";

async function FindPartner() {
  const players = await fetchPlayersFromMongo();
  console.log(players);
  return (
    <Fragment>
      {players.data.length === 1 ? (
        <h4 style={{ color: "red" }}>No Players To Play With</h4>
      ) : (
        <Partners players={players} />
      )}
    </Fragment>
  );
}

export default FindPartner;
