import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { AiFillCaretDown } from "react-icons/ai";
import { motion } from "framer-motion";

import Logo from "./logo";

import classes from "./main-navigation.module.css";

function MainNavigation(props) {
  const { backgroundColor } = props;
  const { data: session, loading } = useSession();


  function logoutHandler() {
    signOut();
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
          <li>
            <Link className={classes.navbarList} href="/">
              Home
            </Link>
          </li>
          {/* {session && (
            <li>
              <Link href="/">Book Court</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/">Trainings</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/">Find Partner</Link>
            </li>
          )} */}
          <li>
            <Link className={classes.navbarList} href="/posts">
              Blogs
            </Link>
          </li>
          <li>
            <Link className={classes.navbarList} href="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className={classes.navbarList} href="/about">
              About
            </Link>
          </li>
          {!session && !loading && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <li>
                <Link className={classes.loginButton} href="/auth/login">
                  Login
                </Link>
              </li>
            </motion.div>
          )}
          {session && (
            <li className={classes.user}>
              <div className={classes.userName}>
                {session?.user.name}{" "}
                <AiFillCaretDown className={classes.icon} />
              </div>
              <div className={classes.userList}>
                <Link className={classes.list} href="/bookCourt">
                  Book Court
                </Link>{" "}
                <Link className={classes.list} href="/trainings">
                  Trainings
                </Link>{" "}
                <Link className={classes.list} href="/findPartner">
                  Find Partner
                </Link>{" "}
                <Link className={classes.list} href="/" onClick={logoutHandler}>
                  Logout
                </Link>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
