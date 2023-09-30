import React from "react";

import { useSession } from "next-auth/react";

import BookingCourt from "@/components/booking/booking";

function BookingPage() {
  const { data: session, status: loading } = useSession();

  if (loading === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    console.log("User not authenticated");
    return <p>Please log in to access this feature.</p>;
  }

  return (
    <section>
      <BookingCourt session={session} />
    </section>
  );
}

export default BookingPage;
