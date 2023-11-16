import React from "react";
import ContactForm from "@/components/contact/contact-form";
import Image from "next/image";
import contact from "@/public/images/contact.jpg";
import classes from "@/components/contact/contact-from.module.css";

function ContactPage() {
  return (
    <div className={classes.contactContainer}>
      <div className={classes.imageContainer}>
        <Image
          src={contact}
          alt="contact-image"
          priority="true"
          property="true"
        />
      </div>
      <ContactForm />
    </div>
  );
}

export default ContactPage;
