import {
  getAllParticipants,
  createParticipantsByName,
} from "../repositories/participantRepository.js";

export const getParticipants = async (req, res) => {
  const result = await getAllParticipants();
  res.status(200).json(result);
};

export const createParticipant = async (req, res) => {
  const { name, age, role } = req.body;
  const result = await createParticipantsByName(name, age, role);
  res.status(201).json(result);
};
