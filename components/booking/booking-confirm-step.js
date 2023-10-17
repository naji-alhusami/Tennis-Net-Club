import React, { useContext } from "react";
import Image from "next/image";
// import { motion } from "framer-motion";

// import AuthContext from "@/store/auth-context";
import clay from "@/public/images/clay.jpg";
import hard from "@/public/images/hard.jpg";
import classes from "./booking-confirm-step.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
// import { useSession } from "next-auth/react";

function ConfirmationStep() {
  // const { data: session } = useSession();
  const router = useRouter();
  const pathData = useSearchParams();

  async function bookingConfirmationHandler(event) {
    event.preventDefault();

    const selectedCourtType = pathData.get("court");
    const selectedPlayersNumber = pathData.get("players");
    const selectedDate = pathData.get("date");
    const selectedTime = pathData.get("time");
    console.log(selectedDate);
    // const formattedActiveDay = activeDay.toISOString();
    // console.log(formattedActiveDay);
    try {
      const response = await fetch("/api/insertTakenTimes", {
        method: "POST",
        body: JSON.stringify({
          selectedCourtType,
          selectedPlayersNumber,
          selectedDate,
          selectedTime,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log("Error", error.message);
    }

    router.push("/");
  }

  return (
    <form
      onSubmit={bookingConfirmationHandler}
      className={classes.confirmContainer}
    >
      <div className={classes.bookingDetailsContainer}>
        {pathData.get("court") === "Clay" ? (
          <Image src={clay} alt="clay-court" priority={true} />
        ) : (
          <Image src={hard} alt="hard-court" priority={true} />
        )}
      </div>
      <div className={classes.bookingDetails}>
        <table className={classes.tableContainer}>
          <tbody>
            <tr>
              {/* <th>Name</th> */}
              <th>Court</th>

              <th>Players</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
            <tr>
              {/* <td>{session.user.name}</td> */}
              <td>{pathData.get("court")} Court</td>
              <td>{pathData.get("players")}</td>
              <td>{pathData.get("date")}</td>
              <td>{pathData.get("time")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={classes.buttonContainer}>
        <Link
          href={`/booking?date=${pathData.get("date")}&court=${pathData.get(
            "court"
          )}&players=${pathData.get("players")}`}
          onClick={() => prevStepHandler()}
          className={classes.backButton}
        >
          <BsArrowLeft style={{ marginRight: "1rem" }} /> Back
        </Link>
        <button className={classes.confirmButton} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default ConfirmationStep;
