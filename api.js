const axios = require('axios');

const getDataMLB = async () => {
  try {
    return await axios.get('https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json')
  } catch (error) {
    console.error(error)
  }
}

const getDataNBA = async () => {
  try {
    return await axios.get('https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json')
  } catch (error) {
    console.error(error)
  }
}

module.exports = { getDataMLB, getDataNBA }