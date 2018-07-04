const PeakEngineClient = require('./src/PeackEngineClient')
const peakApi = new PeakEngineClient('www', 'token')

console.log(peakApi.getTimeStamp())