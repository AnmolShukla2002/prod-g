import mongoose from "mongoose";
import { PARTICIPANTS_ROLES } from "../../constants.js";

const participantsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: PARTICIPANTS_ROLES,
  }
});

const Participants = mongoose.model("Participants", participantsSchema);
export default Participants;
