"use client";
import React, { useContext } from "react";
import { useSearchParams } from "next/navigation";

import DateSelectionStep from "./booking-date-step";
import AuthContext from "@/store/auth-context";

function BookingInfo() {
  const router = useSearchParams();
  const { currentStep, nextStepHandler, prevStepHandler } =
    useContext(AuthContext);

  return (
    <div>
      {currentStep === 1 && (
        <div>
          <h2>Choose Court Type, Players Number and Date:</h2>{" "}
          <DateSelectionStep />
        </div>
      )}
    </div>
  );
}

export default BookingInfo;
