import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovieById,
  deleteMovieById,
} from "../repositories/moviesRepository.js";

import {
  getDataFromRedis,
  setDataToRedis,
  invalidKey,
} from "../lib/redisHelper.js";

const REDIS_KEY = "movies";
const CACHED_DURATION = 3600;

export const getMovies = async (req, res) => {
  const resultFromRedis = await getDataFromRedis(REDIS_KEY);
  if (resultFromRedis) {
    console.log("Data from redis: ", REDIS_KEY);
    res.status(200).json(resultFromRedis);
    return;
  }
  const result = await getAllMovies();
  console.log("Getting Data from database");
  await setDataToRedis(REDIS_KEY, result, CACHED_DURATION);
  res.status(200).json(result);
};

export const fetchMovieById = async (req, res) => {
  const movieId = req?.params?.id ?? null;
  const resultFromRedis = await getDataFromRedis(REDIS_KEY);
  if (resultFromRedis) {
    console.log("Data from redis: ", REDIS_KEY);
    const movie = resultFromRedis.find((result) => result?._id === movieId);
    return res.status(200).json(movie);
  }
  const result = await getMovieById(movieId);
  if (!result) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  console.log("Getting Data from database");
  res.status(200).json(result);
};

export const postMovie = async (req, res) => {
  const movieObj = req?.body ?? {};
  const result = await createMovie(movieObj);
  await invalidKey(REDIS_KEY);
  res.status(201).json(result);
};

export const updateMovie = async (req, res) => {
  const movieId = req?.params?.id ?? null;
  const movieObj = req?.body ?? {};
  const result = await updateMovieById(movieId, movieObj);
  if (!result) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  await invalidKey(REDIS_KEY);
  res.status(200).json(result);
};

export const deleteMovie = async (req, res) => {
  const movieId = req?.params?.id ?? null;
  const result = await deleteMovieById(movieId);
  if (!result) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  await invalidKey(REDIS_KEY);
  res.status(204).json();
};
