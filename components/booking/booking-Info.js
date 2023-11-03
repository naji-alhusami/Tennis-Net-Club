"use client";
import React, { useContext } from "react";
import { useSearchParams } from "next/navigation";

import DateSelectionStep from "./booking-date-step";
import AuthContext from "@/store/auth-context";
import TimeSelectionStep from "./booking-times-step";
import ConfirmationStep from "./booking-confirm-step";
import { useSession } from "next-auth/react";

function BookingInfo({ timeSlots, events, takenTimes }) {
  const { data: session } = useSession();
  const router = useSearchParams();
  const { currentStep, activeDay, nextStepHandler, prevStepHandler } =
    useContext(AuthContext);

  const headerStyle = { textAlign: "center", fontSize: "2rem" };
  const hrStyle = {
    border: "1px solid #1c7f47",
    width: "6rem",
  };

  return (
    <div>
      {currentStep === 1 && (
        <div>
          <h2 style={headerStyle}>
            Choose Court Type, Players Number and Date
          </h2>{" "}
          <hr style={hrStyle} />
          <DateSelectionStep
            nextStepHandler={nextStepHandler}
            activeDay={activeDay}
          />
        </div>
      )}
      {currentStep === 2 && router.has("date") && !router.has("time") && (
        <div>
          <h2 style={headerStyle}>Choose Available Time</h2>
          <hr style={hrStyle} />
          <TimeSelectionStep timeSlots={timeSlots} takenTimes={takenTimes} session={session} />
        </div>
      )}
      {currentStep === 3 && router.has("time") && (
        <div>
          <h2 style={headerStyle}>Confirm Booking Details</h2>
          <hr style={hrStyle} />
          <ConfirmationStep events={events} session={session} />
        </div>
      )}
    </div>
  );
}

export default BookingInfo;
