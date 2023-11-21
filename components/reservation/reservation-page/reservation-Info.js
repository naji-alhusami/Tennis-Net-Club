// import React from "react";
// import { getServerSession } from "next-auth";

// import DateSelectionStep from "./reservation-date-step";
// import TimeSelectionStep from "./reservation-times-step";
// import ConfirmationStep from "./reservation-confirm-step";
// import { fetchTimeSlots } from "@/lib/generate-times";
// import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";
// import { fetchEventsFromMongo } from "@/lib/events/fetchEventsFromMongo";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// async function ReservationInfo({ searchParams }) {
//   const newDate = searchParams.date;
//   const newCourt = searchParams.court;
//   const timeSlots = await fetchTimeSlots(newDate, newCourt);
//   const takenTimes = await fetchTakenTimesFromMongo();
//   const events = await fetchEventsFromMongo();
//   const session = await getServerSession(authOptions);

//   return (
//     <div>
//       {Object.keys(searchParams).length === 0 && (
//         <div>
//           <DateSelectionStep />
//         </div>
//       )}
//       {searchParams.date && searchParams.court && !searchParams.time && (
//         <div>
//           <TimeSelectionStep
//             searchParams={searchParams}
//             session={session}
//             timeSlots={timeSlots}
//             takenTimes={takenTimes.data}
//           />
//         </div>
//       )}
//       {searchParams.date && searchParams.court && searchParams.time && (
//         <div>
//           <ConfirmationStep
//             events={events}
//             session={session}
//             searchParams={searchParams}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ReservationInfo;
