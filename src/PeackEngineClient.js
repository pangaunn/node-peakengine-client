const axios = require('axios')
const { DateTime } = require('luxon')
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
    this.client.interceptors.request.use(this.requestInterceptor)
  }

  requestInterceptor (config) {
    const { timeStamp, encrypted } = this.generateHeaders()
    config.headers['Time-Stamp'] = timeStamp
    config.headers['Time-Signature'] = encrypted
    return config
  }

  generateHeaders () {
    const timeStamp = DateTime.utc().toFormat('YYYYMMDDHHmmss')
    return {
      timeStamp: DateTime.utc().toFormat('YYYYMMDDHHmmss'),
      encryptedTimeStamp: this.encryptTimeStamp(timeStamp)
    }
  }

  encryptTimeStamp () {

  }
}



