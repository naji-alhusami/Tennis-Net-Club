import nodemailer from "nodemailer";
import { html } from "./htmlEmail";

async function sendEmail({ to, url, text }) {
  const transporter = nodemailer.createTransport({
    servide: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      user: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "TENNIS NET CLUB - VERIFY EMAIL",
    html: html({ url, text }),
  };

  const result = await transporter.sendEmail(mailOptions);
  return result;
}

export default sendEmail;
