// "use client";
// import React, {
//   Fragment,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { motion, useAnimation, useInView } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// import AuthContext from "@/store/auth-context";
// import BookingCalendar from "./reservation-calendar";
// import { RightArrow } from "../../icons/right-arrow";
// import clay from "@/public/images/clay.jpg";
// import hard from "@/public/images/hard.jpg";
// import classes from "./reservation-date-step.module.css";

// const DateSelectionStep = () => {
//   const [selectedCourtType, setSelectedCourtType] = useState("");
//   const { activeDay, nextStepHandler, numberOfPlayers, setNumberOfPlayers } =
//     useContext(AuthContext);

//   // Set the date: "2023-11-05"
//   let formattedDate = null;
//   if (activeDay) {
//     const day = activeDay.getDate().toString().padStart(2, "0"); // Output: "05" or "09"
//     const month = activeDay.getMonth() + 1;
//     const year = activeDay.getFullYear();
//     formattedDate = `${year}-${month}-${day}`; // Output: "2023-11-05"
//   }

//   // Motion for select players number and court type:
//   const selectRef = useRef(null);
//   const isInViewSelesction = useInView(selectRef, { once: true });
//   const selectionControls = useAnimation();
//   useEffect(() => {
//     if (isInViewSelesction) selectionControls.start("visible");
//   }, [isInViewSelesction, selectionControls]);

//   // Motion for image:
//   const imageRef = useRef(null);
//   const isInViewImage = useInView(imageRef, { once: true });
//   const imageControls = useAnimation();
//   useEffect(() => {
//     if (isInViewImage) imageControls.start("visible");
//   }, [isInViewImage, imageControls]);

//   // Motion for calendar:
//   const calendarRef = useRef(null);
//   const isInViewCalendar = useInView(calendarRef, {
//     once: true,
//   });
//   const calendarControls = useAnimation();
//   useEffect(() => {
//     if (isInViewCalendar) calendarControls.start("visible");
//   }, [isInViewCalendar, calendarControls]);

//   // Link for the next step:
//   const nextPath = `/reservation/?date=${formattedDate}&court=${selectedCourtType}&players=${numberOfPlayers}`;

//   return (
//     <Fragment>
//       <div className={classes.firstStepContainer}>
//         <motion.div
//           variants={{
//             hidden: { opacity: 0, y: 75 },
//             visible: { opacity: 1, y: 0 },
//           }}
//           initial="hidden"
//           animate={selectionControls}
//           transition={{ duration: 0.3, delay: 0.4 }}
//           ref={selectRef}
//           className={classes.playersAndCourtContainer}
//         >
//           <select
//             value={selectedCourtType}
//             onChange={(e) => setSelectedCourtType(e.target.value)}
//             required
//           >
//             <option value="">--- Select Court Type ---</option>
//             <option value="Clay">Clay Court</option>
//             <option value="Hard">Hard Court</option>
//           </select>
//           <select
//             value={numberOfPlayers}
//             onChange={(e) => setNumberOfPlayers(e.target.value)}
//             required
//           >
//             <option value="">--- Select Players Number ---</option>
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//           </select>
//         </motion.div>
//         <div className={classes.dateContainer}>
//           <motion.div
//             variants={{
//               hidden: { opacity: 0, x: -75 },
//               visible: { opacity: 1, x: 0 },
//             }}
//             initial="hidden"
//             animate={imageControls}
//             transition={{ duration: 0.3, delay: 0.4 }}
//             ref={imageRef}
//             className={classes.imageContainer}
//           >
//             {selectedCourtType === "Clay" ? (
//               <Image src={clay} alt="clay-court" priority={true} />
//             ) : (
//               <Image
//                 src={hard}
//                 alt="hard-court"
//                 width={500}
//                 height={400}
//                 priority={true}
//               />
//             )}
//           </motion.div>
//           <motion.div
//             variants={{
//               hidden: { opacity: 0, x: 75 },
//               visible: { opacity: 1, x: 0 },
//             }}
//             initial="hidden"
//             animate={calendarControls}
//             transition={{ duration: 0.3, delay: 0.4 }}
//             ref={calendarRef}
//           >
//             <BookingCalendar nextStepHandler={nextStepHandler} />
//           </motion.div>
//         </div>
//         <div className={classes.buttonContainer}>
//           {activeDay && selectedCourtType !== "" && numberOfPlayers !== "" ? (
//             <Link
//               href={nextPath}
//               className={classes.nextButton}
//               style={{ color: "white" }}
//               onClick={() => nextStepHandler()}
//             >
//               Next <RightArrow />
//             </Link>
//           ) : (
//             <div className={classes.nextButtonDisabled}>
//               Next <RightArrow />
//             </div>
//           )}
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default DateSelectionStep;
