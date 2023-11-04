import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    WhatsApp: {
      type: Number,
      required: true,
    },
    password: String,
    // passwordConfirmation: String,
    provider: {
      type: String,
      default: "credentials",
    },
  },
  { timestamps: true }
);

const User = models.user || model("user", userSchema);

export default User;
