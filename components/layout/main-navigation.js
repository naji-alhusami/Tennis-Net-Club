import Link from "next/link";
import Logo from "./logo";

import classes from "./main-navigation.module.css";

function MainNavigation(props) {
  const { backgroundColor } = props;

  const headerStyle = {
    backgroundColor: backgroundColor, // Default transparent background if not provided
  };

  return (
    <header className={classes.header} style={headerStyle}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
