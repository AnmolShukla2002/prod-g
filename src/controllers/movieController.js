import express from "express";
import {fetchMovieById, getMovies, postMovie, updateMovie, deleteMovie} from "../services/moviesService.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", fetchMovieById);
router.post("/", postMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;