import React, { Fragment } from "react";
import Image from "next/image";
import background from "@/public/images/background.jpg";
import Button from "../ui/button";
import Link from "next/link";
import { RightArrow } from "../icons/right-arrow";
import classes from "./starting.module.css";
import { useSession } from "next-auth/react";

function Starting() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <Fragment>
      <div className={classes.starting}>
        <div
          className={classes.imageContainer}
          style={{ filter: "brightness(0.7)" }}
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
          {session ? (
            <h2>Welcome to our TENNIS NET Club</h2>
          ) : (
            <h2>Join Our Legacy of Tennis Enthusiasts</h2>
          )}
          {session ? (
            <p>
              Go now and book your training session. If you are a good player
              and you want to play with your friend, you can book a court. If
              you are looking for a partner, you can find your partner in our
              club.
            </p>
          ) : (
            <p>
              Whether you are a novice eager to learn, a competitor hungry for
              victory, or a fan of the game, we invite you to join us in this
              journey. The court is set, the ball is in your court. Come be a
              part of TENNIS NET Club.
            </p>
          )}
          {session ? (
            <Link href="/booking">
              <Button>
                Check My Calendar Events
                <RightArrow />
              </Button>
            </Link>
          ) : (
            <Link href="/auth/signup">
              <Button>
                Become A Member
                <RightArrow />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Starting;
