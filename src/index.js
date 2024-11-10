import express from "express";
import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";
import participants from "./controllers/participantController.js";
import movies from "./controllers/movieController.js";
import { removeResponseHeaders } from "./middlewares/removeResponseHeaders.js";

dotenv.config();

import connect from "./config/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(removeResponseHeaders);

const PORT = process.env.PORT || 8000;

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.use("/participants", participants);
app.use("/movies", movies);

await connect(DB_NAME);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
