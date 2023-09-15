import React from "react";
import { MdLocationPin } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import classes from "./footer.module.css";

function Footer() {
  return (
    <footer className={classes.footerContainer}>
      <div className={classes.contactsContainer}>
        <div className={classes.contactContainer}>
          <AiFillPhone />
          <h3>+90 535 873 28 37</h3>
        </div>
        <div className={classes.contactContainer}>
          <AiOutlineMail />
          <h3>info@tennisnet.com</h3>
        </div>
        <div className={classes.contactContainer}>
          <MdLocationPin />
          <h3>Istanbul / Turkey</h3>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
