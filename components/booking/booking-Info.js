"use client";
import React, { useContext } from "react";
import { useSearchParams } from "next/navigation";

import DateSelectionStep from "./booking-date-step";
import AuthContext from "@/store/auth-context";
import TimeSelectionStep from "./booking-times-step";
import ConfirmationStep from "./booking-confirm-step";

function BookingInfo({ timeSlots }) {
  const router = useSearchParams();
  const { currentStep, activeDay, nextStepHandler, prevStepHandler } =
    useContext(AuthContext);

  return (
    <div>
      {currentStep === 1 && (
        <div>
          <h2>Choose Court Type, Players Number and Date:</h2>{" "}
          <DateSelectionStep
            nextStepHandler={nextStepHandler}
            activeDay={activeDay}
          />
        </div>
      )}
      {currentStep === 2 && router.has("date") && !router.has("time") && (
        <div>
          <h2>Choose Available Time:</h2>
          <TimeSelectionStep timeSlots={timeSlots} />
        </div>
      )}
      {currentStep === 3 && router.has("time") && (
        <div>
          <h2 style={{ textAlign: "center" }}>Confirm Booking Details:</h2>
          <ConfirmationStep />
        </div>
      )}
    </div>
  );
}

export default BookingInfo;
