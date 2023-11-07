"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import Headers from "../ui/headers";
import manage from "@/public/images/manage.jpg";
import classes from "./manage-booking.module.css";
import { useSession } from "next-auth/react";

function ManageBooking({ takenTimes }) {
  const { data: session } = useSession();
  const filteredTakenTimes = takenTimes.filter(
    (takenTime) => takenTime.member === session?.user.name
  );
  console.log(filteredTakenTimes);

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
        <div className={classes.timeSlotsContainer}>
          {filteredTakenTimes.length > 0 ? (
            filteredTakenTimes.map((timeSlot) => {
              return (
                <div key={timeSlot._id} className={classes.timeSlot}>
                  <h1>{timeSlot.courtType} Court</h1>
                  <div>
                    <p className={classes.time}>{timeSlot.time}</p>
                    <p>{timeSlot.date}</p>
                  </div>
                  <div className={classes.buttonsContainer}>
                    <p className={classes.editButton}>CHANGE</p>
                    <p className={classes.editButton}>CANCEL</p>
                    {/* {renderTimeSlotElement(timeSlot)} */}
                  </div>
                </div>
              );
            })
          ) : (
            <p>You Do Not Have Reserved Times.</p>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default ManageBooking;
