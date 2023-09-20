import React from "react";

import { useSession } from "next-auth/react";

import BookingCourt from "@/components/booking/booking";

function Booking() {
  const { data: session, status: loading } = useSession();

  console.log(loading);
  if (loading === "loading") {
    console.log("Loading...");
    return <p>Loading...</p>;
  }

  if (!session) {
    console.log("User not authenticated");
    // Handle cases where the user is not authenticated, e.g., show a login button.
    return <p>Please log in to access this feature.</p>;
  }

  return (
    <section>
      <BookingCourt session={session} />
    </section>
  );
}

export default Booking;
