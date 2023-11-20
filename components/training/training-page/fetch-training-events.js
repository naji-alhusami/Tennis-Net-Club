"use server";
import React from "react";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import TrainingOffers from "./training-offers";

async function FetchTrainingEvents() {
  const trainings = await fetchEventsFromMongo();

  const hasTrainingMembership = trainings.data.some((training) => {
    return training.member === session?.user.name;
  });

  return <TrainingOffers hasTrainingMembership={hasTrainingMembership} />;
}

export default FetchTrainingEvents;
