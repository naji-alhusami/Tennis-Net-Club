"use client";
import React, { useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";

// import DateSelectionStep from "./booking-date-step";
// import TimeSelectionStep from "./booking-times-step";
// import ConfirmationStep from "./booking-confirm-step";
import classes from "./booking.module.css";
import BookingSteps from "./booking-steps";
import DateSelectionStep from "./booking-date-step";
import BookingContainer from "./booking-container";
import AuthContext from "@/store/auth-context";
import TimeSelectionStep from "./booking-times-step";
import ConfirmationStep from "./booking-confirm-step";
// import { sendTakenTimesToMongo } from "@/lib/sendTakenTimes";

function BookingCourt({ session }) {
  const router = useSearchParams();
  console.log(router.has("date"));
  console.log(router.has("time"));
  const { currentStep } = useContext(AuthContext);
  // useEffect(() => {
  //   console.log(currentStep);
  // }, []);

  //   const [selectedCourtType, setSelectedCourtType] = useState("Clay Courts");
  //   const [isShowCourts, setIsShowCourts] = useState(false);

  //   async function reserveHandler(event) {
  //     event.preventDefault();
  //     console.log("click on confirm");
  //     if (timeInfo) {
  //       console.log(timeInfo);
  //       await sendTakenTimesToMongo(timeInfo);
  //     }
  //   }

  //   const courtTypeImages = {
  //     "Clay Courts": "/images/clay.jpg",
  //     "Hard Courts": "/images/hard.jpg",
  //   };

  //   const handleChangeCourts = () => {
  //     setSelectedCourtType((prevCourtType) =>
  //       prevCourtType === "Clay Courts" ? "Hard Courts" : "Clay Courts"
  //     );

  //     setIsShowCourts(false);
  //   };

  return (
    <div className={classes.bookingContainer}>
      <BookingContainer />
      <BookingSteps />

      {/* <form onSubmit={reserveHandler}></form> */}
      {/* {currentStep === 1 && router === "/booking" && <DateSelectionStep />} */}
      {currentStep === 1 && <DateSelectionStep />}
      {currentStep === 2 && router.has("date") && !router.has("time") && (
        <TimeSelectionStep />
      )}
      {currentStep === 3 && router.has("time") && <ConfirmationStep />}
    </div>
  );
}
export default BookingCourt;

//       {/* Booking Form (Players and Calendar) */}
//       <form onSubmit={reserveHandler}>
//         {currentStep === 1 ? (
//           <DateSelectionStep
//             handleChangeCourts={handleChangeCourts}
//             selectedCourtType={selectedCourtType}
//             courtTypeImages={courtTypeImages}
//             nextStepHandler={nextStepHandler}
//             isShowCourts={isShowCourts}
//             setIsShowCourts={setIsShowCourts}
//           />
//         ) : currentStep === 2 ? (
//           <TimeSelectionStep
//             nextStepHandler={nextStepHandler}
//             prevStepHandler={prevStepHandler}
//           />
//         ) : currentStep === 3 ? (
//           <div>
//             <ConfirmationStep
//               session={session}
//               selectedCourtType={selectedCourtType}
//               courtTypeImages={courtTypeImages}
//               prevStepHandler={prevStepHandler}
//             />
//             <motion.div
//               className={classes.bookButton}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <button type="submit">Confirm</button>
//             </motion.div>
//           </div>
//         ) : null}
//       </form>
//     </div>
//   );
// }

// export default BookingCourt;
