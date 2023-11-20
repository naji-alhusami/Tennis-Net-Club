import React, { Suspense } from "react";
import Image from "next/image";

import TrainingOffers from "@/components/training/training-page/training-offers";
import Headers from "@/components/ui/headers";
import courses from "@/public/images/courses.jpg";
import LoadingData from "@/components/ui/loading-data";
import classes from "@/components/training/training-page/training.module.css";

export const metadata = {
  title: "Training Offers",
  description:
    "Check our training offers in the Tennis Net Club, and Enroll if you are a member",
};

async function TrainingPage() {
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
      <Suspense fallback={<LoadingData />}>
        <TrainingOffers />
      </Suspense>
    </div>
  );
}

export default TrainingPage;
