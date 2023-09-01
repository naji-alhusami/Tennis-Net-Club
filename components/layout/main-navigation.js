import Link from "next/link";
import Logo from "./logo";

import classes from "./main-navigation.module.css";

function MainNavigation(props) {
  const { backgroundColor } = props;

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
            <Link href="/posts">Book Court</Link>
          </li>
          <li>
            <Link href="/contact">Trainings</Link>
          </li>
          <li>
            <Link href="/contact">Blogs</Link>
          </li>
          <li>
            <Link href="/contact">Find Partner</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <Link href="/auth/login">
            <button>Login</button>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
