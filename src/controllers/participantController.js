import express from "express";
import {
  createParticipant,
  getParticipants,
  deleteParticipant,
  updateParticipant,
  getParticipant,
} from "../services/participantService.js";

const router = express.Router();

router.get("/", getParticipants);
router.post("/", createParticipant);
router.get("/:id", getParticipant);
router.put("/:id", updateParticipant);
router.delete("/:id", deleteParticipant);

export default router;
