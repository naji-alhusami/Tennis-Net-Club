// "use server";
import Image from "next/image";
import React, { Fragment } from "react";
import classes from "./manage-booking.module.css";
// import ButtonTest from "../ui/buttonTest";
import { deleteReservedTimesActions } from "@/actions/deleteReservedTimesActions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";

async function ManageBooking() {
  const { user } = await getServerSession(authOptions);
  const takenTimes = await fetchTakenTimesFromMongo();

  const filteredTakenTimes = takenTimes.data.filter(
    (takenTime) => takenTime.member === user.name
  );

  async function cancelReservedTimeHandler(timeSlot) {
    // "use server";
    await deleteReservedTimesActions(timeSlot);
  }

  return (
    <Fragment>
      <div className={classes.manageContainer}>
        {!filteredTakenTimes.length > 0 ? (
          <p>You Do Not Have Reserved Times.</p>
        ) : (
          filteredTakenTimes.map((timeSlot) => {
            return (
              <>
                <form
                  className={classes.timeSlotsContainer}
                  action={cancelReservedTimeHandler(timeSlot)}
                  // onSubmit={editReservedTimesHandler}
                >
                  <div key={timeSlot._id} className={classes.timeSlot}>
                    <h1>{timeSlot.courtType} Court</h1>
                    <div>
                      <p className={classes.time}>{timeSlot.time}</p>
                      <p>{timeSlot.date}</p>
                    </div>
                    {/* <div className={classes.button}>
                      <ButtonTest>CANCEL</ButtonTest>
                    </div> */}
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
