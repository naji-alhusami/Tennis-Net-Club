"use server";
import React from "react";
import { getServerSession } from "next-auth";

import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import TrainingOffers from "./training-offers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function FetchTrainingEvents() {
  const trainings = await fetchEventsFromMongo();
  const session = await getServerSession(authOptions);

  const hasTrainingMembership = trainings.data.some((training) => {
    return training.member === session?.user.name;
  });

  return <TrainingOffers hasTrainingMembership={hasTrainingMembership} />;
}

export default FetchTrainingEvents;
