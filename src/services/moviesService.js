import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovieById,
  deleteMovieById,
} from "../repositories/moviesRepository.js";

import {getDataFromRedis, setDataToRedis, invalidKey} from "../lib/redisHelper.js";

const REDIS_KEY = 'movies';
const CACHED_DURATION = 3600;