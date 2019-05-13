const redisClient = require('../redis-client')
const { getData } = require('../api')
const { getDataFromDb } = require('../db_api/getDataFromDb')

const getCurrentData = async (req, res, next) => {
  try {
    const { league } = req.query
    const currentDate = Date.now()
    const timestamp = await getDataFromDb('timestamp')
    const result = currentDate - timestamp;

    if(result > 15000) {
      console.log('--------------------')
      console.log('More than 15 seconds passed')
      console.log('--------------------')
      const newData = await getData(league)
      await redisClient.setAsync(league, JSON.stringify(newData.data))
    }

    const data = await getDataFromDb(league)
    
    res.send(data)
  } catch(error) {
    next(error)
  }

}

module.exports = { getCurrentData }