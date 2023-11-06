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
    WhatsAppNumber: {
      type: Number,
      default: "1234567898",
    },
    password: String,
    // passwordConfirmation: String,
    provider: {
      type: String,
      default: "credentials",
    },
    provider: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = models.user || model("user", userSchema);

export default User;
