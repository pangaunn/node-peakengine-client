const axios = require('axios')
const crypto = require('crypto')
const { DateTime } = require('luxon')
module.exports = class PeakEngineClient {
  constructor (url, connectionId, token) {
    this.client = axios.create({
      baseURL: url,
      timeout: 20000,
      headers: {
        'Content-Type': 'Application/json',
        'User-Token': token
      }
    })
    this.connectionId = connectionId
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
      encryptedTimeStamp: this.encryptWithSha1(timeStamp)
    }
  }

  encryptWithSha1 (timeStamp) {
    let hmacsha1 = crypto.createHmac('sha1', this.connectionId).update(timeStamp)
    return hmacsha1.digest('hex')
  }
}



