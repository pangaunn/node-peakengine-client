const axios = require('axios')
module.exports = class PeakEngineClient {
  constructor (url, token) {
    this.client = axios.create({
      baseURL: url,
      timeout: 20000,
      headers: {
        'Content-Type': 'Application/json',
        'User-Token': token
      }
    })

    this.client.interceptors.request.use(peakEngineRequestInterceptor)
    this.client.interceptors.response.use(peakEngineResponseInterceptor, peakEngineResponseErrorInterceptor)
  }
}

function peakEngineRequestInterceptor (config) {
  const { timeStamp, encrypted } = generateHeaders()
  config.headers['Time-Stamp'] = `${timeStamp}`
  config.headers['Time-Signature'] = encrypted
  return config
}

function generateHeaders () {

}
