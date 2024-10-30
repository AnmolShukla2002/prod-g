import mongoose from "mongoose";
import Participants from "./schemas/participantsSchema.js";

export const getAllParticipants = async () => {
    const result = await Participants.find();
    if(!result) {
        return [];
    }
    return result;
};

export const createParticipantsByName = async (name, age, role) => {
    const newParticipants = new Participants({
        name,
        age,
        role
    });
    const result =  await newParticipants.save();
    return result;
};