import express from "express";
import { createParticipant, getParticipants } from "../services/participantService.js";

const router = express.Router();

router.get("/", getParticipants);
router.post("/", createParticipant);


export default router;