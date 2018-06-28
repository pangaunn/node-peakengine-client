const axios = require('axios')

function newClient (url, token) {
  const peakApi = axios.create({
    baseURL: process.env.API_PEAK_ENGINE,
    timeout: 20000,
    headers: {
      'Content-Type': 'Application/json',
      'User-Token': process.env.USER_TOKEN_PEAK
    }
  })
}

module.exports = newClient
