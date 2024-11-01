import redisClient from "../config/redis.js";

export const getDataFromRedis = async (key) => {
  const cachedData = await redisClient.get(key);
  return cachedData ? JSON.parse(cachedData) : null;
};

export const setDataToRedis = async (key, data, cachedDuration) => {
  await redisClient.setex(key, cachedDuration, JSON.stringify(data));
  return;
};

export const invalidKey = async (key) => {
  await redisClient.del(key);
};
