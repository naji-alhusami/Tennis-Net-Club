import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
  member: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Court Reservation",
  },
});

const Event = models.event || model("event", eventSchema);

export default Event;
