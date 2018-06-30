const axios = require('axios')
const crypto = require('crypto')
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

    // this.client.interceptors.request.use(peakEngineRequestInterceptor)
  }
  async findContact (queryBy, query) {
    const { data: contacts } = await this.client.get(`/contacts?${queryBy}=${query}`)
    return contacts
  }
  getTimeStamp () {
    return generateHeaders('ssssss')
  }
}

// function peakEngineRequestInterceptor (config) {
//   const { timeStamp, encrypted } = generateHeaders()
//   config.headers['Time-Stamp'] = `${timeStamp}`
//   config.headers['Time-Signature'] = encrypted
//   return config
// }

function generateHeaders (CONNECTION_ID) {
  let hmacsha1 = crypto.createHmac('sha1', CONNECTION_ID).update(timeStamp())
  let encrypted = hmacsha1.digest('hex')
  return {encrypted, timeStamp: timeStamp()}
}

function timeStamp () {
  const now = new Date();
  const year = now.getUTCFullYear().toString();
  const month = (now.getUTCMonth() + 1).toString();
  const date = now.getUTCDate().toString();
  const hour = now.getUTCHours().toString();
  const minute = now.getUTCMinutes().toString();
  const second = now.getUTCSeconds().toString();
  return `${year}${generateTime(month)}${generateTime(date)}${generateTime(hour)}${generateTime(minute)}${generateTime(second)}`
}

function generateTime (time) {
  return (time < 10) ? '0' + time : time
}