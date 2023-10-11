import React, { useEffect, useContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import classes from "./booking-steps.module.css";
import AuthContext from "@/store/auth-context";

function BookingSteps() {
  const { currentStep } = useContext(AuthContext);
  console.log(currentStep);
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   const url = `${pathname}?${searchParams}`;
  //   console.log(url);
  //   console.log(pathname);
  //   console.log(searchParams);
  // }, [pathname, searchParams]);

  return (
    <div className={classes.stepsContainer}>
      <div className={classes.stepContainer}>
        <div
          className={`${classes.stepsCircle} ${
            currentStep === 1 ? classes.selectStep : ""
          }`}
        >
          1
        </div>
        <h3>SELECT DATE</h3>
      </div>
      <div className={classes.stepContainer}>
        <div
          className={`${classes.stepsCircle} ${
            currentStep === 2 ? classes.detailsStep : ""
          }`}
        >
          2
        </div>
        <h3>SELECT TIME</h3>
      </div>
      <div className={classes.stepContainer}>
        <div
          className={`${classes.stepsCircle} 
        ${currentStep === 3 ? classes.confirmStep : ""}
        `}
        >
          3
        </div>
        <h3>CONFIRM DETAILS</h3>
      </div>
    </div>
  );
}

export default BookingSteps;
