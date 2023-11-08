import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
  member: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    default: "Court Reservation",
  },
  daysOfWeek: {
    type: [Number], // An array of numbers representing days of the week
    required: false,
  },
  startRecur: {
    type: String,
    required: false,
  },
  endRecur: {
    type: String,
    required: false,
  },
});

const Event = models.event || model("event", eventSchema);

export default Event;
