"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { AiFillCaretDown } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
// import { getServerSession } from "next-auth";

import Logo from "./logo";

import classes from "./main-navigation.module.css";

function MainNavigation(props) {
  const [isToggled, setIsToggled] = useState(false);
  const [showSideNavbar, setShowSideNavbar] = useState(false);
  const [showUserLogout, setShowUserLogout] = useState(false);
  const { backgroundColor } = props;
  const { data: session, status } = useSession();
  // console.log(session);
  function showUserLogoutHandler() {
    setShowUserLogout(!showUserLogout);
  }

  function logoutHandler() {
    signOut();
    setShowUserLogout(false);
  }

  function toggleButtonHandler() {
    setIsToggled(!isToggled);
    setShowSideNavbar(!showSideNavbar);
  }

  const headerStyle = {
    backgroundColor: backgroundColor,
  };

  if (status === "loading") {
    return;
  }

  return (
    <div className={classes.container}>
      <header className={classes.header} style={headerStyle}>
        <Link href="/">
          <Logo />
        </Link>
        <nav>
          <ul className={classes.ul}>
            {/* Large Screens */}
            {session && (
              <li className={classes.navbarList}>
                <Link href="/booking">Book Court</Link>
              </li>
            )}
            {session && (
              <li className={classes.navbarList}>
                <Link href="/manage">Manage Bookings</Link>
              </li>
            )}
            {session && (
              <li className={classes.navbarList}>
                <Link href="/partner">Find Partner</Link>
              </li>
            )}
            {session && (
              <li className={classes.navbarList}>
                <Link href="/training">Trainings</Link>
              </li>
            )}
            <li>
              {session ? (
                <div className={classes.user} onClick={showUserLogoutHandler}>
                  <div className={classes.userName}>
                    {session?.user.name}{" "}
                    <AiFillCaretDown className={classes.icon} />
                    {showUserLogout && (
                      <div className={classes.userContainer}>
                        <Link
                          className={classes.list}
                          href="/auth/addExtraInfo"
                        >
                          <div>Edit Account</div>
                        </Link>
                        <Link
                          className={classes.list}
                          href="/"
                          onClick={logoutHandler}
                        >
                          <div>Logout</div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={classes.login}
                >
                  {!session && (
                    <Link className={classes.loginButton} href="/auth/signin">
                      Login
                    </Link>
                  )}
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
      <AnimatePresence>
        {showSideNavbar && (
          <motion.div
            className={`${classes.sideNavbarContainer} ${
              showSideNavbar ? `${classes.show}` : ""
            }`}
            transition={{ duration: 0.5 }}
            initial={{ x: showSideNavbar ? "100%" : "0%" }}
            animate={{ x: showSideNavbar ? "0%" : "100%" }}
            exit={{ x: "100%" }}
          >
            <ul className={classes.ulSmallScreen}>
              {/* Small Screens */}
              <li onClick={toggleButtonHandler}>
                <Link href="/">Home</Link>
              </li>
              {session && (
                <li onClick={toggleButtonHandler}>
                  <Link href="/booking">Book Court</Link>
                </li>
              )}
              {session && (
                <li onClick={toggleButtonHandler}>
                  <Link href="/booking">Manage Bookings</Link>
                </li>
              )}
              {session && (
                <li onClick={toggleButtonHandler}>
                  <Link href="/partner">Find Partner</Link>
                </li>
              )}
              <li onClick={toggleButtonHandler}>
                <Link href="/training">Trainings</Link>
              </li>
              <li onClick={toggleButtonHandler}>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MainNavigation;
