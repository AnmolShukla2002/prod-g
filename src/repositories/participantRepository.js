import mongoose from "mongoose";
import Participants from "./schemas/participantsSchema.js";

export const getAllParticipants = async () => {
  const result = await Participants.find();
  if (!result) {
    return [];
  }
  return result;
};

export const getParticipantById = async (participantId) => {
  if (mongoose.Types.ObjectId.isValid(participantId) === false) {
    console.log("Invalid ID");
    return null;
  }

  const result = await Participants.findById(participantId);
  if (!result) {
    return null;
  }
  return result;
};

export const createParticipantsByName = async (name, age, role) => {
  const newParticipants = new Participants({
    name,
    age,
    role,
  });
  const result = await newParticipants.save();
  return result;
};

export const updateParticipantById = async (participantId, name, age, role) => {
  if (mongoose.Types.ObjectId.isValid(participantId) === false) {
    console.log("Invalid ID");
    return null;
  }
  const result = await Participants.findByIdAndUpdate(participantId, {
    name,
    age,
    role,
  }, { new: true });
  if (!result) {
    return null;
  }
  return result;
};

export const deleteParticipantById = async (participantId) => {
  if (mongoose.Types.ObjectId.isValid(participantId) === false) {
    console.log("Invalid ID");
    return false;
  }
  const result = await Participants.findByIdAndDelete(participantId);
  if (!result) {
    return null;
  }
  return result;
};
