import React, { useContext } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import AuthContext from "@/store/auth-context";
import clay from "@/public/images/clay.jpg";
import hard from "@/public/images/hard.jpg";
import classes from "./booking-confirm-step.module.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { useSession } from "next-auth/react";

function ConfirmationStep() {
  const { data: session } = useSession();
  const pathData = useSearchParams();

  return (
    <div className={classes.confirmContainer}>
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
              <th>Name</th>
              <th>Court</th>

              <th>Players</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
            <tr>
              <td>{session.user.name}</td>
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
        {/* <Link
          href={`/booking/?date=${router.get("date")}&court=${pathData.get(
            "court"
          )}&players=${pathData.get("players")}`}
          onClick={() => nextStepHandler()}
          className={classes.nextButton}
          style={{ color: "white" }}
        >
          Next <BsArrowRight style={{ marginLeft: "1rem" }} />
        </Link> */}

        <button
          className={classes.confirmButton}
          // onClick={() => router.push("/booking")}
          onClick={() => console.log("/booking")}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmationStep;
