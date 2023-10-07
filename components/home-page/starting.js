import React, { Fragment } from "react";
import Image from "next/image";
import background from "@/public/images/background.jpg";
import Button from "../ui/button";
import Link from "next/link";
import { RightArrow } from "../icons/right-arrow";
import classes from "./starting.module.css";

function Starting() {
  return (
    <Fragment>
      <div className={classes.starting}>
        <div
          className={classes.imageContainer}
          style={{ filter: "brightness(0.9)" }}
        >
          <Image
            src={background}
            alt="website background"
            // height={500}
            // width={1500}
            // layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
        <div className={classes.startingText}>
          <h1>Hi</h1>
          <h2>Join Our Legacy of Tennis Enthusiasts</h2>
          <p>
            Whether you are a novice eager to learn, a competitor hungry for
            victory, or a fan of the game, we invite you to join us in this
            journey. The court is set, the ball is in your court. Come be a part
            of TENNIS NET Club.
          </p>
          <Link href="/auth/signup">
            <Button>
              Become A Member
              <RightArrow />
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Starting;
