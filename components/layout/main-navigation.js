import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { AiFillCaretDown } from "react-icons/ai";

import Logo from "./logo";

import classes from "./main-navigation.module.css";

function MainNavigation(props) {
  const { backgroundColor } = props;
  // const [session, loading] = useSession();
  const { data: session, loading } = useSession();
  console.log(loading);
  console.log(session?.user.name);

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
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {session && (
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
          )}
          <li>
            <Link href="/posts">Blogs</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          {!session && !loading && (
            <Link href="/auth/login">
              <button>Login</button>
            </Link>
          )}
          {session && (
            <div>
              {/* <button> */}
                {session?.user.name} <AiFillCaretDown />
              {/* </button> */}
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
