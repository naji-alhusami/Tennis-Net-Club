import React, { useContext } from "react";

import { useSession } from "next-auth/react";

import BookingCourt from "@/components/booking/booking";
// import { generateTimeSlots } from "@/components/booking/generate-times";
import AuthContext from "@/store/auth-context";

function BookingPage() {
  const { currentStep } = useContext(AuthContext);
  const { data: session, status: loading } = useSession();
  console.log(currentStep);
  if (loading === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    console.log("User not authenticated");
    return <p>Please log in to access this feature.</p>;
  }

  return (
    <div>
      <BookingCourt session={session} />
    </div>
  );
}

export default BookingPage;
