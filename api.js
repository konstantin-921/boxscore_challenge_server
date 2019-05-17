const axios = require('axios')

const URLS = {
  MLB: 'https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json',
  NBA: 'https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json'
}

const getData = async (league) => {
  try {
    return await axios.get(URLS[league], { headers: {'Content-Type': 'application/json' }})
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getData }