const express = require('express')

const controller = require('../../controllers/bot.controller')
const middleware = require('../../middlewares/message.middleware.js')

const router = express.Router()

// protected route
router.route('/').get(controller.verifyWebhook)

router.route('/').post(middleware.formatMessage, controller.handleMessage)

module.exports = router
