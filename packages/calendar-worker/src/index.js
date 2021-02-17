const { port, env } = require('./constants')
const app = require('./server')
const workerService = require('./services/worker.service')
const googleAuth = require('./services/googleAuth.service')
const logger = require('./utils/logger')(__filename)

logger.info('--- Calendar Worker ---')
logger.info('Connecting to Google Api...')

logger.info(googleAuth.connect())

logger.info('Lunch Worker')

workerService.checkingEvent()

// listen to requests
app.listen(port, (err) => {
  if (err) {
    return logger.error('server failed to start', err)
  }
  return logger.info(
    `Server started : Calendar Worker - [Port : ${port} - Env : ${env}]`
  )
})

/**
 * Exports express
 * @public
 */
module.exports = app
