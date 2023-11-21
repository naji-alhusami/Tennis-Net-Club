// "use server";
// import React, { Fragment } from "react";
// import { getServerSession } from "next-auth";

// import ManageBookingForm from "./manage-reservation-form";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";

// async function ManageReservations({ cancelReservedTimeHandler }) {
//   const session = await getServerSession(authOptions);
//   const takenTimes = await fetchTakenTimesFromMongo();
//   const filteredTakenTimes = takenTimes.data.filter(
//     (takenTime) => takenTime.member === session?.user.name
//   );

//   return (
//     <Fragment>
//       {!filteredTakenTimes.length > 0 ? (
//         <p>You Do Not Have Reserved Times</p>
//       ) : (
//         <ManageBookingForm
//           cancelReservedTimeHandler={cancelReservedTimeHandler}
//           filteredTakenTimes={filteredTakenTimes}
//         />
//       )}
//     </Fragment>
//   );
// }

// export default ManageReservations;
