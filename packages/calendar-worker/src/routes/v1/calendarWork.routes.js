const express = require('express')

const controller = require('../../controllers/calendarWork.controller')

const router = express.Router()

// protected route
router.route('/status').get(controller.getStatus)

module.exports = router
