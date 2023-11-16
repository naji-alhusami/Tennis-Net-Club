import React from "react";

import TrainingOffers from "@/components/training/training-offers";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import Image from "next/image";
import Headers from "@/components/ui/headers";
import classes from "@/components/training/training.module.css";
import courses from "@/public/images/courses.jpg";

export const metadata = {
  title: "Training Offers",
  description:
    "Check our training offers in the Tennis Net Club, and Enroll if you are a member",
};

async function trainingPage() {
  const trainings = await fetchEventsFromMongo();

  return (
    <div>
      <div className={classes.imageContainer}>
        <Image
          src={courses}
          alt="book-course"
          priority="true"
          property="true"
        />
      </div>
      <div className={classes.text}>
        <Headers
          H3Header=""
          H1Header=""
          H2Header="Training Sessions"
          PHeader="Enroll In Our Training Sessions, Starting from Beginner to Advanced, Group or Individual"
        />
      </div>
      <TrainingOffers trainings={trainings} />
    </div>
  );
}

export default trainingPage;
