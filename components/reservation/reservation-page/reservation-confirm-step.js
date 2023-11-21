// "use client";
// import React, { useContext, useEffect, useRef } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { useAnimation, useInView } from "framer-motion";
// import { BsArrowLeft } from "react-icons/bs";
// import { AiOutlineCalendar } from "react-icons/ai";
// import { FaRegClock } from "react-icons/fa6";

// import AuthContext from "@/store/auth-context";
// import { sendTakenTimesToMongo } from "@/lib/takenTimes/sendTakenTimesToMongo";
// import classes from "./reservation-confirm-step.module.css";

// function ConfirmationStep({ searchParams, session }) {
//   const { selectedTime, setCurrentStep } = useContext(AuthContext);
//   const router = useRouter();
//   // console.log(searchParams.time === selectedTime);
  
//   async function bookingConfirmationHandler(event) {
//     event.preventDefault();

//     const member = session?.user.name;
//     const selectedCourtType = searchParams.court;
//     const selectedPlayersNumber = searchParams.players;
//     const selectedDate = searchParams.date;
//     const timeFromLink = searchParams.time;

//     const [hours, minutes] = timeFromLink.split(":");
//     const year = new Date(selectedDate).getFullYear();
//     const month = new Date(selectedDate).getMonth();
//     const day = new Date(selectedDate).getDate();
//     const startedTime = new Date(year, month, day, hours, minutes);

//     try {
//       await sendTakenTimesToMongo(
//         member,
//         selectedCourtType,
//         selectedPlayersNumber,
//         selectedDate,
//         timeFromLink,
//         startedTime
//       );
//     } catch (error) {
//       return;
//     }

//     setCurrentStep(1);
//     router.push("/thanks?thanks=Your Court Is Reserved");
//   }

//   // Motion
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });
//   const mainControls = useAnimation();
//   useEffect(() => {
//     if (isInView) mainControls.start("visible");
//   }, [isInView, mainControls]);

//   const prevPath = `/reservation?date=${searchParams.date}&court=${searchParams.court}&players=${searchParams.players}`;

//   useEffect(() => {
//     if (!(searchParams.time === selectedTime)) {
//       router.replace("/reservation");
//       setCurrentStep(1);
//     }
//   }, [searchParams.time, selectedTime]);

//   return (
//     <form
//       onSubmit={bookingConfirmationHandler}
//       className={classes.confirmContainer}
//     >
//       <motion.div
//         variants={{
//           hidden: { opacity: 0, y: -75 },
//           visible: { opacity: 1, y: 0 },
//         }}
//         initial="hidden"
//         animate={mainControls}
//         transition={{ duration: 0.3 }}
//         ref={ref}
//         className={classes.tableContainer}
//       >
//         <table>
//           <thead className={classes.firstLine}>
//             <tr>
//               <th>Name</th>
//               <th>Court</th>
//               <th>Players</th>
//               <th>
//                 <AiOutlineCalendar />
//               </th>
//               <th>
//                 <FaRegClock />
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className={classes.info}>
//               <td className={classes.events}>
//                 <h4>{session?.user.name}</h4>
//               </td>
//               <td>{searchParams.court}</td>
//               <td>{searchParams.players}</td>
//               <td>{searchParams.date}</td>
//               <td>{searchParams.time}</td>
//             </tr>
//           </tbody>
//         </table>
//       </motion.div>

//       <div className={classes.buttonContainer}>
//         <Link
//           href={prevPath}
//           onClick={() => prevStepHandler()}
//           className={classes.backButton}
//         >
//           <BsArrowLeft style={{ marginRight: "1rem" }} /> Back
//         </Link>
//         <button className={classes.confirmButton} type="submit">
//           Confirm
//         </button>
//       </div>
//     </form>
//   );
// }

// export default ConfirmationStep;
