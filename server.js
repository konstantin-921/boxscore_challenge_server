const express = require('express')
const http = require('http')
const app = express()
const socketIO = require('socket.io');
const cors = require('cors')
const schedule = require('node-schedule')
const redisClient = require('./redis-client')
const { getData } = require('./api')
const games = require('./routes/games')

const server = http.createServer(app);
const PORT = process.env.PORT || 4444;

app.use(cors());
app.use(games);

const io = socketIO(server);

io.on("connection", socket => {
  console.log("New client connected" + socket.id)

  schedule.scheduleJob('0-59/15 * * * * *', async () => {
    try {
      socket.emit('news', { hello: 'world' });
    } catch(error) {
      console.log(error)
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

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

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});