import ManageBooking from "@/components/manage/manage-booking";
import { fetchTakenTimesFromMongo } from "@/lib/takenTimes/fetchTakenTimesFromMongo";
import React from "react";

async function ManageBookingPage() {
  const takenTimes = await fetchTakenTimesFromMongo();
  return <ManageBooking takenTimes={takenTimes} />;
}

export default ManageBookingPage;
