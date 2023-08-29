import React, { Fragment } from "react";
import Image from "next/image";

import MainNavigation from "../layout/main-navigation";
import background from "@/public/images/background.jpg";
import classes from "./starting.module.css";
import Button from "../ui/button";
import Link from "next/link";

import { RightArrow } from "../icons/right-arrow";

function starting() {
  return (
    <Fragment>
      <section className={classes.starting}>
        <MainNavigation />
        <div className={classes.image}>
          <Image src={background} alt="website background" />
        </div>
        <div className={classes.startingText}>
          <h1>Hi</h1>
          <h2>Join Our Legacy of Tennis Enthusiasts</h2>
          <p>
            Whether you are a novice eager to learn, a competitor hungry for
            victory, or a fan of the game, we invite you to join us in this
            journey. The court is set, the ball is in your court. come be a part
            of TENNIS NET Club.
          </p>
          <Link href="/signup">
            <Button>
              Become A Member
              <RightArrow />
            </Button>
          </Link>
        </div>
      </section>
    </Fragment>
  );
}

export default starting;
