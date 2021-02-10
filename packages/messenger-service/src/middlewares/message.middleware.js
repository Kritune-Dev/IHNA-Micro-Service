const logger = require('../utils/logger')(__filename)
const { botId } = require('../constants')

exports.formatMessage = async (req, res, next) => {
  if (req.body.object === 'page') {
    req.body.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message && event.message.text) {
          if (event.sender.id !== botId) logger.verbose(`New message from ${event.sender.id} : ${event.message.text}`)
          req.body = event
          next()
        } else {
          res.status(200).end()
        }
      })
    })
  } else {
    res.status(200).end()
  }
}
