import React, { Fragment } from "react";

import classes from "./headers.module.css";

function Headers({ H3Header, H1Header, H2Header, PHeader }) {
  return (
    <Fragment>
      <h3 className={classes.textClub}>{H3Header}</h3>
      <h1 className={classes.textHeader}> {H1Header}</h1>
      <h2 className={classes.textHeader2}> {H2Header}</h2>
      <p className={classes.textp}>{PHeader}</p>
      <hr
        style={{
          border: "1px solid #1c7f47",
          width: "6rem",
        }}
      />
    </Fragment>
  );
}

export default Headers;
