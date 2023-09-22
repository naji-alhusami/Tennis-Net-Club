import React from "react";

import { useSession } from "next-auth/react";

import BookingCourt from "@/components/booking/booking";
import { fetchDataFromMongo } from "@/lib/fetchTimeSlots";

function BookingPage(props) {
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
      <BookingCourt session={session} timeSlots={props.timeSlots} />
    </section>
  );
}

export async function getStaticProps() {
  const dataFromMongo = await fetchDataFromMongo();
  console.log(dataFromMongo);

  return {
    props: {
      timeSlots: dataFromMongo.data,
    },
    revalidate: 5,
  };
}

export default BookingPage;
