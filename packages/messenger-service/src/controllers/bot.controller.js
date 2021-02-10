const messengerService = require('../services/messenger.service')
const httpStatus = require('http-status')

exports.verifyWebhook = async (req, res, next) => {
  try {
    const challenge = await messengerService.verifyWebhook(req)
    res.status(httpStatus.OK).send(challenge)
  } catch (e) {
    next(e)
  }
}

exports.handleMessage = async (req, res, next) => {
  try {
    const event = req.body
    messengerService.processMessage(event)
    res.status(httpStatus.OK).end()
  } catch (e) {
    next(e)
  }
}
