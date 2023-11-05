"use client";
import React, { useRef, useState } from "react";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import classes from "./add-whatsapp.module.css";
import ButtonTest from "../ui/buttonTest";
import { AddWhatsAppActions } from "@/actions/addWhatsAppActions";

function AddWhatsApp({ callbackUrl }) {
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef(null);

  const router = useRouter();

  async function AddWhatsAppHandler(formData) {
    const number = formData.get("number");

    try {
      const response = await AddWhatsAppActions({
        number,
      });
      console.log(response);

      if (response?.message) {
        ref.current?.reset();
        setErrorMessage("");
        router.replace("/");
        // don't forget to redirect to thanks page
        // console.log(response?.message);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  }

  return (
    <div className={classes.addWhatsAppForm}>
      <h1>Add WhatsApp</h1>
      <form action={AddWhatsAppHandler} ref={ref}>
        <div>
          <input
            name="number"
            type="number"
            placeholder="Your WhatsApp"
            required
          />
        </div>
        <div className={classes.error}>
          {errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <p>
              <br />
            </p>
          )}
        </div>
        <div>
          <ButtonTest>Add</ButtonTest>
        </div>
      </form>
    </div>
  );
}

export default AddWhatsApp;
