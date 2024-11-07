import Movies from "./schemas/movieSchema.js";
import mongoose from "mongoose";

export const getAllMovies = async () => {
  const result = await Movies.find()
    .populate("producer", "-_id -role")
    .populate("director", "-_id -role")
    .populate("actors", "-_id -role");

  if (!result) {
    return null;
  }
  return result;
};

export const getMovieById = async (movieId) => {
  if (mongoose.Types.ObjectId.isValid(movieId) === false) {
    console.log("Invalid ID");
    return null;
  }

  const result = await Movies.findById(movieId)
    .populate("producer", "-_id -role")
    .populate("director", "-_id -role")
    .populate("actors", "-_id -role");

  if (!result) {
    return null;
  }
  return result;
};

export const createMovie = async (movieObj) => {
  const newMovie = new Movies(movieObj);
  await newMovie.save();
  return newMovie;
};

export const updateMovieById = async (movieId, movieObj) => {
  if (mongoose.Types.ObjectId.isValid(movieId) === false) {
    console.log("Invalid ID");
    return null;
  }
  const result = await Movies.findByIdAndUpdate(movieId, movieObj, {
    new: true,
  });

  if (!result) {
    return null;
  }
  return result;
};

export const deleteMovieById = async (movieId) => {
  if (mongoose.Types.ObjectId.isValid(movieId) === false) {
    console.log("Invalid ID");
    return null;
  }
  const result = await Movies.findByIdAndDelete(movieId);
  if (!result) {
    return false;
  }
  return true;
};
