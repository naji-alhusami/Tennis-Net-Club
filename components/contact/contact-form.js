"use client";
import React, { useState } from "react";

import SubmitButton from "../ui/submit-button";
import classes from "./contact-from.module.css";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  } else if (response.ok) {
    alert(data.message);
  }
}

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");

  async function sendMessageHandler(event) {
    event.preventDefault();

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (error) {
      return;
    }
  }

  return (
    <div>
      <div className={classes.contactFormContainer}>
        <form className={classes.form} onSubmit={sendMessageHandler}>
          <h1>Contact Form</h1>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                value={enteredEmail}
                onChange={(event) => setEnteredEmail(event.target.value)}
                required
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                value={enteredName}
                onChange={(event) => setEnteredName(event.target.value)}
                required
              />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows="4"
              value={enteredMessage}
              onChange={(event) => setEnteredMessage(event.target.value)}
              required
            ></textarea>
          </div>
          <SubmitButton>Send Message</SubmitButton>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
