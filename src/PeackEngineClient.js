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
  async findContact (queryBy, query) {
    const { data: contacts } = await this.client.get(`/contacts?${queryBy}=${query}`)
    return contacts
  }
  getTimeStamp () {
    return generateHeaders('ssssss')
  }
  requestInterceptor (config) {
    const { timeStamp, encrypted } = this.generateHeaders()
    config.headers['Time-Stamp'] = timeStamp
    config.headers['Time-Signature'] = encrypted
    return config
  }
  generateHeaders () {
    const timeStamp = getCurrentIime()
    return {
      timeStamp,
      encryptedTimeStamp: encryptWithSha1(timeStamp)
    }
  }
}

function getCurrentIime () {
  const now = new Date();
  const year = now.getUTCFullYear().toString();
  const month = (now.getUTCMonth() + 1).toString();
  const date = now.getUTCDate().toString();
  const hour = now.getUTCHours().toString();
  const minute = now.getUTCMinutes().toString();
  const second = now.getUTCSeconds().toString();
  return `${year}${generateTime(month)}${(date)}${generateTime(hour)}${generateTime(minute)}${generateTime(second)}`
}

function generateTime (time) {
  return (time < 10) ? '0' + time : time
}

function encryptWithSha1 (timeStamp) {
  let hmacsha1 = crypto.createHmac('sha1', this.connectionId).update(timeStamp)
  return hmacsha1.digest('hex')
}

