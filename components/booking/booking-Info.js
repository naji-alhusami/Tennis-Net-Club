import React, { Suspense } from "react";

import DateSelectionStep from "./booking-date-step";
import TimeSelectionStep from "./booking-times-step";
import ConfirmationStep from "./booking-confirm-step";
import { fetchTimeSlots } from "@/lib/generate-times";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";
import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function BookingInfo({ searchParams }) {
  const newDate = searchParams.date;
  const newCourt = searchParams.court;
  const timeSlots = await fetchTimeSlots(newDate, newCourt);
  const takenTimes = await fetchTakenTimesFromMongo();
  const events = await fetchEventsFromMongo();
  const { user } = await getServerSession(authOptions);
  console.log("searchParams", searchParams);

  const headerStyle = { textAlign: "center", fontSize: "2rem" };
  const hrStyle = {
    border: "1px solid #1c7f47",
    width: "6rem",
  };

  return (
    <div>
      {Object.keys(searchParams).length === 0 && (
        <div>
          <h2 style={headerStyle}>
            Choose Court Type, Players Number and Date
          </h2>{" "}
          <hr style={hrStyle} />
          <DateSelectionStep />
        </div>
      )}
      {!searchParams.time && (
        <div>
          <h2 style={headerStyle}>Choose Available Time</h2>
          <hr style={hrStyle} />
          <TimeSelectionStep
            searchParams={searchParams}
            user={user}
            timeSlots={timeSlots}
            takenTimes={takenTimes}
          />
        </div>
      )}
      {searchParams.date && searchParams.court && searchParams.time && (
        <div>
          <h2 style={headerStyle}>Confirm Booking Details</h2>
          <hr style={hrStyle} />
          <ConfirmationStep
            events={events}
            user={user}
            searchParams={searchParams}
          />
        </div>
      )}
    </div>
  );
}

export default BookingInfo;
