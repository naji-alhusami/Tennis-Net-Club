import FindPartner from "@/components/find-partner/find-partner";
import { fetchPlayersFromMongo } from "@/lib/players/fetchPlayersFromMongo";
import React from "react";

async function PartnerPage() {
  const players = await fetchPlayersFromMongo();

  return <FindPartner players={players.data} />;
}

export default PartnerPage;
