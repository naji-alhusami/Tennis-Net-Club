import Image from "next/image";
import React, { Fragment } from "react";
import Headers from "../ui/headers";
import manage from "@/public/images/manage.jpg";
import classes from "./manage-booking.module.css";

function ManageBooking({takenTimes}) {
    

  return (
    <Fragment>
      <div className={classes.manageContainer}>
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
      </div>
    </Fragment>
  );
}

export default ManageBooking;
