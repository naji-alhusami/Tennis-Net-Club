import React, { Fragment } from "react";

import Partners from "./partners";
import { fetchPlayersFromMongo } from "@/lib/players/fetchPlayersFromMongo";

async function FindPartner() {
  const players = await fetchPlayersFromMongo();

  return (
    <Fragment>
      <Partners players={players} />
    </Fragment>
  );
}

export default FindPartner;
