// import React, { useState } from "react";

// import classes from "./reservation-times-step.module.css";

// const RenderReservationButton = ({
//   timeSlot,
//   timeSlots,
//   setNewTimeSlots,
//   setSelectedTime,
// }) => {
//   const [hoveredTimeSlot, setHoveredTimeSlot] = useState(null);

//   // Set the the new status to the newTimeSlots
//   function timeHandler(timeSlot) {
//     if (timeSlot.status === "BOOK COURT") {
//       // Find the currently selected time slot (if any)
//       const currentlySelectedTimeSlot = timeSlots.find(
//         (slot) => slot.status === "SELECTED"
//       );

//       // Update the selected time and change the status
//       const timeSlotsStatus = timeSlots.map((slot) => {
//         if (slot.id === timeSlot.id) {
//           return { ...slot, status: "SELECTED" };
//         } else if (
//           currentlySelectedTimeSlot &&
//           slot.id === currentlySelectedTimeSlot.id
//         ) {
//           // Deselect the previously selected time slot
//           return { ...slot, status: "BOOK COURT" };
//         }
//         return slot;
//       });
//       setNewTimeSlots(timeSlotsStatus);
//       setSelectedTime(timeSlot.time);
//     }
//   }

//   const handleMouseEnter = (timeSlot) => {
//     setHoveredTimeSlot(timeSlot);
//   };

//   const handleMouseLeave = () => {
//     setHoveredTimeSlot(null);
//   };

//   if (timeSlot.status === "PASSED TIME") {
//     return <p className={classes.booked}>PASSED TIME</p>;
//   } else if (timeSlot.status === "RESERVED") {
//     return <p className={classes.booked}>RESERVED</p>;
//   } else if (timeSlot.status === "NOT OPENED") {
//     return <p className={classes.booked}>NOT OPENED</p>;
//   } else {
//     let buttonText;
//     if (timeSlot.status === "SELECTED") {
//       buttonText = "SELECTED";
//     } else if (timeSlot === hoveredTimeSlot) {
//       buttonText = "SELECT TIME";
//     } else {
//       buttonText = "BOOK COURT";
//     }

//     return (
//       <p
//         className={
//           timeSlot.status === "SELECTED"
//             ? classes.selected
//             : timeSlot === hoveredTimeSlot
//             ? classes.hovered
//             : classes.book
//         }
//         onMouseEnter={() => handleMouseEnter(timeSlot)}
//         onMouseLeave={handleMouseLeave}
//         onClick={() => timeHandler(timeSlot)}
//       >
//         {buttonText}
//       </p>
//     );
//   }
// };

// export default RenderReservationButton;
