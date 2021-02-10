const { port, env } = require('./constants')
const app = require('./server')
const logger = require('./utils/logger')(__filename)

logger.info('--- Messenger Service ---')

// listen to requests
app.listen(port, (err) => {
  if (err) {
    return logger.error('server failed to start', err)
  }
  return logger.info(
    `Server started : Messenger-Service - [Port : ${port} - Env : ${env}]`
  )
})

/**
 * Exports express
 * @public
 */
module.exports = app
