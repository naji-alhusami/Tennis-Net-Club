import React, { useContext } from "react";

import { useSession } from "next-auth/react";
import TimeSelectionStep from "@/components/booking/booking-times-step";
import AuthContext from "@/store/auth-context";
import { CurrencyBitcoin } from "@mui/icons-material";

function BookingPage() {
  const { cuurrentStep } = useContext(AuthContext);
  const { data: session, status: loading } = useSession();
  console.log(cuurrentStep);
  if (loading === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    console.log("User not authenticated");
    return <p>Please log in to access this feature.</p>;
  }

  return (
    <section>
      <TimeSelectionStep />
    </section>
  );
}

export default BookingPage;
