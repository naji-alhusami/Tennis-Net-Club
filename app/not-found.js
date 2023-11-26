import Image from "next/image";
import Link from "next/link";
// import { motion } from "framer-motion";

import errorImg from "@/public/images/error.jpg";
import Button from "@/components/ui/button";
import { RightArrow } from "@/components/icons/right-arrow";
import classes from "./not-found.module.css";
import Equipments from "@/components/equipments/equipments";

export default function NotFound() {
  return (
    <>
      <div className={classes.starting}>
        <div
          className={classes.imageContainer}
          style={{ filter: "brightness(0.7)" }}
        >
          <Image src={errorImg} alt="error-bf" priority={true} />
        </div>
        <div
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.3, delay: 0.1 }}
          className={classes.startingText}
        >
          {/* <h2>Hi</h2> */}
          <h2>Something Went Wrong</h2>
          {/* <motion.h1>{errorMessage}</motion.h1> */}
          <Link href="/">
            <Button>
              Back To Home
              <RightArrow />
            </Button>
          </Link>
        </div>
      </div>
      <Equipments />
    </>
  );
}
