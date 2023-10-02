import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { AiFillCaretDown } from "react-icons/ai";
import { motion } from "framer-motion";

import Logo from "./logo";

import classes from "./main-navigation.module.css";
import Image from "next/image";
import navbar from "../../components/icons/navbar.svg";
import cancelNavbar from "../../components/icons/cancelNavbar.svg";

function MainNavigation(props) {
  const [isToggled, setIsToggled] = useState(false);
  const { backgroundColor } = props;
  const { data: session, loading } = useSession();

  function logoutHandler() {
    signOut();
  }

  function toggleButtonHandler() {
    setIsToggled(!isToggled);
    console.log("clicked");
  }

  const headerStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <header className={classes.header} style={headerStyle}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul className={classes.ul}>
          {/* Large Screens */}
          <li>
            <Link className={classes.navbarListHome} href="/">
              Home
            </Link>
          </li>
          {session && (
            <li>
              <Link className={classes.navbarListBook} href="/">
                Book Court
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link className={classes.navbarListPartner} href="/">
                Find Partner
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link className={classes.navbarListTraining} href="/">
                Trainings
              </Link>
            </li>
          )}
          <li>
            <Link className={classes.navbarListBlogs} href="/posts">
              Blogs
            </Link>
          </li>
          <li>
            <Link className={classes.navbarListContact} href="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className={classes.navbarListAbout} href="/about">
              About
            </Link>
          </li>

          {/* Med Screens */}
          {!session && (
            <li>
              <Link className={classes.navbarListHomeMed} href="/">
                Home
              </Link>
            </li>
          )}
          {!session && (
            <li>
              <Link className={classes.navbarListBlogsMed} href="/">
                Blogs
              </Link>
            </li>
          )}
          {!session && (
            <li>
              <Link className={classes.navbarListContactMed} href="/">
                Contact
              </Link>
            </li>
          )}
          {!session && (
            <li>
              <Link className={classes.navbarListAboutMed} href="/">
                About
              </Link>
            </li>
          )}
          <li>
            {!session && !loading && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={classes.login}
              >
                <Link className={classes.loginButton} href="/auth/login">
                  Login
                </Link>
              </motion.div>
            )}
          </li>
          <li>
            {session && (
              <motion.div whileHover={{ scale: 1.1 }} className={classes.user}>
                <div className={classes.userName}>
                  {session?.user.name}{" "}
                  <AiFillCaretDown className={classes.icon} />
                  <Link
                    className={classes.list}
                    href="/"
                    onClick={logoutHandler}
                  >
                    <div className={classes.userList}>Logout</div>
                  </Link>
                </div>
              </motion.div>
            )}
          </li>
          <li>
            <div
              className={`${classes.navbarToggleContainer} ${
                isToggled ? `${classes.change}` : ""
              }`}
              onClick={toggleButtonHandler}
            >
              <div className={classes.line1}></div>
              <div className={classes.line2}></div>
              <div className={classes.line3}></div>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
