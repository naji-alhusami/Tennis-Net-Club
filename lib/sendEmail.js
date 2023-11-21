import nodemailer from "nodemailer";

import { html } from "./htmlEmail.js";

async function sendEmail({ to, url, text }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "TENNIS NET CLUB - VERIFY EMAIL",
    html: html({ url, text }),
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
}

export default sendEmail;
