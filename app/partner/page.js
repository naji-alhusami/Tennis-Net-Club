import { fetchPlayersFromMongo } from "@/lib/players/fetchPlayersFromMongo";
import React from "react";

async function PartnerPage() {
  const players = await fetchPlayersFromMongo();
  console.log(players);
  //   return <FindPartner />;
  return <h1>test</h1>;
}

export default PartnerPage;
