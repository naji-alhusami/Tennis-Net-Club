"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import Headers from "../ui/headers";
import manage from "@/public/images/manage.jpg";
import classes from "./manage-booking.module.css";
import { useSession } from "next-auth/react";
import ButtonTest from "../ui/buttonTest";
import {
  deleteReservedTimesAction,
  deleteReservedTimesActions,
} from "@/actions/deleteReservedTimesActions";

function ManageBooking({ takenTimes }) {
  const { data: session } = useSession();
  const filteredTakenTimes = takenTimes.filter(
    (takenTime) => takenTime.member === session?.user.name
  );

  async function cancelReservedTimeHandler(timeSlot) {
    console.log(timeSlot);
    console.log(filteredTakenTimes);

    await deleteReservedTimesActions(timeSlot);
  }

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

        {!filteredTakenTimes.length > 0 ? (
          <p>You Do Not Have Reserved Times.</p>
        ) : (
          filteredTakenTimes.map((timeSlot) => {
            return (
              <>
                <form
                  className={classes.timeSlotsContainer}
                  action={() => cancelReservedTimeHandler(timeSlot)}
                  // onSubmit={editReservedTimesHandler}
                >
                  <div key={timeSlot._id} className={classes.timeSlot}>
                    <h1>{timeSlot.courtType} Court</h1>
                    <div>
                      <p className={classes.time}>{timeSlot.time}</p>
                      <p>{timeSlot.date}</p>
                    </div>
                    <div className={classes.button}>
                      <ButtonTest>CANCEL</ButtonTest>
                    </div>
                  </div>
                </form>
              </>
            );
          })
        )}
      </div>
    </Fragment>
  );
}

export default ManageBooking;
