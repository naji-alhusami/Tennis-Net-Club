// import React, { Suspense } from "react";
// import Image from "next/image";

// import { deleteReservedTimesActions } from "@/actions/deleteReservedTimesActions";
// import ManageBooking from "@/components/manage/manage-reservations";
// import Headers from "@/components/ui/headers";
// import LoadingData from "@/components/ui/loading-data";
// import manage from "@/public/images/manage.jpg";
// import classes from "@/components/manage/manage-reservations.module.css";

// async function cancelReservedTimeHandler(timeSlot) {
//   "use server";
//   await deleteReservedTimesActions(timeSlot);
// }

// export const metadata = {
//   title: "Manage Bookings",
//   description: "Manage your booking courts with Tennis Net Club",
// };

// function ManageReservationPage() {
//   return (
//     <div className={classes.manageContainer}>
//       <div className={classes.imageContainer}>
//         <Image src={manage} alt="book-course" priority="true" property="true" />
//       </div>
//       <div className={classes.text}>
//         <Headers
//           H3Header=""
//           H1Header=""
//           H2Header="Manage Reserved Times"
//           PHeader="Change OR Cancel Your Booking"
//         />
//       </div>
//       <Suspense fallback={<LoadingData />}>
//         <ManageBooking cancelReservedTimeHandler={cancelReservedTimeHandler} />
//       </Suspense>
//     </div>
//   );
// }

// export default ManageReservationPage;
