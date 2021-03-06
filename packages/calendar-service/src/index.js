const { port, env } = require('./constants')
const app = require('./server')
const logger = require('./utils/logger')(__filename)
const googleAuth = require('./services/googleAuth.service')

logger.info('--- Calendar Service ---')
logger.info('Connecting to Google Api...')

logger.info(googleAuth.connect())

// listen to requests
app.listen(port, (err) => {
  if (err) {
    return logger.error('server failed to start', err)
  }
  return logger.info(
    `Server started : Calendar-Service - [Port : ${port} - Env : ${env}]`
  )
})

/**
 * Exports express
 * @public
 */
module.exports = app
