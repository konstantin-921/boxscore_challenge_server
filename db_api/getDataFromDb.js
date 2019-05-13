const redisClient = require('../redis-client');

const getDataFromDb = async (param) => {
  try {
    return await redisClient.getAsync(param);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getDataFromDb }