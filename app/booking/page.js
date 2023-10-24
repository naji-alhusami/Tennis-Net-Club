"use client";

import React from "react";
import { useParams } from "next/navigation";
import BookingCourt from "@/components/booking/booking";
import { useSession } from "next-auth/react";

function BookingPage() {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/auth/signin?callbackUrl=/booking");
  //   },
  // });

  return (
    <div>
      <BookingCourt />
    </div>
  );
}

export default BookingPage;
