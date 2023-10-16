import React from "react";
import { useParams } from "next/navigation";
import BookingCourt from "@/components/booking/booking";

function BookingPage() {
  return (
    <div>
      <BookingCourt />
    </div>
  );
}

export default BookingPage;
