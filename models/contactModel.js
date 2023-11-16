import { Schema, model, models } from "mongoose";

const contactSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = models.contact || model("contact", contactSchema);

export default Contact;
