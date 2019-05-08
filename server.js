const express = require('express')
const app = express()
const cors = require('cors')
const schedule = require('node-schedule')

const redisClient = require('./redis-client')
const { getData } = require('./api')

const games = require('./routes/games')

app.use(cors());
app.use(games);

schedule.scheduleJob('0-59/15 * * * * *', async () => {
  console.log('New query!')
  try {
    const dataMLB = await getData('MLB')
    const dataNBA = await getData('NBA')
    const date = Date.now()
    await redisClient.msetAsync('MLB', JSON.stringify(dataMLB.data), 'NBA', JSON.stringify(dataNBA.data), 'timestamp', JSON.stringify(date));
  } catch(error) {
    console.log(error)
  }
});


app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
})



const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});