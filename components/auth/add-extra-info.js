"use client";
import React, { useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import classes from "./add-extra-info.module.css";
import ButtonTest from "../ui/submit-button";
import { AddExtraInfoActions } from "@/actions/addExtraInfoActions";
import { FormatPhoneNumber } from "@/lib/FormatPhoneNumber";

function AddExtraInfo({ callbackUrl }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef(null);

  const router = useRouter();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const formattedNumber = FormatPhoneNumber(inputValue);
    setPhoneNumber(formattedNumber);
  };

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
            type="tel"
            name="number"
            placeholder="0 (555) 555 55 55 - Start With Zero"
            value={phoneNumber}
            onChange={handleInputChange}
            maxLength="17"
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
        <div className={classes.ButtonsContainer}>
          <ButtonTest>Add</ButtonTest>
          <h3>Already Added Information?</h3>
          <Link href="/" className={classes.button}>Home</Link>
        </div>
      </form>
    </div>
  );
}

export default AddExtraInfo;
