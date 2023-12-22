"use server";
import React from "react";
import { getServerSession } from "next-auth";

import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import TrainingOffers from "./training-offers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function FetchTrainingEvents() {
  const session = await getServerSession(authOptions);
  const trainings = await fetchEventsFromMongo();
  const trainingMembership = trainings.data.filter((training) => {
    training.member === session?.user.name;
  });

  return <TrainingOffers trainingMembership={trainingMembership} />;
}

export default FetchTrainingEvents;
