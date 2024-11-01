import {
  getAllParticipants,
  createParticipantsByName,
  getParticipantById,
  updateParticipantById,
  deleteParticipantById,
} from "../repositories/participantRepository.js";

import {getDataFromRedis, setDataToRedis, invalidKey} from "../lib/redisHelper.js";

const REDIS_KEY = 'participants';
const CACHED_DURATION = 3600;

export const getParticipants = async (req, res) => {
  const resultFromRedis = await getDataFromRedis(REDIS_KEY);
  if (resultFromRedis) {
    console.log("Data from redis: ", REDIS_KEY);
    res.status(200).json(resultFromRedis);
    return;
  }

  const result = await getAllParticipants();
  console.log("Getting Data from database");
  await setDataToRedis(REDIS_KEY, result, CACHED_DURATION);
  res.status(200).json(result);
};

export const getParticipant = async (req, res) => {
  const participantId = req?.params?.id ?? "";
  const resultFromRedis = await getDataFromRedis(REDIS_KEY);
  if (resultFromRedis) {
    console.log("Data from redis: ", REDIS_KEY);
    const participant = resultFromRedis?.find(result => result?.participantId === participantId);
    return res.status(200).json(participant);
  }
  const result = await getParticipantById(participantId);
  console.log("Getting Data from database");
  if (!result) {
    res.status(404).json({ message: "Participant not found" });
    return;
  }
  res.status(200).json(result);
};

export const createParticipant = async (req, res) => {
  const { name, age, role } = req.body;
  const result = await createParticipantsByName(name, age, role);
  await invalidKey(REDIS_KEY);
  res.status(201).json(result);
};

export const updateParticipant = async (req, res) => {
  const id  = req?.params?.id ?? "";
  const { name, age, role } = req.body;
  const result = await updateParticipantById(id, name, age, role);
  if (!result) {
    res.status(404).json({ message: "Participant not found" });
    return;
  }
  await invalidKey(REDIS_KEY);
  res.status(200).json(result);
};

export const deleteParticipant = async (req, res) => {
  const id = req?.params?.id ?? "";
  const result = await deleteParticipantById(id);
  if (!result) {
    res.status(404).json({ message: "Participant not found" });
    return;
  }
  await invalidKey(REDIS_KEY);
  res.status(204).json();
};
