import React, { Fragment } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Partners from "./partners";
import { fetchPlayersFromMongo } from "@/lib/players/fetchPlayersFromMongo";

async function FindPartner() {
  const session = await getServerSession(authOptions);
  const players = await fetchPlayersFromMongo();

  const filteredPlayers = players.data.filter(
    (player) => player.name !== session?.user.name
  );

  return (
    <Fragment>
      <Partners filteredPlayers={filteredPlayers} />
    </Fragment>
  );
}

export default FindPartner;
