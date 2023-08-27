import React, { Fragment } from "react";

import MainNavigation from "./main-navigation";

function Layout(props) {
  return (
    <Fragment>
      <MainNavigation backgroundColor="rgb(0, 0, 0, 0.5)" />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
