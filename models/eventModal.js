import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    default: "Court Reservation",
  },
  date: {
    type: String,
    required: true,
  },
});

const Event = models.event || model("event", eventSchema);

export default Event;
