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
    default: "Training Session",
  },
  daysOfWeek: {
    type: [Number],
    default: function () {
      // Only set a default value if the array is not empty
      if (this.daysOfWeek && this.daysOfWeek.length > 0) {
        return this.daysOfWeek;
      }
      return undefined; // This prevents the field from being persisted if empty
    },
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
