"use client";
import React, { useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import classes from "./add-extra-info.module.css";
import ButtonTest from "../ui/submit-button";
import { AddExtraInfoActions } from "@/actions/addExtraInfoActions";

function AddExtraInfo({ callbackUrl }) {
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef(null);

  const router = useRouter();

  async function AddExtraInfoHandler(formData) {
    const number = formData.get("number");
    const level = formData.get("level");

    try {
      const response = await AddExtraInfoActions({
        number,
        level,
      });
      console.log(response);

      if (response?.message) {
        ref.current?.reset();
        setErrorMessage("");
        router.replace(`/thanks?thanks=${response.message}`);
        // don't forget to redirect to thanks page
        // console.log(response?.message);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  }

  return (
    <div className={classes.AddExtraInfo}>
      <h1>Add Extra Information</h1>
      <form action={AddExtraInfoHandler} ref={ref}>
        <div>
          <input
            name="number"
            type="number"
            placeholder="Your WhatsApp"
            required
          />
        </div>
        <div>
          <select name="level" className={classes.select} required>
            <option value="">Select Your Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advance">Advance</option>
          </select>
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

export default AddExtraInfo;
