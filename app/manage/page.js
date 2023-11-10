"use server";
import ManageBooking from "@/components/manage/manage-booking";
import Headers from "@/components/ui/headers";
import Image from "next/image";
import manage from "@/public/images/manage.jpg";
import React, { Suspense } from "react";
import classes from "@/components/manage/manage-booking.module.css";

function ManageBookingPage() {
  return (
    <>
      <div className={classes.imageContainer}>
        <Image
          src={manage}
          alt="book-course"
          // width={300}
          // height={300}
          property="true"
        />
      </div>
      <div className={classes.text}>
        <Headers
          H3Header=""
          H1Header=""
          H2Header="Manage Reserved Times"
          PHeader="Change OR Cancel Your Booking"
        />
      </div>
      <Suspense fallback={<h1>Loading TakenTimes ... </h1>}>
        <ManageBooking />
      </Suspense>
    </>
  );
}

export default ManageBookingPage;
