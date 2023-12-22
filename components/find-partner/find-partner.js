import React, { Fragment } from "react";
import { getServerSession } from "next-auth";

import { fetchPlayersFromMongo } from "@/lib/players/fetchPlayersFromMongo";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Partners from "./partners";

async function FindPartner() {
  const session = await getServerSession(authOptions);
  const players = await fetchPlayersFromMongo();
  const filteredPlayers = players.data.filter(
    (player) => player.email !== session?.user.email
  );

  return (
    <Fragment>
      <h1>partner</h1>
      {filteredPlayers.length === 0 ? (
        <h4 style={{ color: "red" }}>No Players To Play With</h4>
      ) : (
        <Partners players={players} />
      )}
    </Fragment>
  );
}

export default FindPartner;
