"use client";
import React, { useState } from "react";

import classes from "./contact-from.module.css";
import SubmitButton from "../ui/submit-button";

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
      console.log(error.message);
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
              rows="5"
              value={enteredMessage}
              onChange={(event) => setEnteredMessage(event.target.value)}
              required
            ></textarea>
          </div>
          <div className={classes.actions}>
            <SubmitButton>Send Message</SubmitButton>
          </div>
        </form>
      </div>
      {/* <section className={classes.contactFormContainer}>
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
              rows="5"
              value={enteredMessage}
              onChange={(event) => setEnteredMessage(event.target.value)}
              required
            ></textarea>
          </div>
          <div className={classes.actions}>
            <SubmitButton>Send Message</SubmitButton>
          </div>
        </form>
      </section> */}
    </div>
  );
}

export default ContactForm;
