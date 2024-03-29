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
  expireAt: {
    type: Date,
    default: function () {
      return new Date(Date.now() + 24 * 60 * 60 * 1000);
    },
  },
});

takenTimeSchema.index({ date: 1 }, { expireAfterSeconds: 24 * 60 * 60 }); // 345600 seconds = 4 days

const TakenTime = models.takenTime || model("takenTime", takenTimeSchema);

export default TakenTime;
