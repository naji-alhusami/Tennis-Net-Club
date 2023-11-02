import { Schema, model, models } from "mongoose";

const takenTimeSchema = new Schema({
  member: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  courtType: {
    type: String,
    required: true,
  },
  playersNumber: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const TakenTime = models.takenTime || model("takenTime", takenTimeSchema);

export default TakenTime;
