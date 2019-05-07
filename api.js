const axios = require('axios')
const mlbUrl = 'https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json'
const nbaUrl = 'https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json'

const getData = async (url) => {
  try {
    if(url === 'MLB') {
      return await axios.get(mlbUrl)
    } else if(url === 'NBA') {
      return await axios.get(nbaUrl)
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = { getData }