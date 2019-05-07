const axios = require('axios');
const redisClient = require('../redis-client');
const { getDataMLB, getDataNBA } = require('../api');

const getDbMLB = async () => {
  try {
    return await redisClient.getAsync('MLB');
  } catch (error) {
    console.error(error)
  }
}

const getDbNBA = async () => {
  try {
    return await redisClient.getAsync('NBA');
  } catch (error) {
    console.error(error)
  }
}

const getDbDate = async () => {
  try {
    return await redisClient.getAsync('timestamp');
  } catch (error) {
    console.error(error)
  }
}

const getMLB = async (req, res) => {
  const currentDate = Date.now();
  const timestamp = await getDbDate();
  const result = currentDate - timestamp;

  if(result > 15000) {
    console.log('--------------------');
    console.log('More than 15 seconds passed');
    console.log('--------------------');
    const dataMLB = await getDataMLB();
    await redisClient.setAsync('MLB', JSON.stringify(dataMLB.data));
  } 

  const data = await getDbMLB();
  
  return res.send(data);
}

const getNBA = async (req, res) => {
  const currentDate = Date.now();
  const timestamp = await getDbDate();
  const result = currentDate - timestamp;

  if(result > 15000) {
    console.log('--------------------');
    console.log('More than 15 seconds passed');
    console.log('--------------------');
    const dataNBA = await getDataNBA();
    await redisClient.setAsync('NBA', JSON.stringify(dataNBA.data));
  } 

  const data = await getDbNBA();
  
  return res.send(data);
}

module.exports = { getMLB, getNBA }