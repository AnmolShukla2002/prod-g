import express from "express";
import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";

dotenv.config();

import connect from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

await connect(DB_NAME);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
